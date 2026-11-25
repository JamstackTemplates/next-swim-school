import type { ShortDay } from '../lib/hours.ts';
import type { PoolId } from './pools.ts';

/**
 * Weekly swim classes for the current 10-week term.
 *
 * Frequent owner edit: update `spotsLeft` as classes fill up (0 displays as "Waitlist").
 * Times are 24-hour local HH:MM in America/Los_Angeles.
 */
export interface TimetableClass {
  /** Stable ID formatted as `<day>-<HHMM>-<levelId>` (e.g. `wed-1600-pebbles`). */
  id: string;
  /** Weekday key (`mon` through `sun`). */
  day: ShortDay;
  /** Start time in 24-hour local HH:MM. */
  start: string;
  /** End time in 24-hour local HH:MM (must match the level's durationMinutes). */
  end: string;
  /** References `content/levels.ts`. */
  levelId: string;
  /** References `content/pools.ts`; must match the level's poolId. */
  poolId: PoolId;
  /** References `content/instructors.ts`. */
  instructorId: string;
  /** Open spots remaining for the term; 0 shows "Waitlist". */
  spotsLeft: number;
}

export const DAY_LABELS: Record<ShortDay, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export const DAY_SHORT_LABELS: Record<ShortDay, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
};

export const timetable: readonly TimetableClass[] = [
  { id: 'mon-1530-otter-pups', day: 'mon', start: '15:30', end: '16:00', levelId: 'otter-pups', poolId: 'teaching-pond', instructorId: 'rosa', spotsLeft: 2 },
  { id: 'mon-1600-pebbles', day: 'mon', start: '16:00', end: '16:30', levelId: 'pebbles', poolId: 'teaching-pond', instructorId: 'rosa', spotsLeft: 0 },
  { id: 'mon-1630-paddlers', day: 'mon', start: '16:30', end: '17:00', levelId: 'paddlers', poolId: 'teaching-pond', instructorId: 'theo', spotsLeft: 1 },
  { id: 'mon-1700-streamers', day: 'mon', start: '17:00', end: '17:45', levelId: 'streamers', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 3 },
  { id: 'mon-1800-lane-otters', day: 'mon', start: '18:00', end: '18:45', levelId: 'lane-otters', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 4 },

  { id: 'tue-1600-ripples', day: 'tue', start: '16:00', end: '16:30', levelId: 'ripples', poolId: 'teaching-pond', instructorId: 'jun', spotsLeft: 2 },
  { id: 'tue-1630-divers', day: 'tue', start: '16:30', end: '17:15', levelId: 'divers', poolId: 'lap-pool', instructorId: 'theo', spotsLeft: 0 },
  { id: 'tue-1900-adult-splash', day: 'tue', start: '19:00', end: '19:45', levelId: 'adult-splash', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 3 },

  { id: 'wed-0930-otter-pups', day: 'wed', start: '09:30', end: '10:00', levelId: 'otter-pups', poolId: 'teaching-pond', instructorId: 'rosa', spotsLeft: 1 },
  { id: 'wed-1600-pebbles', day: 'wed', start: '16:00', end: '16:30', levelId: 'pebbles', poolId: 'teaching-pond', instructorId: 'jun', spotsLeft: 3 },
  { id: 'wed-1630-streamers', day: 'wed', start: '16:30', end: '17:15', levelId: 'streamers', poolId: 'lap-pool', instructorId: 'theo', spotsLeft: 2 },
  { id: 'wed-1730-lane-otters', day: 'wed', start: '17:30', end: '18:15', levelId: 'lane-otters', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 0 },

  { id: 'thu-1600-ripples', day: 'thu', start: '16:00', end: '16:30', levelId: 'ripples', poolId: 'teaching-pond', instructorId: 'rosa', spotsLeft: 1 },
  { id: 'thu-1630-paddlers', day: 'thu', start: '16:30', end: '17:00', levelId: 'paddlers', poolId: 'teaching-pond', instructorId: 'jun', spotsLeft: 2 },
  { id: 'thu-1700-divers', day: 'thu', start: '17:00', end: '17:45', levelId: 'divers', poolId: 'lap-pool', instructorId: 'theo', spotsLeft: 3 },
  { id: 'thu-1900-adult-splash', day: 'thu', start: '19:00', end: '19:45', levelId: 'adult-splash', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 2 },

  { id: 'fri-1600-paddlers', day: 'fri', start: '16:00', end: '16:30', levelId: 'paddlers', poolId: 'teaching-pond', instructorId: 'jun', spotsLeft: 0 },
  { id: 'fri-1630-streamers', day: 'fri', start: '16:30', end: '17:15', levelId: 'streamers', poolId: 'lap-pool', instructorId: 'theo', spotsLeft: 1 },

  { id: 'sat-0800-lane-otters', day: 'sat', start: '08:00', end: '08:45', levelId: 'lane-otters', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 2 },
  { id: 'sat-0900-otter-pups', day: 'sat', start: '09:00', end: '09:30', levelId: 'otter-pups', poolId: 'teaching-pond', instructorId: 'rosa', spotsLeft: 0 },
  { id: 'sat-0930-pebbles', day: 'sat', start: '09:30', end: '10:00', levelId: 'pebbles', poolId: 'teaching-pond', instructorId: 'rosa', spotsLeft: 2 },
  { id: 'sat-1000-ripples', day: 'sat', start: '10:00', end: '10:30', levelId: 'ripples', poolId: 'teaching-pond', instructorId: 'jun', spotsLeft: 1 },
  { id: 'sat-1030-divers', day: 'sat', start: '10:30', end: '11:15', levelId: 'divers', poolId: 'lap-pool', instructorId: 'theo', spotsLeft: 2 },
  { id: 'sat-1130-adult-splash', day: 'sat', start: '11:30', end: '12:15', levelId: 'adult-splash', poolId: 'lap-pool', instructorId: 'maya', spotsLeft: 4 },
];

export function spotsLabel(spotsLeft: number): string {
  if (spotsLeft <= 0) return 'Waitlist';
  return spotsLeft === 1 ? '1 spot' : `${spotsLeft} spots`;
}
