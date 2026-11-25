'use client';

import { useEffect, useState } from 'react';
import { deskStatus, type DeskStatus, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output; browser refreshes in the business time zone every minute. */
export function OpenBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [status, setStatus] = useState<DeskStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(deskStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  if (!status) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border-2 border-grout bg-tile px-3.5 py-1.5 text-sm font-semibold text-muted ${className}`}
      >
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-water" />
        <span>Pool desk hours · Seattle time</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-semibold tabular-nums ${
        status.open ? 'bg-sun text-[#0B2A36]' : 'bg-tile text-ink'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full border border-ink ${status.open ? 'bg-[var(--cap-lime)]' : 'bg-coral'}`}
      />
      <span>{status.label}</span>
    </span>
  );
}
