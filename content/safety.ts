import type { PoolIconName } from '../components/pool-icons.tsx';

export type SafetyWhere = 'home-pool' | 'open-water' | 'bath' | 'everywhere';
export type SafetyAudience = 'little-ones' | 'kids' | 'grown-ups' | 'everyone';

export interface SafetyTip {
  /** Stable URL-safe ID. */
  id: string;
  /** Short, memorable sign headline. */
  title: string;
  /** Filter category for where the tip applies. */
  where: SafetyWhere;
  /** Who the tip is primarily for. */
  forWhom: SafetyAudience;
  /** Poolside icon key. */
  icon: PoolIconName;
  /** One or two practical sentences. */
  body: string;
  /** Exactly one tip is featured in the full-bleed water band. */
  featured: boolean;
}

export const SAFETY_WHERE_LABELS: Record<SafetyWhere, string> = {
  everywhere: 'Everywhere',
  'home-pool': 'Home pools',
  'open-water': 'Lakes & beaches',
  bath: 'Baths',
};

export const SAFETY_AUDIENCE_LABELS: Record<SafetyAudience, string> = {
  'little-ones': 'Little ones',
  kids: 'Kids',
  'grown-ups': 'Grown-ups',
  everyone: 'Everyone',
};

export const safetyTips: readonly SafetyTip[] = [
  {
    id: 'float-flip-follow',
    title: 'Float, flip, follow',
    where: 'everywhere',
    forWhom: 'everyone',
    icon: 'kickboard',
    body: 'If you’re tired or scared, roll onto your back, float, then wave and shout or follow the way to safety.',
    featured: true,
  },
  {
    id: 'arms-reach',
    title: 'Within arm’s reach',
    where: 'bath',
    forWhom: 'little-ones',
    icon: 'bathtub',
    body: 'Under-fives stay within an adult’s arm’s reach around baths, paddling pools and water’s edge — phone tucked away.',
    featured: false,
  },
  {
    id: 'water-watcher',
    title: 'Name a Water Watcher',
    where: 'everywhere',
    forWhom: 'grown-ups',
    icon: 'whistle',
    body: 'Name one dedicated Water Watcher at every gathering and swap the tag every 15 minutes so eyes never drift.',
    featured: false,
  },
  {
    id: 'fence-latch',
    title: 'Four-sided fence & latch',
    where: 'home-pool',
    forWhom: 'grown-ups',
    icon: 'gate',
    body: 'Keep a four-sided fence and a self-latching gate around home pools, and never prop the gate open.',
    featured: false,
  },
  {
    id: 'lifejackets',
    title: 'Fitted lifejackets on open water',
    where: 'open-water',
    forWhom: 'kids',
    icon: 'lifejacket',
    body: 'At lakes, rivers and docks wear a properly fitted lifejacket; arm bands and floaties aren’t lifejackets.',
    featured: false,
  },
  {
    id: 'cold-water',
    title: 'Respect cold Northwest lakes',
    where: 'open-water',
    forWhom: 'everyone',
    icon: 'lake',
    body: 'Northwest lakes stay cold even in summer; get in slowly and float first if the cold takes your breath.',
    featured: false,
  },
  {
    id: 'reach-throw',
    title: 'Reach or throw, don’t go',
    where: 'everywhere',
    forWhom: 'kids',
    icon: 'noodle',
    body: 'Hold out a noodle or throw something that floats from dry ground, and call a grown-up or lifeguard for help.',
    featured: false,
  },
  {
    id: 'lifeguard-hours',
    title: 'Swim where lifeguards are on duty',
    where: 'open-water',
    forWhom: 'grown-ups',
    icon: 'lifebuoy',
    body: 'Choose beaches with lifeguards on duty and check the posted hours before stepping in.',
    featured: false,
  },
  {
    id: 'learn-cpr',
    title: 'Learn CPR',
    where: 'everywhere',
    forWhom: 'grown-ups',
    icon: 'heart',
    body: 'Learn CPR; a short local course is the best water-safety gift for any family.',
    featured: false,
  },
];
