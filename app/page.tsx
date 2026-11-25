import type { Metadata } from 'next';
import {
  ClosingCta,
  HomeHero,
  HomeSafetyBand,
  InstructorsOnDeck,
  MakeupPromise,
  VisitUs,
} from '../components/home-sections';
import { CompactLevelLadder } from '../components/level-ladder';
import { MiniWeekBoard } from '../components/timetable-board';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />

      <HomeHero>
        <HomeHero.Eyebrow>0.9 M · warm water · 90°F</HomeHero.Eyebrow>
        <HomeHero.Heading>Little splashes to big lengths.</HomeHero.Heading>
        <HomeHero.Intro>
          Small classes in a warm, shallow pond, eight levels from first bubbles to all four strokes,
          and a make-up swim when life gets in the way.
        </HomeHero.Intro>
        <HomeHero.Actions
          primary="Ask about a free level check"
          secondary="See the timetable"
        />
        <HomeHero.Status />
      </HomeHero>

      <CompactLevelLadder
        heading="Eight lanes, shallow to deep"
        intro="From 6-month-olds floating with a parent to squad-ready strokes and calm adult beginners — pick a lane to see skills, class size and term fees."
        ctaLabel="Explore levels & age finder"
      />

      <section aria-labelledby="home-week-heading" className="bg-deck py-14 sm:py-20">
        <div className="wrap">
          <MiniWeekBoard
            title="This week at the pond"
            subtitle="Classes run Monday to Saturday in 10-week terms; Sunday mornings are for make-up swims."
            ctaLabel="See full timetable"
          />
        </div>
      </section>

      <MakeupPromise
        eyebrow="LIFE HAPPENS"
        heading="Missed a lesson? Grab a Sunday splash."
        body={
          <>
            <p>
              Colds, family trips and soccer rainouts happen. Let the pool desk know by the cutoff on
              your lesson day and your swimmer earns a make-up credit for the same term.
            </p>
            <p>
              Credits work at our Sunday morning make-up sessions or in any same-level class with an
              open spot — just send an enquiry and we’ll reply once a place is held.
            </p>
          </>
        }
        ctaLabel="Read the make-up policy"
      />

      <HomeSafetyBand
        eyebrow="WATER SAFETY"
        heading="Three rules every family should know"
        intro="Lessons are only one layer of water safety. Share these poolside habits before summer trips to Green Lake, beaches or backyard pools."
        ctaLabel="See all safety tips"
      />

      <InstructorsOnDeck
        eyebrow="INSTRUCTORS ON DECK"
        heading="Friendly faces in the water every week"
        intro="Small classes mean your swimmer sees the same calm coach each week — certified, patient and stocked with bath-time songs."
      />

      <VisitUs
        eyebrow="VISIT THE POND"
        heading="Pool desk hours"
        intro={`Questions in person or by phone? Our front desk answers during the hours below (${business.timeZone}).`}
      />

      <ClosingCta
        heading="Not sure which lane fits your swimmer?"
        body="Send us your swimmer’s age and what they can do in the water right now. We’ll reply with a suggested level or invite you for a free 10-minute level check."
        ctaLabel="Ask about a free level check"
      />
    </>
  );
}
