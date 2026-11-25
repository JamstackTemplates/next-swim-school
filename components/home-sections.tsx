import type { ReactNode } from 'react';
import { business } from '../content/business';
import { instructors } from '../content/instructors';
import { makeupPolicy } from '../content/makeups';
import { safetyTips } from '../content/safety';
import { formatClock12 } from '../lib/hours';
import { DeskHoursTable } from './desk-hours-table';
import { OpenBadge } from './open-badge';
import {
  CopingEdge,
  DepthMarker,
  EastBeachVignette,
  LaneRope,
  PipOnKickboard,
  PondHero,
  PoolRulesSign,
  WhistleLanyard,
} from './pool-art';
import { PoolIcon } from './pool-icons';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/* 1. Home Hero */
function HomeHeroSection({ children }: ChildrenProps) {
  return (
    <section aria-label="Introduction" className="hero-pool-glow relative overflow-hidden pb-6 pt-5 sm:pb-10 sm:pt-8 lg:pb-10 lg:pt-8">
      <div className="wrap grid items-center gap-7 lg:grid-cols-12 lg:gap-6">
        <div className="z-10 flex flex-col items-start lg:col-span-5">{children}</div>
        <div className="lg:col-span-7">
          <PondHero className="shadow-[0_10px_0_var(--grout)]" />
        </div>
      </div>
    </section>
  );
}

function HeroEyebrow({ children }: ChildrenProps) {
  return <DepthMarker size="md">{children}</DepthMarker>;
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.4rem)] font-extrabold leading-[1.04] text-ink">
      {children}
    </h1>
  );
}

function HeroIntro({ children }: ChildrenProps) {
  return <p className="mt-4 max-w-[34ch] text-base leading-relaxed text-muted sm:text-lg">{children}</p>;
}

function HeroActions({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return (
    <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
      <SiteLink href="/contact/" className="button w-full sm:w-auto">
        {primary}
      </SiteLink>
      <SiteLink href="/timetable/" className="button button-quiet w-full sm:w-auto">
        {secondary}
      </SiteLink>
    </div>
  );
}

function HeroStatus() {
  return (
    <div className="mt-5">
      <OpenBadge hours={business.deskHours} />
    </div>
  );
}

export const HomeHero = Object.assign(HomeHeroSection, {
  Eyebrow: HeroEyebrow,
  Heading: HeroHeading,
  Intro: HeroIntro,
  Actions: HeroActions,
  Status: HeroStatus,
});

/* 4. Make-up Promise */
export function MakeupPromise({
  eyebrow,
  heading,
  body,
  ctaLabel,
}: {
  eyebrow: string;
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: string;
}) {
  const cutoff = formatClock12(makeupPolicy.noticeCutoff);
  return (
    <section aria-labelledby="home-makeup-heading" className="tile-wall scroll-reveal relative overflow-hidden py-14 sm:py-20">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PoolRulesSign title="Make-up promise" badge="POOL RULE">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-7xl font-extrabold leading-none text-coral-ink sm:text-8xl tabular-nums">
                {makeupPolicy.creditsPerTerm}
              </span>
              <div>
                <p className="font-display text-xl font-extrabold text-ink">
                  make-up {makeupPolicy.creditsPerTerm === 1 ? 'swim' : 'swims'} a term
                </p>
                <p className="mt-1 text-sm text-muted">
                  Tell us by <strong className="text-ink">{cutoff}</strong> on lesson day
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-xl border-2 border-grout bg-deck px-3.5 py-2.5 text-sm text-ink">
              Use a credit at Sunday make-up swims or in a same-level class with an open spot.
            </p>
          </PoolRulesSign>
        </div>

        <div className="lg:col-span-7">
          <DepthMarker>{eyebrow}</DepthMarker>
          <h2 id="home-makeup-heading" className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold text-ink">
            {heading}
          </h2>
          <div className="mt-4 max-w-xl space-y-3 text-base leading-relaxed text-muted">{body}</div>
          <div className="mt-6">
            <SiteLink href="/make-ups/" className="button">
              {ctaLabel}
            </SiteLink>
          </div>
          <LaneRope variant="sagging" compact className="mt-8" />
        </div>
      </div>
    </section>
  );
}

/* 5. Water-safety signs band (deep end) */
export function HomeSafetyBand({
  eyebrow,
  heading,
  intro,
  ctaLabel,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
  ctaLabel: string;
}) {
  const featured = safetyTips.find(t => t.featured);
  const picks = [
    featured,
    safetyTips.find(t => t.id === 'arms-reach'),
    safetyTips.find(t => t.id === 'reach-throw'),
  ].filter((t): t is NonNullable<typeof t> => Boolean(t));

  const tilts = ['-rotate-1', 'rotate-1', '-rotate-[0.7deg]'];

  return (
    <section aria-labelledby="home-safety-heading" className="scroll-reveal">
      <CopingEdge />
      <div className="deep-band py-14 sm:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <DepthMarker className="bg-sun text-[#0B2A36] border-[#0B2A36]">{eyebrow}</DepthMarker>
              <h2 id="home-safety-heading" className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold text-deep-ink">
                {heading}
              </h2>
              <p className="mt-2 max-w-2xl text-base text-deep-muted">{intro}</p>
            </div>
            <SiteLink href="/water-safety/" className="button button-sun">
              {ctaLabel}
            </SiteLink>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {picks.map((tip, idx) => (
              <article key={tip.id} className={`safety-sign p-6 transition-transform hover:rotate-0 ${tilts[idx % tilts.length]}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-water-soft text-ink">
                    <PoolIcon name={tip.icon} size={24} />
                  </span>
                  {tip.featured ? <DepthMarker>START HERE</DepthMarker> : null}
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold text-ink">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{tip.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <CopingEdge flip />
    </section>
  );
}

/* 6. Instructors on deck (hanging whistle lanyards) */
export function InstructorsOnDeck({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  const strapHeights = [26, 52, 32, 46];

  return (
    <section aria-labelledby="home-instructors-heading" className="scroll-reveal bg-deck py-14 sm:py-20">
      <div className="wrap">
        <DepthMarker>{eyebrow}</DepthMarker>
        <h2 id="home-instructors-heading" className="mt-3 font-display text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold text-ink">
          {heading}
        </h2>
        <p className="mt-2 max-w-2xl text-base text-muted">{intro}</p>

        {/* Stainless pool rail from which lanyards hang */}
        <div className="mt-8">
          <div
            aria-hidden="true"
            className="h-3.5 w-full rounded-full border-[2.5px] border-ink bg-tile shadow-[inset_0_-3px_0_var(--grout)]"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((coach, idx) => (
              <WhistleLanyard
                key={coach.id}
                strapHeight={strapHeights[idx % strapHeights.length]}
                accentColor={coach.lanyardColor}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-xs font-extrabold uppercase tracking-wider text-primary-ink">
                    {coach.role}
                  </span>
                  <PoolIcon name="whistle" size={20} className="text-ink" />
                </div>
                <h3 className="mt-1.5 font-display text-xl font-extrabold text-ink">{coach.name}</h3>
                <p className="text-xs font-semibold text-muted">{coach.teaches}</p>
                <p className="mt-3 text-sm leading-snug text-ink">{coach.funFact}</p>
                <p className="mt-3 border-t border-dashed border-grout pt-2.5 text-xs text-muted">
                  {coach.qualifications}
                </p>
              </WhistleLanyard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7. Visit us (desk hours + East Beach vignette) */
export function VisitUs({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section aria-labelledby="home-visit-heading" className="water-band scroll-reveal border-y-[3px] border-ink py-14 sm:py-20">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="tile-panel p-6 sm:p-8 lg:col-span-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DepthMarker>{eyebrow}</DepthMarker>
            <OpenBadge hours={business.deskHours} />
          </div>
          <h2 id="home-visit-heading" className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 text-sm text-muted">{intro}</p>
          <div className="mt-5">
            <DeskHoursTable hours={business.deskHours} />
          </div>
        </div>

        <div className="tile-panel flex flex-col gap-5 p-6 sm:p-8 lg:col-span-6">
          <EastBeachVignette />
          <div>
            <h3 className="font-display text-xl font-extrabold text-ink">Find the pond</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{business.location}</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t-2 border-dashed border-grout pt-4 text-sm font-semibold">
            <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
              {business.email}
            </a>
            <a className="text-link tabular-nums" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
              {business.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 8. Closing CTA */
export function ClosingCta({
  heading,
  body,
  ctaLabel,
}: {
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: string;
}) {
  return (
    <section aria-labelledby="home-cta-heading" className="tile-wall scroll-reveal py-14 sm:py-20">
      <div className="wrap">
        <div className="tile-panel grid items-center gap-8 border-[3px] border-ink p-6 sm:p-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <PipOnKickboard className="mx-auto max-w-[260px]" />
          </div>
          <div className="md:col-span-8">
            <DepthMarker>FREE 10-MINUTE LEVEL CHECK</DepthMarker>
            <h2 id="home-cta-heading" className="mt-3 font-display text-[clamp(1.8rem,4vw,2.7rem)] font-extrabold text-ink">
              {heading}
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted">{body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SiteLink href="/contact/" className="button">
                {ctaLabel}
              </SiteLink>
              <SiteLink href="/levels/" className="button button-quiet">
                Browse all 8 levels
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
