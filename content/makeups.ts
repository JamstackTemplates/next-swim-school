import { formatClock12, type ShortDay } from '../lib/hours.ts';
import type { PoolId } from './pools.ts';

/** Typed make-up policy values shared by Home, /make-ups/ and tests. */
export interface MakeupPolicy {
  /** Local 24-hour HH:MM cutoff on the lesson day to earn a credit. */
  noticeCutoff: string;
  /** Number of make-up credits included per 10-week term. */
  creditsPerTerm: number;
  /** Plain description of when unused credits expire. */
  creditsExpire: string;
  /** Week number with no make-ups (badge and move-up week). */
  noMakeupWeek: number;
}

export interface MakeupRule {
  /** Stable rule ID. */
  id: string;
  /** Plain-language rule shown on the PoolRulesSign. */
  text: string;
}

export interface MakeupSwim {
  /** Stable session ID. */
  id: string;
  /** Weekday key (Sunday). */
  day: ShortDay;
  /** Start time in local HH:MM. */
  start: string;
  /** End time in local HH:MM. */
  end: string;
  /** Pool where the session runs. */
  poolId: PoolId;
  /** Levels welcome in this Sunday make-up swim. */
  levelIds: readonly string[];
  /** Friendly group label. */
  groupLabel: string;
}

export const makeupPolicy: MakeupPolicy = {
  noticeCutoff: '14:00',
  creditsPerTerm: 2,
  creditsExpire: 'last day of the term',
  noMakeupWeek: 10,
};

function numberWord(n: number): string {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
  return words[n] ?? String(n);
}

/** Derive the eight pool rules from the typed policy values so edits stay in sync everywhere. */
export function buildMakeupRules(policy: MakeupPolicy = makeupPolicy): readonly MakeupRule[] {
  const cutoff12 = formatClock12(policy.noticeCutoff);
  const creditWord = policy.creditsPerTerm === 1 ? 'credit' : 'credits';
  return [
    {
      id: 'give-notice',
      text: `Tell us by ${cutoff12} on the lesson day (email or phone) and you earn a make-up credit.`,
    },
    {
      id: 'two-per-term',
      text: `Up to ${numberWord(policy.creditsPerTerm)} make-up ${creditWord} (${policy.creditsPerTerm}) per 10-week term.`,
    },
    {
      id: 'same-term',
      text: `Credits are used in the same term and expire on the ${policy.creditsExpire}; they don’t carry over or turn into refunds.`,
    },
    {
      id: 'where',
      text: 'Use a credit at a Sunday make-up swim or in a same-level class with a spot free.',
    },
    {
      id: 'ask-first',
      text: 'Ask for a make-up place by enquiry; it is held only when the front desk replies.',
    },
    {
      id: 'pool-closures',
      text: 'If we close the pool, every swimmer gets a credit automatically, with no limit.',
    },
    {
      id: 'tummy-bugs',
      text: 'After vomiting or diarrhoea, stay out of the water for 48 hours; tell us and it counts as notice.',
    },
    {
      id: 'badge-week',
      text: `No make-ups in week ${policy.noMakeupWeek}; it’s badge and move-up week.`,
    },
  ];
}

export const makeupRules: readonly MakeupRule[] = buildMakeupRules(makeupPolicy);

export const makeupSwims: readonly MakeupSwim[] = [
  {
    id: 'sun-0900-little',
    day: 'sun',
    start: '09:00',
    end: '10:00',
    poolId: 'teaching-pond',
    levelIds: ['otter-pups', 'pebbles', 'ripples', 'paddlers'],
    groupLabel: 'Otter Pups – Paddlers',
  },
  {
    id: 'sun-1000-lap',
    day: 'sun',
    start: '10:00',
    end: '11:00',
    poolId: 'lap-pool',
    levelIds: ['streamers', 'divers', 'lane-otters', 'adult-splash'],
    groupLabel: 'Streamers – Adult Splash',
  },
];
