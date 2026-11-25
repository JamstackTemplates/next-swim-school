import { DepthMarker, LostGoggles404 } from '../components/pool-art';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="tile-wall py-14 sm:py-20">
      <div className="wrap max-w-2xl text-center">
        <DepthMarker size="lg">404 · EMPTY LANE</DepthMarker>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          This lane’s empty
        </h1>
        <p className="mt-3 text-base text-muted sm:text-lg">
          Pip checked the bottom of the pool and found a stray pair of goggles, but not the page you
          were looking for.
        </p>

        <div className="my-8">
          <LostGoggles404 />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <SiteLink href="/levels/" className="button">
            Swim levels
          </SiteLink>
          <SiteLink href="/timetable/" className="button button-quiet">
            Weekly timetable
          </SiteLink>
          <SiteLink href="/" className="button button-quiet">
            Back to home
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
