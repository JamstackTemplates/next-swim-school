import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { DepthMarker } from '../../components/pool-art';
import { PoolIcon } from '../../components/pool-icons';
import { SiteLink } from '../../components/site-link';
import { FullTimetableBoard } from '../../components/timetable-board';
import { pools } from '../../content/pools';
import { formatIsoDate, terms, termWeeks } from '../../content/terms';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Timetable',
  description:
    'Weekly swimming lesson timetable for Otter Pond Swim School in Seattle, with live spot counts, pool details and 10-week term dates.',
  alternates: { canonical: absoluteUrl('/timetable/') },
};

export default function TimetablePage() {
  const currentTerm = terms[0];
  const weeks = termWeeks(currentTerm);

  return (
    <>
      <PageHead
        marker="TIMETABLE"
        icon="calendar"
        title="Weekly class board"
        extra={
          <div className="tile-card border-2 border-ink p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">
                {currentTerm.name} · {formatIsoDate(currentTerm.start)} – {formatIsoDate(currentTerm.end)}
              </p>
              <span className="text-xs font-semibold text-muted">10 weekly lessons</span>
            </div>
            <ol className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-10">
              {weeks.map(w => (
                <li
                  key={w.week}
                  className={`flex flex-col items-center justify-center rounded-lg border-2 px-1.5 py-2 text-center tabular-nums ${
                    w.closure
                      ? 'border-ink bg-sun-soft text-ink'
                      : w.week === 10
                        ? 'border-ink bg-water-soft text-ink'
                        : 'border-grout bg-deck text-ink'
                  }`}
                  title={w.closure ? `Closure: ${w.closure.reason} (${formatIsoDate(w.closure.date)})` : w.week === 10 ? 'Week 10: Badge week' : `Week ${w.week}`}
                >
                  <span className="font-display text-xs font-extrabold">WK {w.week}</span>
                  {w.closure ? (
                    <PoolIcon name="cone" size={16} className="mt-0.5 text-coral-ink" />
                  ) : w.week === 10 ? (
                    <span className="mt-0.5 text-[0.65rem] font-bold uppercase text-primary-ink">Badge</span>
                  ) : (
                    <span className="mt-0.5 text-[0.65rem] text-muted">{w.startIso.slice(5)}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        }
      >
        <p>
          Filter by level or day to find a time that fits your week. All times are Pacific time
          (Seattle). Note the class ID (such as <code>wed-1600-pebbles</code>) when sending an
          enquiry.
        </p>
      </PageHead>

      <section aria-label="Filterable weekly timetable" className="wrap py-10">
        <FullTimetableBoard />
      </section>

      {/* Pool key */}
      <section aria-labelledby="pool-key-heading" className="water-band border-y-[3px] border-ink py-12">
        <div className="wrap">
          <DepthMarker>TWO POOLS</DepthMarker>
          <h2 id="pool-key-heading" className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Pool key
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {pools.map(pool => (
              <article key={pool.id} className="tile-card border-[2.5px] border-ink p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-2xl font-extrabold text-ink">{pool.name}</h3>
                  <div className="flex items-center gap-2">
                    <DepthMarker>{pool.depth}</DepthMarker>
                    <span className="rounded-md border-2 border-ink bg-sun px-2.5 py-0.5 font-display text-sm font-extrabold text-[#0B2A36] tabular-nums">
                      {pool.temperatureF}°F
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-base text-muted">{pool.description}.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Term dates & closures */}
      <section aria-labelledby="terms-heading" className="wrap py-12">
        <DepthMarker>TERM DATES &amp; CLOSURES</DepthMarker>
        <h2 id="terms-heading" className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Upcoming 10-week terms
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {terms.map(term => (
            <article key={term.id} className="tile-panel p-6">
              <h3 className="font-display text-xl font-extrabold text-ink">{term.name}</h3>
              <p className="mt-1 font-semibold text-primary-ink tabular-nums">
                {formatIsoDate(term.start)} – {formatIsoDate(term.end)}
              </p>
              {term.closures.length > 0 ? (
                <div className="mt-4 border-t-2 border-dashed border-grout pt-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Planned closures</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {term.closures.map(c => (
                      <li key={c.date} className="flex items-center gap-2 text-ink">
                        <PoolIcon name="cone" size={18} className="shrink-0 text-coral-ink" />
                        <span className="font-semibold tabular-nums">{formatIsoDate(c.date)}</span>
                        <span className="text-muted">— {c.reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* Ask to join CTA */}
      <section aria-labelledby="timetable-cta-heading" className="wrap pb-10">
        <div className="tile-panel flex flex-col items-start justify-between gap-6 border-[3px] border-ink p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 id="timetable-cta-heading" className="font-display text-2xl font-extrabold text-ink">
              Ask to join a class or waitlist
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
              Include the class ID (for example <code>wed-1600-pebbles</code>) and your swimmer’s
              age in your enquiry. We’ll reply to confirm whether a place is free.
            </p>
          </div>
          <SiteLink href="/contact/" className="button shrink-0">
            Send an enquiry
          </SiteLink>
        </div>
      </section>
    </>
  );
}
