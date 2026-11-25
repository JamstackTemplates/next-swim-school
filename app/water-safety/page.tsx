import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { DepthMarker, PipOnKickboard, ReachThrow } from '../../components/pool-art';
import { SafetySignsWall } from '../../components/safety-signs';
import { safetyTips } from '../../content/safety';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Water Safety',
  description:
    'Free, practical water-safety tips for families from Otter Pond Swim School — for baths, home pools, Green Lake and open water.',
  alternates: { canonical: absoluteUrl('/water-safety/') },
};

export default function WaterSafetyPage() {
  const featured = safetyTips.find(t => t.featured) ?? safetyTips[0];

  return (
    <>
      <PageHead marker="SAFETY" icon="lifejacket" title="Water-safety signs for families">
        <p>
          Free, practical reminders for home pools, Northwest lakes, beaches and bath time. Save
          them, print them or talk through them with your swimmers before a water day.
        </p>
      </PageHead>

      {/* Featured tip: Float, flip, follow */}
      <section aria-labelledby="featured-safety-heading" className="water-band border-b-[3px] border-ink py-12 sm:py-16">
        <div className="wrap grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="rounded-2xl border-[3px] border-ink bg-tile p-5 shadow-[0_6px_0_var(--ink)]">
              <PipOnKickboard />
            </div>
          </div>
          <div className="md:col-span-7">
            <DepthMarker className="bg-sun text-[#0B2A36] border-[#0B2A36]">THE FIRST RULE WE TEACH</DepthMarker>
            <h2
              id="featured-safety-heading"
              className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-ink"
            >
              {featured.title}
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink/90">{featured.body}</p>
            <ol className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-ink">
              <li className="rounded-full border-2 border-ink bg-tile px-4 py-1.5">1. Roll onto your back</li>
              <li className="rounded-full border-2 border-ink bg-tile px-4 py-1.5">2. Float &amp; breathe</li>
              <li className="rounded-full border-2 border-ink bg-tile px-4 py-1.5">3. Wave, shout or follow the edge</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Filterable tip signs */}
      <section aria-labelledby="safety-wall-heading" className="wrap py-12 sm:py-16">
        <DepthMarker>POOLSIDE SIGNS</DepthMarker>
        <h2 id="safety-wall-heading" className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Safety habits by place
        </h2>
        <div className="mt-6">
          <SafetySignsWall />
        </div>
      </section>

      {/* Reach or throw, don't go diagram */}
      <section aria-labelledby="reach-throw-heading" className="tile-wall border-t-[3px] border-ink py-12 sm:py-16">
        <div className="wrap">
          <DepthMarker>HELPING SAFELY</DepthMarker>
          <h2 id="reach-throw-heading" className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Reach or throw, don’t go
          </h2>
          <p className="mt-2 max-w-2xl text-base text-muted">
            Even strong swimmers can get pulled under by a panicked friend. Practise these three
            steps with kids from dry ground.
          </p>
          <ReachThrow className="mt-7" />

          {/* Closing disclaimer tile */}
          <aside className="mt-10 rounded-xl border-2 border-grout bg-tile p-5 text-sm leading-relaxed text-muted">
            <strong className="font-display text-ink">Important note:</strong> These water-safety
            tips are for general family awareness and do not replace constant, undistracted adult
            supervision, lifeguards, swimming lessons or certified CPR and first-aid training.
          </aside>
        </div>
      </section>
    </>
  );
}
