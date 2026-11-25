'use client';

import { useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { LaneRope, Wordmark } from './pool-art';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/levels/', label: 'Levels' },
  { href: '/timetable/', label: 'Timetable' },
  { href: '/make-ups/', label: 'Make-ups' },
  { href: '/water-safety/', label: 'Safety' },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-tile/95 backdrop-blur-sm">
      <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-3 py-2">
        <SiteLink
          href="/"
          className="no-underline hover:no-underline focus-visible:rounded-lg"
          aria-label="Otter Pond Swim School — Home"
        >
          <Wordmark />
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map(item => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent="page"
              className="font-display text-base font-bold text-ink transition-colors hover:text-primary-ink"
            >
              {item.label}
            </SiteLink>
          ))}
          <SiteLink href="/contact/" markCurrent="page" className="button px-5 py-2 text-sm">
            Contact
          </SiteLink>
          <DarkModeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMenuOpen(open => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border-2 border-ink bg-deck px-3 font-display text-sm font-bold text-ink"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile tiled panel */}
      {menuOpen ? (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobile navigation"
          className="tile-wall border-t-2 border-grout px-4 py-4 md:hidden"
        >
          <div className="tile-panel flex flex-col gap-2 p-4">
            {NAV_LINKS.map(item => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent="page"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 font-display text-lg font-bold text-ink hover:bg-water-soft"
              >
                {item.label}
              </SiteLink>
            ))}
            <SiteLink
              href="/contact/"
              markCurrent="page"
              onClick={() => setMenuOpen(false)}
              className="button mt-2 w-full justify-center"
            >
              Contact
            </SiteLink>
          </div>
        </nav>
      ) : null}

      <LaneRope compact className="-mb-1.5" />
    </header>
  );
}
