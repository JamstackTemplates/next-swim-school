import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { levels, matchLevelsForAge } from '../content/levels.ts';
import { buildMakeupRules, makeupPolicy } from '../content/makeups.ts';
import { safetyTips } from '../content/safety.ts';
import { terms } from '../content/terms.ts';
import { timetable } from '../content/timetable.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';
import { validateAllContent } from '../lib/validate-content.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'location'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 3, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('all swim school collections pass cross-reference, schedule and invariant validation', () => {
  assert.doesNotThrow(() => validateAllContent());
});

test('content validation errors name the offending item ID', () => {
  // Unknown levelId
  assert.throws(
    () =>
      validateAllContent({
        timetable: timetable.map(c => (c.id === 'mon-1600-pebbles' ? { ...c, levelId: 'ghost-level' } : c)),
      }),
    /mon-1600-pebbles/,
  );

  // Pool mismatch with level
  assert.throws(
    () =>
      validateAllContent({
        timetable: timetable.map(c => (c.id === 'mon-1600-pebbles' ? { ...c, poolId: 'lap-pool' } : c)),
      }),
    /mon-1600-pebbles/,
  );

  // Duration mismatch
  assert.throws(
    () =>
      validateAllContent({
        timetable: timetable.map(c => (c.id === 'mon-1600-pebbles' ? { ...c, end: '16:45' } : c)),
      }),
    /mon-1600-pebbles/,
  );

  // spotsLeft out of range
  assert.throws(
    () =>
      validateAllContent({
        timetable: timetable.map(c => (c.id === 'mon-1600-pebbles' ? { ...c, spotsLeft: 99 } : c)),
      }),
    /mon-1600-pebbles/,
  );

  // Pool overlap
  assert.throws(
    () =>
      validateAllContent({
        timetable: [
          ...timetable,
          {
            id: 'mon-1615-ripples',
            day: 'mon',
            start: '16:15',
            end: '16:45',
            levelId: 'ripples',
            poolId: 'teaching-pond',
            instructorId: 'jun',
            spotsLeft: 1,
          },
        ],
      }),
    /mon-1615-ripples/,
  );

  // Closure outside term
  assert.throws(
    () =>
      validateAllContent({
        terms: terms.map(t =>
          t.id === 'spring-2027' ? { ...t, closures: [{ date: '2027-07-04', reason: 'Too late' }] } : t,
        ),
      }),
    /spring-2027/,
  );

  // Featured safety tip count
  assert.throws(
    () => validateAllContent({ safetyTips: safetyTips.map(t => ({ ...t, featured: false })) }),
    /featured/,
  );

  // Non-whole price
  assert.throws(
    () =>
      validateAllContent({
        levels: levels.map(l => (l.id === 'pebbles' ? { ...l, termPrice: 210.5 } : l)),
      }),
    /pebbles/,
  );
});

test('age finder matches exact boundaries and edge cases', () => {
  assert.deepEqual(matchLevelsForAge(5).map(l => l.id), []);
  assert.deepEqual(matchLevelsForAge(6).map(l => l.id), ['otter-pups']);
  assert.deepEqual(matchLevelsForAge(36).map(l => l.id), ['otter-pups', 'pebbles']);
  assert.deepEqual(matchLevelsForAge(16 * 12).map(l => l.id), ['adult-splash']);
  assert.deepEqual(matchLevelsForAge(34 * 12).map(l => l.id), ['adult-splash']);
});

test('make-up rules derive dynamically from makeupPolicy', () => {
  const defaultRules = buildMakeupRules(makeupPolicy);
  assert.ok(defaultRules.some(r => r.text.includes('2 pm')));
  assert.ok(defaultRules.some(r => r.text.includes('two make-up credits (2)')));

  const updatedRules = buildMakeupRules({ ...makeupPolicy, creditsPerTerm: 3, noticeCutoff: '13:00' });
  assert.ok(updatedRules.some(r => r.text.includes('1 pm')));
  assert.ok(updatedRules.some(r => r.text.includes('three make-up credits (3)')));
});

test('structured data emits SportsActivityLocation and all eight Course offers', () => {
  const graph = businessStructuredData()['@graph'];
  const school = graph.find(item => item['@type'] === 'SportsActivityLocation');
  const courses = graph.filter(item => item['@type'] === 'Course');
  assert.ok(school, 'SportsActivityLocation required');
  assert.equal(courses.length, 8);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
