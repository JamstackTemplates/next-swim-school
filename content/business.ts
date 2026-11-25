import type { OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number. */
  phone: string;
  /** Landmark location description (no street number for gallery sample). */
  location: string;
  /** City, region and postal code for structured data. */
  address: {
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  /** IANA time zone matching site.config.json. */
  timeZone: string;
  /** Pool front-desk hours in local America/Los_Angeles time. No range crosses midnight. */
  deskHours: readonly OpeningHours[];
  /** Contact page copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Must frame all requests as enquiries — never confirmed bookings or payments. */
    introduction: string;
    /** Guidance for what parents and swimmers should include in the message box. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Otter Pond Swim School',
  tagline: 'Little splashes to big lengths.',
  introduction:
    'Small classes in a warm, shallow pond, eight levels from first bubbles to all four strokes, and a make-up swim when life gets in the way.',
  email: 'hello@next-swim-school.jamstacks.net',
  phone: '(206) 555-0164',
  location: "Otter Pond Swim School, across the path from Green Lake Park's east beach, Seattle, WA 98115",
  address: {
    locality: 'Seattle',
    region: 'WA',
    postalCode: '98115',
    country: 'US',
  },
  timeZone: 'America/Los_Angeles',
  deskHours: [
    { day: 'Monday', opens: '15:00', closes: '20:00' },
    { day: 'Tuesday', opens: '15:00', closes: '20:00' },
    {
      day: 'Wednesday',
      periods: [
        { opens: '09:00', closes: '10:30' },
        { opens: '15:00', closes: '20:00' },
      ],
    },
    { day: 'Thursday', opens: '15:00', closes: '20:00' },
    { day: 'Friday', opens: '15:00', closes: '20:00' },
    { day: 'Saturday', opens: '07:30', closes: '13:00' },
    { day: 'Sunday', opens: '08:30', closes: '11:30', note: 'Make-up swims only' },
  ],
  enquiries: {
    title: 'Ask the pool desk',
    introduction:
      'Send an enquiry for a free level check, a class or waitlist place, a make-up swim, or adult lessons. We’ll reply to confirm whether a place is free.',
    usefulToInclude: [
      'The swimmer’s first name and age',
      'Their current level, or what they can do in the water now',
      'Preferred days and times, or the class ID from the timetable (e.g. wed-1600-pebbles)',
      'For a make-up: the missed class and date',
    ],
  },
};
