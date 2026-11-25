import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { DepthMarker, LaneRope, PoolRulesSign } from '../../components/pool-art';
import { PoolIcon } from '../../components/pool-icons';
import { SiteLink } from '../../components/site-link';
import { buildMakeupRules, makeupPolicy, makeupSwims } from '../../content/makeups';
import { poolById } from '../../content/pools';
import { formatClock12 } from '../../lib/hours';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Make-ups',
  description:
    'Plain-English make-up lesson policy for Otter Pond Swim School: notice cutoff, credits per term, Sunday make-up swims, closures and illness.',
  alternates: { canonical: absoluteUrl('/make-ups/') },
};

export default function MakeupsPage() {
  const rules = buildMakeupRules(makeupPolicy);
  const cutoff = formatClock12(makeupPolicy.noticeCutoff);

  return (
    <>
      <PageHead marker="MAKE-UPS" icon="lifebuoy" title="Make-up lesson policy">
        <p>
          Stated plainly before you ever need it: up to{' '}
          <strong>
            {makeupPolicy.creditsPerTerm} make-up{' '}
            {makeupPolicy.creditsPerTerm === 1 ? 'credit' : 'credits'}
          </strong>{' '}
          per 10-week term when you tell us by <strong>{cutoff}</strong> on your lesson day.
        </p>
      </PageHead>

      {/* Enamel pool rules sign */}
      <section aria-label="Poolside make-up rules" className="wrap py-12">
        <PoolRulesSign title="Make-up swim rules" badge={`${makeupPolicy.creditsPerTerm} PER TERM · ${cutoff.toUpperCase()} CUTOFF`}>
          <ol className="grid gap-4 sm:grid-cols-2">
            {rules.map((rule, idx) => (
              <li
                key={rule.id}
                className="flex items-start gap-3.5 rounded-xl border-2 border-grout bg-deck/75 p-4"
              >
                <DepthMarker className="shrink-0">{idx + 1}</DepthMarker>
                <p className="text-sm leading-relaxed text-ink sm:text-base">{rule.text}</p>
              </li>
            ))}
          </ol>
        </PoolRulesSign>
      </section>

      {/* How to ask for a make-up (three steps along a lane rope) */}
      <section aria-labelledby="how-to-ask-heading" className="water-band border-y-[3px] border-ink py-14">
        <div className="wrap">
          <DepthMarker>3 SIMPLE STEPS</DepthMarker>
          <h2 id="how-to-ask-heading" className="mt-3 font-display text-3xl font-extrabold text-ink">
            How to ask for a make-up
          </h2>
          <LaneRope compact className="my-6" />

          <ol className="grid gap-6 md:grid-cols-3">
            <li className="tile-card border-[2.5px] border-ink p-6">
              <DepthMarker>STEP 1</DepthMarker>
              <h3 className="mt-3 font-display text-xl font-extrabold text-ink">Tell us by {cutoff}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Email or phone the pool desk before {cutoff} on the day of the missed lesson so we
                can log your credit for the term.
              </p>
            </li>
            <li className="tile-card border-[2.5px] border-ink p-6">
              <DepthMarker>STEP 2</DepthMarker>
              <h3 className="mt-3 font-display text-xl font-extrabold text-ink">Ask for a place</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Send an enquiry naming the missed class, the date, and whether you’d like a Sunday
                make-up swim or a same-level weekday spot.
              </p>
            </li>
            <li className="tile-card border-[2.5px] border-ink p-6">
              <DepthMarker>STEP 3</DepthMarker>
              <h3 className="mt-3 font-display text-xl font-extrabold text-ink">Wait for our reply</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A make-up place is held only when the front desk replies to confirm there’s room in
                that session.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* Sunday make-up swim session times */}
      <section aria-labelledby="sunday-swims-heading" className="wrap py-12">
        <DepthMarker>SUNDAY SESSIONS</DepthMarker>
        <h2 id="sunday-swims-heading" className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Sunday make-up swim times
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted">
          Every Sunday morning during weeks 1–9 (except badge week, week {makeupPolicy.noMakeupWeek}),
          we open both pools for make-up swimmers.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {makeupSwims.map(swim => {
            const pool = poolById[swim.poolId];
            return (
              <article key={swim.id} className="tile-panel border-[2.5px] border-ink p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <DepthMarker size="md">
                    SUN {swim.start}–{swim.end}
                  </DepthMarker>
                  <span className="text-sm font-semibold text-primary-ink">
                    {pool.name} ({pool.depth})
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">{swim.groupLabel}</h3>
                <p className="mt-2 text-sm text-muted">
                  Small-group skill practice with our coaches in the {pool.temperatureF}°F{' '}
                  {pool.name.toLowerCase()}.
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Closures and illness split panel */}
      <section aria-labelledby="closures-illness-heading" className="wrap pb-12">
        <h2 id="closures-illness-heading" className="sr-only">
          Pool closures and illness guidance
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="tile-card flex items-start gap-4 border-[2.5px] border-ink p-6">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-sun-soft text-coral-ink">
              <PoolIcon name="cone" size={26} />
            </span>
            <div>
              <h3 className="font-display text-xl font-extrabold text-ink">If we close the pool</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                For planned holidays, weather or pool maintenance closures, every affected swimmer
                receives an automatic make-up credit — it doesn’t count toward your{' '}
                {makeupPolicy.creditsPerTerm}-credit term limit.
              </p>
            </div>
          </article>

          <article className="tile-card flex items-start gap-4 border-[2.5px] border-ink p-6">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-water-soft text-ink">
              <PoolIcon name="lifebuoy" size={26} />
            </span>
            <div>
              <h3 className="font-display text-xl font-extrabold text-ink">Tummy bugs &amp; keeping the water clean</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                After vomiting or diarrhoea, please stay out of the pool for a full 48 hours. Even
                if it’s after {cutoff}, let the pool desk know and we’ll count it as notice.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border-[2.5px] border-ink bg-tile p-6">
          <p className="font-display text-lg font-bold text-ink">
            Need to log an absence or ask for a Sunday make-up place?
          </p>
          <SiteLink href="/contact/" className="button">
            Contact the pool desk
          </SiteLink>
        </div>
      </section>
    </>
  );
}
