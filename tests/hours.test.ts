import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, deskStatus, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => (day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' }));
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
const deskAt = (date: string) => deskStatus(business.deskHours, 'America/Los_Angeles', new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('Otter Pond desk hours handle Wednesday split periods, boundaries and Sunday make-up hours', () => {
  // Wednesday 2027-01-13 in PST (UTC-8): 09:00-10:30 and 15:00-20:00
  assert.deepEqual(deskAt('2027-01-13T16:59:00Z'), { open: false, label: 'Closed · opens today 9 am' });
  assert.deepEqual(deskAt('2027-01-13T17:00:00Z'), { open: true, label: 'Pool desk open now · until 10:30 am' });
  assert.deepEqual(deskAt('2027-01-13T18:29:00Z'), { open: true, label: 'Pool desk open now · until 10:30 am' });
  assert.deepEqual(deskAt('2027-01-13T18:30:00Z'), { open: false, label: 'Closed · opens today 3 pm' });
  assert.deepEqual(deskAt('2027-01-13T23:00:00Z'), { open: true, label: 'Pool desk open now · until 8 pm' });
  assert.deepEqual(deskAt('2027-01-14T04:00:00Z'), { open: false, label: 'Closed · opens Thu 3 pm' });

  // Sunday 2027-01-17 in PST (UTC-8): 08:30-11:30
  assert.deepEqual(deskAt('2027-01-17T16:29:00Z'), { open: false, label: 'Closed · opens today 8:30 am' });
  assert.deepEqual(deskAt('2027-01-17T16:30:00Z'), { open: true, label: 'Pool desk open now · until 11:30 am' });
  assert.deepEqual(deskAt('2027-01-17T19:30:00Z'), { open: false, label: 'Closed · opens Mon 3 pm' });

  // Friday evening wraps to Saturday 7:30 am
  assert.deepEqual(deskAt('2027-01-16T04:00:00Z'), { open: false, label: 'Closed · opens Sat 7:30 am' });
});

test('missing/invalid zones stay neutral and 2027 America/Los_Angeles DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');

  // 2027 DST starts Sunday 14 March (clocks spring forward to PDT = UTC-7).
  // Sunday desk opens at 08:30 PDT = 15:30Z.
  assert.deepEqual(deskAt('2027-03-14T15:29:00Z'), { open: false, label: 'Closed · opens today 8:30 am' });
  assert.deepEqual(deskAt('2027-03-14T15:30:00Z'), { open: true, label: 'Pool desk open now · until 11:30 am' });

  // 2027 DST ends Sunday 7 November (clocks fall back to PST = UTC-8).
  // Sunday desk opens at 08:30 PST = 16:30Z.
  assert.deepEqual(deskAt('2027-11-07T16:29:00Z'), { open: false, label: 'Closed · opens today 8:30 am' });
  assert.deepEqual(deskAt('2027-11-07T16:30:00Z'), { open: true, label: 'Pool desk open now · until 11:30 am' });
});

test('invalid/incomplete/overnight/overlapping split intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  assert.doesNotThrow(() => validateHours(business.deskHours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))), /Tuesday/);
  assert.throws(
    () =>
      validateHours(
        hours.map(x =>
          x.day === 'Wednesday'
            ? { day: 'Wednesday', periods: [{ opens: '09:00', closes: '12:00' }, { opens: '11:30', closes: '15:00' }] }
            : x,
        ),
      ),
    /Wednesday/,
  );
});
