/** Weekly opening-hours model supporting single or split same-day periods. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = (typeof DAYS)[number];

export const SHORT_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type ShortDay = (typeof SHORT_DAYS)[number];

const DAY_ABBR: Record<Day, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

export interface OpeningPeriod {
  /** Inclusive local HH:MM. */
  opens: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes: string;
}

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Single-period shorthand: inclusive local HH:MM. Omit when closed or using `periods`. */
  opens?: string;
  /** Single-period shorthand: exclusive local HH:MM. */
  closes?: string;
  /** Multiple same-day periods (e.g. Wednesday morning and afternoon). */
  periods?: readonly OpeningPeriod[];
  /** Optional short note (e.g. "Make-up swims only"). */
  note?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
export const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

/** Return the ordered list of opening periods for a weekday entry. */
export function dayPeriods(entry: OpeningHours): OpeningPeriod[] {
  if (entry.periods !== undefined) return [...entry.periods];
  if (entry.opens === undefined && entry.closes === undefined) return [];
  return [{ opens: entry.opens ?? '', closes: entry.closes ?? '' }];
}

/** Format 24-hour HH:MM into friendly 12-hour clock text ("15:00" -> "3 pm", "07:30" -> "7:30 am"). */
export function formatClock12(hhmm: string): string {
  if (!clock.test(hhmm)) return hhmm;
  const hour24 = Number(hhmm.slice(0, 2));
  const min = Number(hhmm.slice(3));
  const period = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return min === 0 ? `${hour12} ${period}` : `${hour12}:${String(min).padStart(2, '0')} ${period}`;
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const entry = matches[0];
    if (entry.periods !== undefined && (entry.opens !== undefined || entry.closes !== undefined)) {
      throw new Error(`hours: ${day} must use either opens/closes or periods, not both`);
    }
    const periods = dayPeriods(entry);
    let previousClose = -1;
    for (const period of periods) {
      const { opens, closes } = period;
      if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || toMinutes(opens) >= toMinutes(closes)) {
        throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
      }
      if (toMinutes(opens) <= previousClose) {
        throw new Error(`hours: ${day} split periods must be ordered and non-overlapping`);
      }
      previousClose = toMinutes(closes);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

function zonedNowParts(timeZone: string, now: Date): { dayIndex: number; currentMinutes: number } | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const dayIndex = DAYS.indexOf(part('weekday') as Day);
  if (dayIndex < 0) return null;
  return {
    dayIndex,
    currentMinutes: Number(part('hour')) * 60 + Number(part('minute')),
  };
}

/** Browser helper: returns current short weekday ('mon'..'sun') in the business time zone, or null. */
export function currentShortDay(timeZone: string, now = new Date()): ShortDay | null {
  const parts = zonedNowParts(timeZone, now);
  return parts ? SHORT_DAYS[parts.dayIndex] : null;
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  const zoned = zonedNowParts(timeZone, now);
  if (!zoned) return fallback;
  const { dayIndex, currentMinutes } = zoned;
  const today = hours.find(entry => entry.day === DAYS[dayIndex])!;
  for (const period of dayPeriods(today)) {
    if (currentMinutes >= toMinutes(period.opens) && currentMinutes < toMinutes(period.closes)) {
      return `Open now · until ${period.closes}`;
    }
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(dayIndex + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    for (const period of dayPeriods(entry)) {
      if (offset > 0 || currentMinutes < toMinutes(period.opens)) {
        return `Closed · opens ${offset === 0 ? 'today' : day} at ${period.opens}`;
      }
    }
  }
  return 'Closed · see opening hours';
}

export interface DeskStatus {
  open: boolean;
  label: string;
}

/** Friendly pool-desk status for browser pills ("Pool desk open now · until 8 pm"). */
export function deskStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): DeskStatus {
  const fallback: DeskStatus = { open: false, label: 'See pool desk hours' };
  if (!timeZone) return fallback;
  validateHours(hours);
  const zoned = zonedNowParts(timeZone, now);
  if (!zoned) return fallback;
  const { dayIndex, currentMinutes } = zoned;
  const today = hours.find(entry => entry.day === DAYS[dayIndex])!;
  for (const period of dayPeriods(today)) {
    if (currentMinutes >= toMinutes(period.opens) && currentMinutes < toMinutes(period.closes)) {
      return {
        open: true,
        label: `Pool desk open now · until ${formatClock12(period.closes)}`,
      };
    }
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(dayIndex + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    for (const period of dayPeriods(entry)) {
      if (offset > 0 || currentMinutes < toMinutes(period.opens)) {
        const when = offset === 0 ? `today ${formatClock12(period.opens)}` : `${DAY_ABBR[day]} ${formatClock12(period.opens)}`;
        return {
          open: false,
          label: `Closed · opens ${when}`,
        };
      }
    }
  }
  return { open: false, label: 'Closed · see pool desk hours' };
}
