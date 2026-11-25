'use client';

import { useState } from 'react';
import {
  SAFETY_AUDIENCE_LABELS,
  SAFETY_WHERE_LABELS,
  safetyTips,
  type SafetyWhere,
} from '../content/safety';
import { PoolIcon } from './pool-icons';

const WHERE_FILTERS: readonly ('all' | SafetyWhere)[] = ['all', 'everywhere', 'home-pool', 'open-water', 'bath'];

const TILTS = ['-rotate-1', 'rotate-1', '-rotate-[0.6deg]', 'rotate-[0.8deg]'];

/** Filterable poolside safety sign wall for /water-safety/. Without JS, all tips show. */
export function SafetySignsWall() {
  const [where, setWhere] = useState<'all' | SafetyWhere>('all');

  const nonFeatured = safetyTips.filter(tip => !tip.featured);
  const visible = nonFeatured.filter(tip => where === 'all' || tip.where === where);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter water-safety tips by place">
          {WHERE_FILTERS.map(option => (
            <button
              key={option}
              type="button"
              aria-pressed={where === option}
              onClick={() => setWhere(option)}
              className="filter-chip"
            >
              {option === 'all' ? 'All places' : SAFETY_WHERE_LABELS[option]}
            </button>
          ))}
        </div>
        <p role="status" aria-live="polite" className="text-sm font-semibold text-muted">
          Showing {visible.length} of {nonFeatured.length} signs
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((tip, idx) => (
          <article
            key={tip.id}
            className={`safety-sign p-5 sm:p-6 transition-transform hover:rotate-0 ${TILTS[idx % TILTS.length]}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-water-soft text-ink">
                <PoolIcon name={tip.icon} size={24} />
              </span>
              <div className="flex flex-wrap justify-end gap-1.5 text-xs font-bold uppercase tracking-wide">
                <span className="rounded-full border border-ink bg-sun-soft px-2.5 py-0.5 text-ink">
                  {SAFETY_WHERE_LABELS[tip.where]}
                </span>
                <span className="rounded-full border border-grout bg-deck px-2.5 py-0.5 text-muted">
                  {SAFETY_AUDIENCE_LABELS[tip.forWhom]}
                </span>
              </div>
            </div>
            <h3 className="mt-4 font-display text-xl font-extrabold text-ink">{tip.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{tip.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
