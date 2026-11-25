import type { Metadata } from 'next';
import { CopyEmail } from '../../components/copy-email';
import { DeskHoursTable } from '../../components/desk-hours-table';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { DepthMarker, EastBeachVignette } from '../../components/pool-art';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead marker="CONTACT" icon="whistle" title={business.enquiries.title}>
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid gap-8 py-12 lg:grid-cols-12 lg:items-start">
        {/* Left: hosted form (or email fallback) + clipboard checklist */}
        <section aria-label="Enquiry form" className="space-y-6 lg:col-span-7">
          <div className="tile-panel border-[2.5px] border-ink p-6 sm:p-8">
            {hosted ? (
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            ) : (
              <div>
                <DepthMarker>DIRECT EMAIL ENQUIRY</DepthMarker>
                <h2 className="mt-3 font-display text-2xl font-extrabold text-ink">
                  Write to the pool desk directly
                </h2>
                <p className="mt-2 text-muted">
                  The online enquiry form is not connected on this preview. Email us at{' '}
                  <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>{' '}
                  or call{' '}
                  <a className="text-link tabular-nums" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                    {business.phone}
                  </a>{' '}
                  during desk hours.
                </p>
              </div>
            )}

            <p className="mt-5 border-t-2 border-dashed border-grout pt-4 text-sm text-muted">
              Sending an enquiry does not reserve or pay for a spot automatically — our front desk
              will reply to confirm whether a place, level check or make-up swim is free.
            </p>
          </div>

          {/* Clipboard list of what to include */}
          <div className="tile-card relative border-[2.5px] border-ink p-6">
            <div className="flex items-center gap-2">
              <DepthMarker>CLIPBOARD</DepthMarker>
              <h2 className="font-display text-xl font-extrabold text-ink">What to include in your message</h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-ink sm:text-base">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-ink bg-sun"
                  />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Right: email, phone, desk hours, location vignette */}
        <aside aria-label="Pool desk contact details" className="space-y-6 lg:col-span-5">
          <div className="tile-panel p-6">
            <h2 className="font-display text-xl font-extrabold text-ink">Email &amp; phone</h2>
            <p className="mt-3">
              <a className="text-link wrap-anywhere text-base font-semibold" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <CopyEmail email={business.email} />
            </div>
            {business.phone ? (
              <p className="mt-4 border-t border-dashed border-grout pt-3 text-base">
                <span className="text-sm font-semibold text-muted">Phone: </span>
                <a className="text-link font-semibold tabular-nums" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                  {business.phone}
                </a>
              </p>
            ) : null}
          </div>

          <div className="tile-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-extrabold text-ink">Pool desk hours</h2>
              <OpenBadge hours={business.deskHours} />
            </div>
            <div className="mt-4">
              <DeskHoursTable hours={business.deskHours} />
            </div>
          </div>

          <div className="tile-panel space-y-4 p-6">
            <EastBeachVignette />
            <p className="text-sm leading-relaxed text-muted">{business.location}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
