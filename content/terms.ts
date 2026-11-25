/**
 * 10-week term calendar and planned pool closures.
 *
 * Owner edits this file before each new term. Dates use ISO YYYY-MM-DD.
 */
export interface TermClosure {
  /** ISO date YYYY-MM-DD inside the term window. */
  date: string;
  /** Public holiday or closure reason shown on the timetable. */
  reason: string;
}

export interface SwimTerm {
  /** Stable URL-safe term ID (e.g. `winter-2027`). */
  id: string;
  /** Display name (e.g. `Winter term`). */
  name: string;
  /** Inclusive ISO start date (YYYY-MM-DD). */
  start: string;
  /** Inclusive ISO end date (YYYY-MM-DD). */
  end: string;
  /** Scheduled holiday closures within this term. */
  closures: readonly TermClosure[];
}

export const terms: readonly SwimTerm[] = [
  {
    id: 'winter-2027',
    name: 'Winter term',
    start: '2027-01-11',
    end: '2027-03-21',
    closures: [
      { date: '2027-01-18', reason: 'Martin Luther King Jr. Day' },
      { date: '2027-02-15', reason: "Presidents' Day" },
    ],
  },
  {
    id: 'spring-2027',
    name: 'Spring term',
    start: '2027-04-05',
    end: '2027-06-13',
    closures: [
      { date: '2027-05-31', reason: 'Memorial Day' },
    ],
  },
];

/** Format an ISO YYYY-MM-DD date into a short, time-zone-neutral label ("11 Jan 2027"). */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[(month ?? 1) - 1] ?? ''} ${year}`;
}

/** Build the 10 weekly calendar tiles for a term, flagging weeks containing a closure. */
export function termWeeks(term: SwimTerm): { week: number; startIso: string; closure?: TermClosure }[] {
  const startDate = new Date(`${term.start}T12:00:00Z`);
  return Array.from({ length: 10 }, (_, idx) => {
    const weekStart = new Date(startDate.getTime() + idx * 7 * 86_400_000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 86_400_000);
    const startIso = weekStart.toISOString().slice(0, 10);
    const endIso = weekEnd.toISOString().slice(0, 10);
    const closure = term.closures.find(c => c.date >= startIso && c.date <= endIso);
    return { week: idx + 1, startIso, closure };
  });
}
