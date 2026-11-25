import { business } from '../content/business.ts';
import { instructors, type Instructor } from '../content/instructors.ts';
import { levels, type Level } from '../content/levels.ts';
import { makeupPolicy, makeupRules, makeupSwims, type MakeupSwim } from '../content/makeups.ts';
import { pools, type Pool } from '../content/pools.ts';
import { safetyTips, type SafetyTip } from '../content/safety.ts';
import { terms, type SwimTerm } from '../content/terms.ts';
import { timetable, type TimetableClass } from '../content/timetable.ts';
import { toMinutes, validateHours } from './hours.ts';

const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CLOCK_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function assertUniqueIds(items: readonly { id: string }[], label: string): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !ID_RE.test(item.id)) {
      throw new Error(`${label}: invalid URL-safe id "${item.id}"`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${label}: duplicate id "${item.id}"`);
    }
    seen.add(item.id);
  }
}

export function validateAllContent(data?: {
  pools?: readonly Pool[];
  levels?: readonly Level[];
  instructors?: readonly Instructor[];
  timetable?: readonly TimetableClass[];
  makeupSwims?: readonly MakeupSwim[];
  terms?: readonly SwimTerm[];
  safetyTips?: readonly SafetyTip[];
}): void {
  const poolList = data?.pools ?? pools;
  const levelList = data?.levels ?? levels;
  const instructorList = data?.instructors ?? instructors;
  const classList = data?.timetable ?? timetable;
  const makeupList = data?.makeupSwims ?? makeupSwims;
  const termList = data?.terms ?? terms;
  const safetyList = data?.safetyTips ?? safetyTips;

  validateHours(business.deskHours);

  // Unique IDs
  assertUniqueIds(poolList, 'pools');
  assertUniqueIds(levelList, 'levels');
  assertUniqueIds(instructorList, 'instructors');
  assertUniqueIds(classList, 'timetable');
  assertUniqueIds(makeupList, 'makeupSwims');
  assertUniqueIds(makeupRules, 'makeupRules');
  assertUniqueIds(termList, 'terms');
  assertUniqueIds(safetyList, 'safetyTips');

  const poolMap = new Map(poolList.map(p => [p.id, p]));
  const levelMap = new Map(levelList.map(l => [l.id, l]));
  const instructorMap = new Map(instructorList.map(i => [i.id, i]));

  // Levels
  for (const level of levelList) {
    if (!poolMap.has(level.poolId)) {
      throw new Error(`levels[${level.id}]: unknown poolId "${level.poolId}"`);
    }
    if (!Number.isInteger(level.termPrice) || level.termPrice <= 0) {
      throw new Error(`levels[${level.id}]: termPrice must be a positive whole dollar amount`);
    }
    if (!Number.isInteger(level.durationMinutes) || level.durationMinutes <= 0) {
      throw new Error(`levels[${level.id}]: durationMinutes must be positive`);
    }
    if (!Number.isInteger(level.maxClassSize) || level.maxClassSize <= 0) {
      throw new Error(`levels[${level.id}]: maxClassSize must be positive`);
    }
    if (level.maxAgeMonths !== null && level.maxAgeMonths < level.minAgeMonths) {
      throw new Error(`levels[${level.id}]: maxAgeMonths must be >= minAgeMonths`);
    }
    if (level.skills.length < 3 || level.skills.length > 4) {
      throw new Error(`levels[${level.id}]: expected 3 to 4 skills`);
    }
  }

  // Timetable classes
  const classCountByLevel = new Map<string, number>();
  for (const cls of classList) {
    const level = levelMap.get(cls.levelId);
    if (!level) throw new Error(`timetable[${cls.id}]: unknown levelId "${cls.levelId}"`);
    if (!poolMap.has(cls.poolId)) throw new Error(`timetable[${cls.id}]: unknown poolId "${cls.poolId}"`);
    if (!instructorMap.has(cls.instructorId)) {
      throw new Error(`timetable[${cls.id}]: unknown instructorId "${cls.instructorId}"`);
    }
    if (cls.poolId !== level.poolId) {
      throw new Error(`timetable[${cls.id}]: poolId "${cls.poolId}" does not match level "${level.id}" poolId "${level.poolId}"`);
    }
    if (!CLOCK_RE.test(cls.start) || !CLOCK_RE.test(cls.end)) {
      throw new Error(`timetable[${cls.id}]: start/end must be HH:MM`);
    }
    const startMin = toMinutes(cls.start);
    const endMin = toMinutes(cls.end);
    if (endMin <= startMin) {
      throw new Error(`timetable[${cls.id}]: end "${cls.end}" must be after start "${cls.start}"`);
    }
    if (endMin - startMin !== level.durationMinutes) {
      throw new Error(
        `timetable[${cls.id}]: duration ${endMin - startMin}m does not match level "${level.id}" durationMinutes ${level.durationMinutes}m`,
      );
    }
    if (!Number.isInteger(cls.spotsLeft) || cls.spotsLeft < 0 || cls.spotsLeft > level.maxClassSize) {
      throw new Error(
        `timetable[${cls.id}]: spotsLeft (${cls.spotsLeft}) must be between 0 and ${level.maxClassSize}`,
      );
    }
    classCountByLevel.set(cls.levelId, (classCountByLevel.get(cls.levelId) ?? 0) + 1);
  }

  // Every level has at least 2 weekly classes
  for (const level of levelList) {
    const count = classCountByLevel.get(level.id) ?? 0;
    if (count < 2) {
      throw new Error(`levels[${level.id}]: must have at least 2 weekly classes (found ${count})`);
    }
  }

  // No overlapping classes in the same pool or for the same instructor
  for (let i = 0; i < classList.length; i++) {
    for (let j = i + 1; j < classList.length; j++) {
      const a = classList[i];
      const b = classList[j];
      if (a.day !== b.day) continue;
      const overlaps = toMinutes(a.start) < toMinutes(b.end) && toMinutes(b.start) < toMinutes(a.end);
      if (!overlaps) continue;
      if (a.poolId === b.poolId) {
        throw new Error(`timetable[${a.id}] overlaps timetable[${b.id}] in pool "${a.poolId}"`);
      }
      if (a.instructorId === b.instructorId) {
        throw new Error(`timetable[${a.id}] overlaps timetable[${b.id}] for instructor "${a.instructorId}"`);
      }
    }
  }

  // Make-up policy & swims
  if (!CLOCK_RE.test(makeupPolicy.noticeCutoff)) {
    throw new Error(`makeupPolicy: invalid noticeCutoff "${makeupPolicy.noticeCutoff}"`);
  }
  if (!Number.isInteger(makeupPolicy.creditsPerTerm) || makeupPolicy.creditsPerTerm < 1) {
    throw new Error(`makeupPolicy: creditsPerTerm must be a positive integer`);
  }
  for (const swim of makeupList) {
    if (!poolMap.has(swim.poolId)) {
      throw new Error(`makeupSwims[${swim.id}]: unknown poolId "${swim.poolId}"`);
    }
    if (!CLOCK_RE.test(swim.start) || !CLOCK_RE.test(swim.end) || toMinutes(swim.end) <= toMinutes(swim.start)) {
      throw new Error(`makeupSwims[${swim.id}]: end must be after start`);
    }
    for (const levelId of swim.levelIds) {
      if (!levelMap.has(levelId)) {
        throw new Error(`makeupSwims[${swim.id}]: unknown levelId "${levelId}"`);
      }
    }
  }

  // Terms & closures
  let previousTermEnd = '';
  for (const term of termList) {
    if (!ISO_DATE_RE.test(term.start) || !ISO_DATE_RE.test(term.end)) {
      throw new Error(`terms[${term.id}]: start/end must be ISO YYYY-MM-DD`);
    }
    if (term.end <= term.start) {
      throw new Error(`terms[${term.id}]: end "${term.end}" must be after start "${term.start}"`);
    }
    if (previousTermEnd && term.start <= previousTermEnd) {
      throw new Error(`terms[${term.id}]: terms must be ordered without overlap`);
    }
    previousTermEnd = term.end;
    for (const closure of term.closures) {
      if (!ISO_DATE_RE.test(closure.date)) {
        throw new Error(`terms[${term.id}]: invalid closure date "${closure.date}"`);
      }
      if (closure.date < term.start || closure.date > term.end) {
        throw new Error(`terms[${term.id}]: closure "${closure.date}" falls outside ${term.start}..${term.end}`);
      }
    }
  }

  // Water-safety tips: exactly one featured
  const featured = safetyList.filter(t => t.featured);
  if (featured.length !== 1) {
    throw new Error(`safetyTips: expected exactly 1 featured tip (found ${featured.length})`);
  }
}
