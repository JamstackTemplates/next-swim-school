'use client';

import { useState } from 'react';
import { levels, matchLevelsForAge } from '../content/levels';
import { poolById } from '../content/pools';
import { DepthMarker, LaneRope, SwimCap } from './pool-art';
import { PoolIcon } from './pool-icons';
import { SiteLink } from './site-link';

/** Compact top-down 8-lane pool strip for the Home page. */
export function CompactLevelLadder({
  heading,
  intro,
  ctaLabel,
}: {
  heading: string;
  intro: string;
  ctaLabel: string;
}) {
  return (
    <section aria-labelledby="home-levels-heading" className="water-band border-y-[3px] border-ink py-12 sm:py-16">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <DepthMarker>8 LANES · SHALLOW TO DEEP</DepthMarker>
            <h2
              id="home-levels-heading"
              className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold text-ink"
            >
              {heading}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-ink/85">{intro}</p>
          </div>
          <SiteLink href="/levels/" className="button button-quiet">
            {ctaLabel}
          </SiteLink>
        </div>

        {/* Horizontal swim-lane ladder (scrolls sideways cleanly on small viewports) */}
        <div className="mt-6 -mx-1 overflow-x-auto px-1 pt-2 pb-3 sm:mx-0 sm:overflow-visible sm:px-0">
          <ol className="grid min-w-[44rem] grid-cols-8 gap-2.5 sm:min-w-0 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map(level => {
              const pool = poolById[level.poolId];
              return (
                <li key={level.id} className="lane-row">
                  <SiteLink
                    href={`/levels/#${level.id}`}
                    className="group flex h-full flex-col justify-between rounded-xl border-[2.5px] border-ink bg-tile p-4 no-underline shadow-[0_4px_0_var(--ink)] transition-transform hover:-translate-y-1 hover:no-underline"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-xs font-extrabold uppercase tracking-wider text-muted">
                          Lane {level.order} · {pool.depth}
                        </span>
                        <SwimCap color={level.capColor} initial={level.capInitial} size={36} className="lane-float" />
                      </div>
                      <h3 className="mt-2 font-display text-xl font-extrabold text-ink group-hover:text-primary-ink">
                        {level.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-primary-ink">{level.ageLabel}</p>
                      <p className="mt-1.5 text-sm leading-snug text-muted">{level.summary}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-dashed border-grout pt-2.5 text-xs font-semibold text-ink tabular-nums">
                      <span>{level.durationMinutes} min · max {level.maxClassSize}</span>
                      <span>${level.termPrice}</span>
                    </div>
                  </SiteLink>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Interactive age finder + full 8-lane pool for /levels/. */
export function FullLevelPool() {
  const [years, setYears] = useState<string>('');
  const [months, setMonths] = useState<string>('');

  const hasInput = years.trim() !== '' || months.trim() !== '';
  const totalMonths =
    (years.trim() === '' ? 0 : Math.max(0, Number(years) || 0) * 12) +
    (months.trim() === '' ? 0 : Math.max(0, Number(months) || 0));

  const matched = hasInput ? matchLevelsForAge(totalMonths) : [];
  const matchedIds = new Set(matched.map(l => l.id));

  return (
    <div className="space-y-10">
      {/* Age finder tiled bar */}
      <section aria-labelledby="age-finder-heading" className="wrap pt-10">
        <div className="tile-panel p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <DepthMarker>AGE FINDER</DepthMarker>
              <h2 id="age-finder-heading" className="mt-2.5 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                How old is your swimmer?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Enter years, months, or both to highlight matching lanes. Boundary ages match both lanes.
              </p>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
                <span>Years</span>
                <input
                  type="number"
                  min={0}
                  max={99}
                  inputMode="numeric"
                  placeholder="e.g. 4"
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  className="h-11 w-24 rounded-xl border-2 border-ink bg-deck px-3 font-sans text-base font-semibold text-ink tabular-nums"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-semibold text-ink">
                <span>Months</span>
                <input
                  type="number"
                  min={0}
                  max={36}
                  inputMode="numeric"
                  placeholder="0"
                  value={months}
                  onChange={e => setMonths(e.target.value)}
                  className="h-11 w-24 rounded-xl border-2 border-ink bg-deck px-3 font-sans text-base font-semibold text-ink tabular-nums"
                />
              </label>
              {hasInput ? (
                <button
                  type="button"
                  onClick={() => {
                    setYears('');
                    setMonths('');
                  }}
                  className="button button-quiet h-11 px-4 text-sm"
                >
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          {/* Announced match summary */}
          <div role="status" aria-live="polite" className="mt-4">
            {hasInput ? (
              matched.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-ink bg-sun-soft px-4 py-3 text-sm font-semibold text-ink">
                  <span>
                    {matched.length === 1 ? '1 matching lane:' : `${matched.length} matching lanes:`}
                  </span>
                  {matched.map(level => (
                    <a
                      key={level.id}
                      href={`#${level.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-tile px-3 py-1 font-display text-xs font-extrabold text-ink no-underline hover:bg-water-soft"
                    >
                      <SwimCap color={level.capColor} size={20} />
                      <span>{level.name}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl border-2 border-grout bg-deck px-4 py-3 text-sm text-muted">
                  {totalMonths < 6
                    ? 'Our youngest class (Otter Pups) starts at 6 months. Get in touch to join the next term once your baby is 6 months old.'
                    : 'Between 14 and 16? Ask the pool desk for a free level check — we’ll place them in Lane Otters or Adult Splash.'}
                </p>
              )
            ) : (
              <p className="text-sm text-muted">
                All eight lanes are shown below from shallowest teaching pond to the 25 m lap pool.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Full vertical pool of 8 lanes */}
      <section aria-label="All eight swim levels" className="water-band border-y-[3px] border-ink py-10 sm:py-14">
        <div className="wrap space-y-6">
          {levels.map((level, idx) => {
            const pool = poolById[level.poolId];
            const isMatch = matchedIds.has(level.id);
            const isDimmed = hasInput && matched.length > 0 && !isMatch;

            return (
              <div key={level.id}>
                <article
                  id={level.id}
                  className={`lane-row scroll-mt-24 rounded-2xl border-[3px] bg-tile p-5 transition-opacity sm:p-7 ${
                    isMatch
                      ? 'border-ink ring-4 ring-sun shadow-[0_8px_0_var(--ink)]'
                      : 'border-ink shadow-[0_5px_0_var(--grout)]'
                  } ${isDimmed ? 'opacity-55' : 'opacity-100'}`}
                >
                  <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                    {/* Left: lane marker, cap, title, meta */}
                    <div className="lg:col-span-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <DepthMarker>LANE {level.order} · {pool.depth}</DepthMarker>
                        {isMatch ? (
                          <span className="rounded-full border-2 border-ink bg-sun px-3 py-0.5 font-display text-xs font-extrabold uppercase text-[#0B2A36]">
                            Matches age
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <SwimCap color={level.capColor} initial={level.capInitial} size={54} className="lane-float" />
                        <div>
                          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                            {level.name}
                          </h2>
                          <p className="font-semibold text-primary-ink">{level.ageLabel}</p>
                        </div>
                      </div>

                      <p className="mt-3 text-base text-muted">{level.summary}</p>

                      <dl className="mt-4 grid grid-cols-2 gap-2.5 rounded-xl border-2 border-grout bg-deck p-3.5 text-sm tabular-nums sm:grid-cols-4 lg:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold uppercase text-muted">Pool</dt>
                          <dd className="font-bold text-ink">{pool.name} ({pool.temperatureF}°F)</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase text-muted">Lesson</dt>
                          <dd className="font-bold text-ink">{level.durationMinutes} min</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase text-muted">Class size</dt>
                          <dd className="font-bold text-ink">Max {level.maxClassSize}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase text-muted">10-week term</dt>
                          <dd className="font-display text-lg font-extrabold text-ink">${level.termPrice}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Right: skills as tick-floats & moves-up kickboard */}
                    <div className="space-y-4 lg:col-span-7">
                      <div>
                        <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-muted">
                          What swimmers practise
                        </h3>
                        <ul className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
                          {level.skills.map(skill => (
                            <li
                              key={skill}
                              className="flex items-start gap-2.5 rounded-xl border-2 border-grout bg-deck/70 px-3.5 py-2.5 text-sm text-ink"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-ink bg-water"
                              />
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Kickboard "moves up when" box */}
                      <div className="flex items-start gap-3.5 rounded-2xl border-[2.5px] border-ink bg-sun-soft p-4">
                        <PoolIcon name="kickboard" size={28} className="mt-0.5 shrink-0 text-ink" />
                        <div>
                          <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">
                            Moves up when
                          </h3>
                          <p className="mt-1 text-sm text-ink/90">{level.moveUpWhen}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
                {idx < levels.length - 1 ? <LaneRope compact className="mt-6 opacity-85" /> : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
