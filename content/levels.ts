import type { CapColor } from '../components/pool-art.tsx';
import type { PoolId } from './pools.ts';

/** Swim level from shallowest teaching-pond class to squad-ready lap pool and adult beginners. */
export interface Level {
  /** Stable URL-safe ID used in anchors (/levels/#pebbles) and timetable references. */
  id: string;
  /** Public level name. */
  name: string;
  /** Ladder order from 1 (shallowest) to 8. */
  order: number;
  /** Minimum recommended age in months (inclusive). */
  minAgeMonths: number;
  /** Maximum recommended age in months (inclusive), or null for no upper limit. */
  maxAgeMonths: number | null;
  /** Human-readable age range displayed on cards and lanes. */
  ageLabel: string;
  /** Pool where this level runs; must match every timetable class for this level. */
  poolId: PoolId;
  /** Class length in minutes. */
  durationMinutes: number;
  /** Maximum number of swimmers per class. */
  maxClassSize: number;
  /** Price in whole US dollars per 10-week term. */
  termPrice: number;
  /** Swim cap colour token key. */
  capColor: CapColor;
  /** Single-letter badge printed on the swim cap glyph. */
  capInitial: string;
  /** One-sentence overview for parents. */
  summary: string;
  /** Three to four "can do" skills practiced in this lane. */
  skills: readonly string[];
  /** Clear benchmark for moving up during week 9 assessment. */
  moveUpWhen: string;
}

export const levels: readonly Level[] = [
  {
    id: 'otter-pups',
    name: 'Otter Pups',
    order: 1,
    minAgeMonths: 6,
    maxAgeMonths: 36,
    ageLabel: '6–36 mo (with a parent)',
    poolId: 'teaching-pond',
    durationMinutes: 30,
    maxClassSize: 6,
    termPrice: 180,
    capColor: 'sun',
    capInitial: 'O',
    summary: 'Songs, splashes and safe holds with a parent in the water.',
    skills: [
      'Enters the warm pond calmly on a parent’s shoulder',
      'Reaches for floating toys and kicks with gentle cues',
      'Rests on back with head on a parent’s chest',
      'Holds the coping edge with both hands',
    ],
    moveUpWhen: 'Turns 3 and is happy splashing, holding the edge and taking cues from an instructor',
  },
  {
    id: 'pebbles',
    name: 'Pebbles',
    order: 2,
    minAgeMonths: 36,
    maxAgeMonths: 60,
    ageLabel: '3–5 yrs',
    poolId: 'teaching-pond',
    durationMinutes: 30,
    maxClassSize: 4,
    termPrice: 210,
    capColor: 'coral',
    capInitial: 'P',
    summary: 'First class without a parent: bubbles, faces in, holding the wall.',
    skills: [
      'Blows bubbles with face in the water',
      'Walks across the pond holding the lane rope',
      'Jumps in from the edge to an instructor',
      'Floats on front and back with gentle support',
    ],
    moveUpWhen: 'Submerges face comfortably, blows steady bubbles and glides to an instructor unaided',
  },
  {
    id: 'ripples',
    name: 'Ripples',
    order: 3,
    minAgeMonths: 48,
    maxAgeMonths: 72,
    ageLabel: '4–6 yrs',
    poolId: 'teaching-pond',
    durationMinutes: 30,
    maxClassSize: 4,
    termPrice: 210,
    capColor: 'lime',
    capInitial: 'R',
    summary: 'Floating on front and back, kicking with a board.',
    skills: [
      'Pushes off the wall in a pencil glide',
      'Star-floats on front and back without help',
      'Kicks 5 m with a kickboard and long straight legs',
      'Climbs safely out of the pond without a ladder',
    ],
    moveUpWhen: 'Floats on front and back unaided for 5 seconds and kicks 3 m',
  },
  {
    id: 'paddlers',
    name: 'Paddlers',
    order: 4,
    minAgeMonths: 60,
    maxAgeMonths: 96,
    ageLabel: '5–8 yrs',
    poolId: 'teaching-pond',
    durationMinutes: 30,
    maxClassSize: 5,
    termPrice: 220,
    capColor: 'aqua',
    capInitial: 'D',
    summary: 'Glides, rolling over to float, 5 m of freestyle.',
    skills: [
      'Rolls from front paddle to back float to take a breath',
      'Swims 5 m of freestyle arms with continuous kick',
      'Kicks 10 m on back with ears in the water',
      'Retrieves a sinking ring from chest-deep water',
    ],
    moveUpWhen: 'Swims 5 m freestyle, rolls to a calm back float and returns to the wall',
  },
  {
    id: 'streamers',
    name: 'Streamers',
    order: 5,
    minAgeMonths: 72,
    maxAgeMonths: 120,
    ageLabel: '6–10 yrs',
    poolId: 'lap-pool',
    durationMinutes: 45,
    maxClassSize: 6,
    termPrice: 240,
    capColor: 'violet',
    capInitial: 'S',
    summary: '15 m freestyle and backstroke with side breathing.',
    skills: [
      'Swims 15 m freestyle turning the head to breathe to the side',
      'Swims 15 m steady backstroke with straight arm recovery',
      'Pushes off the lap-pool wall in tight streamline',
      'Treads water calmly for 30 seconds in the shallow end',
    ],
    moveUpWhen: 'Swims 15 m freestyle with rhythmic side breathing and 15 m continuous backstroke',
  },
  {
    id: 'divers',
    name: 'Divers',
    order: 6,
    minAgeMonths: 84,
    maxAgeMonths: 144,
    ageLabel: '7–12 yrs',
    poolId: 'lap-pool',
    durationMinutes: 45,
    maxClassSize: 6,
    termPrice: 240,
    capColor: 'orange',
    capInitial: 'V',
    summary: 'Breaststroke, treading water for a minute, sitting dives.',
    skills: [
      'Coordinates breaststroke pull, breath, kick and glide over 25 m',
      'Treads water for one full minute in the deep end',
      'Enters smoothly from a sitting and kneeling dive',
      'Practises dolphin kick on front and back',
    ],
    moveUpWhen: 'Swims 25 m each of freestyle, backstroke and breaststroke and treads water for 60 seconds',
  },
  {
    id: 'lane-otters',
    name: 'Lane Otters',
    order: 7,
    minAgeMonths: 96,
    maxAgeMonths: 168,
    ageLabel: '8–14 yrs',
    poolId: 'lap-pool',
    durationMinutes: 45,
    maxClassSize: 8,
    termPrice: 260,
    capColor: 'navy',
    capInitial: 'L',
    summary: 'All four strokes over 50 m, tumble turns, squad-ready.',
    skills: [
      'Swims 50 m each of freestyle, backstroke and breaststroke',
      'Swims 25 m legal butterfly with two-hand touch',
      'Executes compact freestyle tumble turns and pace-clock starts',
      'Builds stamina across structured mini-sets',
    ],
    moveUpWhen: 'Completes a 100 m individual medley smoothly and is ready for local youth swim squads',
  },
  {
    id: 'adult-splash',
    name: 'Adult Splash',
    order: 8,
    minAgeMonths: 192,
    maxAgeMonths: null,
    ageLabel: '16+',
    poolId: 'lap-pool',
    durationMinutes: 45,
    maxClassSize: 5,
    termPrice: 280,
    capColor: 'otter',
    capInitial: 'A',
    summary: 'Calm beginners and improvers, starting in the shallow end.',
    skills: [
      'Builds relaxed breathing and buoyancy at your own pace',
      'Starts in stand-up shallow water with no pressure to go deep',
      'Refines freestyle, backstroke or breaststroke for lap swimming',
      'Small five-swimmer lane with an instructor in the water when helpful',
    ],
    moveUpWhen: 'Swims comfortable lengths at your chosen pace — many adults stay term to term',
  },
];

export const levelById: Record<string, Level> = Object.fromEntries(
  levels.map(level => [level.id, level]),
);

/** Return all levels whose recommended age range includes `ageMonths` (inclusive boundaries). */
export function matchLevelsForAge(ageMonths: number): Level[] {
  if (!Number.isFinite(ageMonths) || ageMonths < 0) return [];
  return levels.filter(
    level => ageMonths >= level.minAgeMonths && (level.maxAgeMonths === null || ageMonths <= level.maxAgeMonths),
  );
}
