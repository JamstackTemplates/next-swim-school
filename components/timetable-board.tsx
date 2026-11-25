'use client';

import { useEffect, useState } from 'react';
import { instructorById } from '../content/instructors';
import { levelById, levels } from '../content/levels';
import { makeupSwims } from '../content/makeups';
import { poolById } from '../content/pools';
import { DAY_LABELS, DAY_SHORT_LABELS, spotsLabel, timetable } from '../content/timetable';
import { currentShortDay, SHORT_DAYS, type ShortDay } from '../lib/hours';
import { site } from '../lib/site';
import { LaneBoard, SwimCap } from './pool-art';
import { SiteLink } from './site-link';

/** 7-column mini-week whiteboard preview for the Home page. */
export function MiniWeekBoard({
  title,
  subtitle,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  ctaLabel: string;
}) {
  const [today, setToday] = useState<ShortDay | null>(null);

  useEffect(() => {
    setToday(currentShortDay(site.timeZone));
  }, []);

  return (
    <LaneBoard
      title={title}
      subtitle={subtitle}
      headerAction={
        <SiteLink href="/timetable/" className="button px-4 py-2 text-sm">
          {ctaLabel}
        </SiteLink>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {SHORT_DAYS.map(day => {
          const isToday = today === day;
          const classes = timetable.filter(c => c.day === day);
          const isSunday = day === 'sun';
          return (
            <div
              key={day}
              className={`flex flex-col rounded-xl border-2 p-3 ${
                isToday
                  ? 'border-ink bg-sun-soft shadow-[0_3px_0_var(--ink)]'
                  : 'border-grout bg-deck/70'
              }`}
            >
              <div className="flex items-center justify-between gap-1 border-b border-grout pb-1.5">
                <span className="font-display text-sm font-extrabold text-ink">
                  {DAY_SHORT_LABELS[day]}
                </span>
                {isToday ? (
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[0.65rem] font-bold uppercase text-tile">
                    Today
                  </span>
                ) : null}
              </div>

              {isSunday ? (
                <div className="mt-2.5 space-y-2 text-xs">
                  {makeupSwims.map(swim => (
                    <div key={swim.id} className="rounded-lg border border-grout bg-tile p-2">
                      <p className="font-bold text-ink tabular-nums">{swim.start}–{swim.end}</p>
                      <p className="text-muted">Make-up swim</p>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="mt-2.5 space-y-1.5">
                  {classes.map(cls => {
                    const level = levelById[cls.levelId];
                    return (
                      <li
                        key={cls.id}
                        className="flex items-center gap-1.5 rounded-lg border border-grout bg-tile px-2 py-1 text-xs"
                      >
                        <SwimCap color={level.capColor} size={18} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold text-ink">{level.name}</p>
                          <p className="text-[0.7rem] text-muted tabular-nums">{cls.start}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </LaneBoard>
  );
}

const ACTIVE_CLASS_DAYS: readonly ShortDay[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/** Full filterable poolside lane-board timetable for /timetable/. */
export function FullTimetableBoard() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<ShortDay | 'all'>('all');
  const [today, setToday] = useState<ShortDay | null>(null);

  useEffect(() => {
    setToday(currentShortDay(site.timeZone));
  }, []);

  const filtered = timetable.filter(
    cls =>
      (selectedLevel === 'all' || cls.levelId === selectedLevel) &&
      (selectedDay === 'all' || cls.day === selectedDay),
  );

  const visibleDays = ACTIVE_CLASS_DAYS.filter(
    day => selectedDay === 'all' || day === selectedDay,
  );

  return (
    <div className="space-y-6">
      {/* Filter chips */}
      <div className="tile-panel space-y-4 p-5">
        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-wider text-muted">
            Filter by level
          </p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by swim level">
            <button
              type="button"
              aria-pressed={selectedLevel === 'all'}
              onClick={() => setSelectedLevel('all')}
              className="filter-chip"
            >
              All levels
            </button>
            {levels.map(level => (
              <button
                key={level.id}
                type="button"
                aria-pressed={selectedLevel === level.id}
                onClick={() => setSelectedLevel(current => (current === level.id ? 'all' : level.id))}
                className="filter-chip"
              >
                <SwimCap color={level.capColor} size={20} />
                <span>{level.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-xs font-extrabold uppercase tracking-wider text-muted">
            Filter by day
          </p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by weekday">
            <button
              type="button"
              aria-pressed={selectedDay === 'all'}
              onClick={() => setSelectedDay('all')}
              className="filter-chip"
            >
              All days
            </button>
            {ACTIVE_CLASS_DAYS.map(day => (
              <button
                key={day}
                type="button"
                aria-pressed={selectedDay === day}
                onClick={() => setSelectedDay(current => (current === day ? 'all' : day))}
                className="filter-chip"
              >
                {DAY_SHORT_LABELS[day]}
              </button>
            ))}
          </div>
        </div>

        <p role="status" aria-live="polite" className="text-sm font-semibold text-muted">
          Showing {filtered.length} of {timetable.length} weekly classes
          {selectedLevel !== 'all' ? ` in ${levelById[selectedLevel]?.name}` : ''}
          {selectedDay !== 'all' ? ` on ${DAY_LABELS[selectedDay]}` : ''}.
        </p>
      </div>

      {/* LaneBoard week view (6 columns on desktop, stacked day sections on mobile) */}
      <LaneBoard
        title="Weekly class board"
        subtitle="Monday to Saturday classes · Sunday is reserved for make-up swims"
      >
        {filtered.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-grout bg-deck p-8 text-center">
            <p className="font-display text-xl font-bold text-ink">No classes match that day and level.</p>
            <p className="mt-1 text-sm text-muted">Try clearing one of the filters above to see all weekly slots.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedLevel('all');
                setSelectedDay('all');
              }}
              className="button mt-4 text-sm"
            >
              Show all classes
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-4 ${
              visibleDays.length === 1 ? 'grid-cols-1 max-w-xl' : 'grid-cols-1 lg:grid-cols-3 xl:grid-cols-6'
            }`}
          >
            {visibleDays.map(day => {
              const dayClasses = filtered.filter(c => c.day === day);
              if (dayClasses.length === 0) return null;
              const isToday = today === day;

              return (
                <section
                  key={day}
                  aria-label={`${DAY_LABELS[day]} classes`}
                  className={`flex flex-col rounded-xl border-2 p-3 ${
                    isToday ? 'border-ink bg-sun-soft' : 'border-grout bg-deck/75'
                  }`}
                >
                  <header className="mb-3 flex items-center justify-between border-b-2 border-grout pb-2">
                    <h3 className="font-display text-lg font-extrabold text-ink">{DAY_LABELS[day]}</h3>
                    {isToday ? (
                      <span className="rounded-full bg-ink px-2 py-0.5 text-[0.68rem] font-bold uppercase text-tile">
                        Today
                      </span>
                    ) : null}
                  </header>

                  <ul className="space-y-2.5">
                    {dayClasses.map(cls => {
                      const level = levelById[cls.levelId];
                      const pool = poolById[cls.poolId];
                      const instructor = instructorById[cls.instructorId];
                      const isWaitlist = cls.spotsLeft === 0;

                      return (
                        <li
                          key={cls.id}
                          className="rounded-xl border-2 border-ink bg-tile p-3 shadow-[0_3px_0_var(--grout)]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <SwimCap color={level.capColor} initial={level.capInitial} size={26} />
                              <span className="font-display text-base font-extrabold leading-tight text-ink">
                                {level.name}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 text-sm font-bold text-ink tabular-nums">
                            {cls.start}–{cls.end}
                          </p>
                          <p className="text-xs text-muted">
                            {pool.name} · {instructor.name.split(' ')[0]}
                          </p>

                          <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-dashed border-grout pt-2">
                            <span
                              className={`inline-flex rounded-full border border-ink px-2.5 py-0.5 text-xs font-bold tabular-nums ${
                                isWaitlist
                                  ? 'bg-deck text-coral-ink'
                                  : 'bg-water-soft text-ink'
                              }`}
                            >
                              {spotsLabel(cls.spotsLeft)}
                            </span>
                            <code className="text-[0.68rem] text-muted">{cls.id}</code>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </LaneBoard>
    </div>
  );
}
