/** Instructors on deck at Otter Pond Swim School. Referenced by timetable classes. */
export interface Instructor {
  /** Stable URL-safe ID referenced by timetable entries. */
  id: string;
  /** Full name (fictitious gallery sample). */
  name: string;
  /** Pool deck role. */
  role: string;
  /** Levels or pool they typically lead. */
  teaches: string;
  /** Generic safety and teaching qualifications (no real certifying body names). */
  qualifications: string;
  /** Warm, parent-friendly detail for the lanyard card. */
  funFact: string;
  /** Accent colour token for their whistle lanyard strap. */
  lanyardColor: string;
}

export const instructors: readonly Instructor[] = [
  {
    id: 'maya',
    name: 'Maya Okafor',
    role: 'Head coach',
    teaches: 'Lap pool & Adult Splash',
    qualifications: 'Certified swim instructor, lifeguard and CPR certified',
    funFact: 'Has swum across Green Lake every summer since she was nine.',
    lanyardColor: 'var(--cap-navy)',
  },
  {
    id: 'theo',
    name: 'Theo Lindqvist',
    role: 'Stroke coach',
    teaches: 'Streamers & Divers',
    qualifications: 'Certified swim instructor and first-aid certified',
    funFact: 'Can teach butterfly arms with a pool noodle.',
    lanyardColor: 'var(--cap-orange)',
  },
  {
    id: 'rosa',
    name: 'Rosa Delgado',
    role: 'Little-ones lead',
    teaches: 'Otter Pups & Pebbles',
    qualifications: 'Certified infant & preschool swim instructor, CPR certified',
    funFact: 'Knows 41 bath-time songs.',
    lanyardColor: 'var(--cap-coral)',
  },
  {
    id: 'jun',
    name: 'Jun Park',
    role: 'Instructor',
    teaches: 'Ripples & Paddlers',
    qualifications: 'Certified swim instructor and lifeguard certified',
    funFact: 'Former nervous swimmer, now the calmest person on deck.',
    lanyardColor: 'var(--cap-lime)',
  },
];

export const instructorById: Record<string, Instructor> = Object.fromEntries(
  instructors.map(instructor => [instructor.id, instructor]),
);
