import { business } from '../content/business';
import { dayPeriods, formatClock12 } from '../lib/hours';
import { CopingEdge, PipDiving } from './pool-art';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="mt-16">
      <CopingEdge />
      <div className="deep-band py-12 text-deep-ink">
        <div className="wrap grid gap-10 md:grid-cols-12">
          {/* School identity & landmark */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <PipDiving className="shrink-0" />
              <div>
                <p className="font-display text-2xl font-extrabold text-deep-ink">{business.name}</p>
                <p className="text-sm text-deep-muted">Warm teaching pond &amp; 25 m lap pool</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-deep-muted">{business.location}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a className="font-semibold text-water underline" href={`mailto:${business.email}`}>
                {business.email}
              </a>
              <a className="font-semibold text-deep-ink underline tabular-nums" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                {business.phone}
              </a>
            </div>
          </div>

          {/* Pool desk hours summary */}
          <div className="md:col-span-4">
            <h2 className="font-display text-base font-extrabold uppercase tracking-wider text-sun">
              Pool desk hours
            </h2>
            <dl className="mt-3 space-y-1.5 text-sm text-deep-muted tabular-nums">
              {business.deskHours.map(entry => {
                const periods = dayPeriods(entry)
                  .map(p => `${formatClock12(p.opens)}–${formatClock12(p.closes)}`)
                  .join(' & ');
                return (
                  <div key={entry.day} className="flex justify-between gap-3 border-b border-white/10 pb-1">
                    <dt className="font-medium text-deep-ink">{entry.day.slice(0, 3)}</dt>
                    <dd className="text-right">
                      {periods}
                      {entry.note ? <span className="ml-1.5 text-xs text-sun">({entry.note})</span> : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h2 className="font-display text-base font-extrabold uppercase tracking-wider text-sun">
              Swim lanes
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><SiteLink href="/" className="text-deep-ink hover:text-water">Home</SiteLink></li>
              <li><SiteLink href="/levels/" className="text-deep-ink hover:text-water">Levels &amp; age finder</SiteLink></li>
              <li><SiteLink href="/timetable/" className="text-deep-ink hover:text-water">Weekly timetable</SiteLink></li>
              <li><SiteLink href="/make-ups/" className="text-deep-ink hover:text-water">Make-up policy</SiteLink></li>
              <li><SiteLink href="/water-safety/" className="text-deep-ink hover:text-water">Water-safety tips</SiteLink></li>
              <li><SiteLink href="/contact/" className="font-semibold text-sun hover:text-water">Ask the pool desk</SiteLink></li>
            </ul>
          </div>
        </div>

        <div className="wrap mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-deep-muted">
          <p>{business.name} · Seattle, WA · Pacific time ({business.timeZone})</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="text-deep-ink no-underline hover:text-water hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
