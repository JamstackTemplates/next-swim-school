import { business } from '../content/business.ts';
import { levels } from '../content/levels.ts';
import { dayPeriods } from './hours.ts';
import { absoluteUrl } from './paths.ts';

/**
 * schema.org JSON-LD graph for Otter Pond Swim School:
 * - SportsActivityLocation with address, openingHoursSpecification, email and telephone
 * - Each swim level as a Course with provider pointing to the school and USD term offer
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const schoolId = url ? `${url}#school` : '#school';

  const openingHoursSpecification = business.deskHours.flatMap(entry =>
    dayPeriods(entry).map(period => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: period.opens,
      closes: period.closes,
    })),
  );

  const school = {
    '@type': 'SportsActivityLocation',
    '@id': schoolId,
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: "Across the path from Green Lake Park's east beach",
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification,
  };

  const courses = levels.map(level => ({
    '@type': 'Course',
    name: `${level.name} (${level.ageLabel})`,
    description: level.summary,
    ...(url ? { url: `${absoluteUrl('/levels/')}#${level.id}` } : {}),
    provider: { '@id': schoolId },
    offers: {
      '@type': 'Offer',
      price: String(level.termPrice),
      priceCurrency: 'USD',
      description: '10-week swimming term',
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [school, ...courses],
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
