import type { Metadata } from 'next';
import { FullLevelPool } from '../../components/level-ladder';
import { PageHead } from '../../components/page-head';
import { DepthMarker, PipOnKickboard } from '../../components/pool-art';
import { SiteLink } from '../../components/site-link';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Levels',
  description:
    'Eight learn-to-swim levels from 6-month-old Otter Pups to Lane Otters and Adult Splash, with an age finder and clear move-up milestones.',
  alternates: { canonical: absoluteUrl('/levels/') },
};

export default function LevelsPage() {
  return (
    <>
      <PageHead marker="LEVELS" icon="ladder" title="Find the right lane">
        <p>
          Every swimmer moves at their own pace from our warm 0.9 m teaching pond into the 25 m lap
          pool. Use the age finder below or browse all eight lanes from shallow to deep.
        </p>
      </PageHead>

      <FullLevelPool />

      {/* How moving up works */}
      <section aria-labelledby="moving-up-heading" className="tile-wall py-14 sm:py-20">
        <div className="wrap">
          <DepthMarker>HOW MOVING UP WORKS</DepthMarker>
          <h2 id="moving-up-heading" className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Assessed in week 9, badge in week 10
          </h2>
          <p className="mt-2 max-w-2xl text-base text-muted">
            No surprise tests or pressure. Coaches watch skills naturally throughout the 10-week term
            and celebrate every swimmer at the finish.
          </p>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            <li className="tile-card border-[2.5px] border-ink p-6">
              <DepthMarker size="md">WK 9</DepthMarker>
              <h3 className="mt-4 font-display text-xl font-extrabold text-ink">Friendly skill check</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                During week 9’s normal lesson, your coach ticks off the move-up skills and chats with
                you on deck about whether your swimmer is ready for the next lane.
              </p>
            </li>
            <li className="tile-card border-[2.5px] border-ink p-6">
              <DepthMarker size="md">WK 10</DepthMarker>
              <h3 className="mt-4 font-display text-xl font-extrabold text-ink">Badge &amp; celebration</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Week 10 is badge week: every swimmer gets a progress certificate, a woven Otter Pond
                badge for their towel, and five extra minutes of splash games.
              </p>
            </li>
            <li className="tile-card border-[2.5px] border-ink p-6">
              <DepthMarker size="md">NEXT TERM</DepthMarker>
              <h3 className="mt-4 font-display text-xl font-extrabold text-ink">Fresh cap colour</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Swimmers moving up receive their next level’s swim cap at the start of the new term.
                Returning families get first word before general enquiries open.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="levels-cta-heading" className="wrap py-12">
        <div className="tile-panel grid items-center gap-8 border-[3px] border-ink p-6 sm:p-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <PipOnKickboard className="mx-auto max-w-[240px]" />
          </div>
          <div className="md:col-span-8">
            <h2 id="levels-cta-heading" className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
              Not sure which lane? Ask for a free level check
            </h2>
            <p className="mt-2 max-w-xl text-base text-muted">
              Tell us your swimmer’s age and comfort in the water. We’ll reply to suggest a lane or
              arrange a quick 10-minute in-water check before the term begins.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <SiteLink href="/contact/" className="button">
                Ask about a free level check
              </SiteLink>
              <SiteLink href="/timetable/" className="button button-quiet">
                Check class times
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
