import type { ReactNode } from 'react';
import { asset } from '../lib/paths';

export type CapColor = 'sun' | 'coral' | 'lime' | 'aqua' | 'violet' | 'orange' | 'navy' | 'otter';

const CAP_FILL: Record<CapColor, string> = {
  sun: 'var(--cap-sun)',
  coral: 'var(--cap-coral)',
  lime: 'var(--cap-lime)',
  aqua: 'var(--cap-aqua)',
  violet: 'var(--cap-violet)',
  orange: 'var(--cap-orange)',
  navy: 'var(--cap-navy)',
  otter: 'var(--cap-otter)',
};

const CAP_INK: Record<CapColor, string> = {
  sun: 'var(--cap-sun-ink)',
  coral: 'var(--cap-coral-ink)',
  lime: 'var(--cap-lime-ink)',
  aqua: 'var(--cap-aqua-ink)',
  violet: 'var(--cap-violet-ink)',
  orange: 'var(--cap-orange-ink)',
  navy: 'var(--cap-navy-ink)',
  otter: 'var(--cap-otter-ink)',
};

/** Brand wordmark: "Otter Pond" in Grandstander with a ripple ring around the O and Pip's tail. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="42"
        height="42"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="44" height="44" rx="11" fill="var(--water-soft)" stroke="var(--ink)" strokeWidth="2.8" />
        <path d="M24 3V45M3 24H45" stroke="var(--grout)" strokeWidth="1.6" />
        {/* Ripple rings */}
        <circle cx="22" cy="25" r="14" stroke="var(--water)" strokeWidth="2.5" strokeDasharray="6 4" />
        <circle cx="22" cy="25" r="9.5" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.8" />
        <circle cx="22" cy="25" r="4" fill="var(--water-soft)" stroke="var(--ink)" strokeWidth="2.4" />
        {/* Little Pip otter tail splashing out */}
        <path
          d="M32 30 C37 28 42 22 40 16 C36 18 33 23 30 27 Z"
          fill="var(--otter)"
          stroke="var(--ink)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <circle cx="38" cy="11" r="2.2" fill="var(--water)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          Otter Pond
        </span>
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Swim School
        </span>
      </span>
    </span>
  );
}

/** Painted ceramic depth marker badge ("0.9 M", "WK 10", "LEVELS"). */
export function DepthMarker({
  children,
  size = 'sm',
  className = '',
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizing =
    size === 'lg'
      ? 'px-4 py-1.5 text-lg sm:text-xl border-[3px]'
      : size === 'md'
        ? 'px-3 py-1 text-sm sm:text-base border-[2.5px]'
        : 'px-2.5 py-0.5 text-xs sm:text-sm border-2';
  return (
    <span className={`depth-marker ${sizing} ${className}`}>
      {children}
    </span>
  );
}

/** Swim cap glyph in any of the 8 level cap tokens, with optional level initial. */
export function SwimCap({
  color,
  initial,
  size = 38,
  className = '',
}: {
  color: CapColor;
  initial?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 0.82)}
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path
        d="M5 29 C5 10 39 10 39 29 C34 32 10 32 5 29 Z"
        fill={CAP_FILL[color]}
        stroke="var(--ink)"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Wet highlight crescent */}
      <path
        d="M12 18 Q18 13 25 14"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.88"
      />
      {initial ? (
        <text
          x="22"
          y="26.5"
          textAnchor="middle"
          fill={CAP_INK[color]}
          fontFamily="var(--font-display)"
          fontWeight="800"
          fontSize="12.5"
        >
          {initial}
        </text>
      ) : null}
    </svg>
  );
}

/** Horizontal lane-rope divider of alternating floats (coral, tile-white, sun, aqua). */
export function LaneRope({
  variant = 'straight',
  compact = false,
  className = '',
}: {
  variant?: 'straight' | 'sagging';
  compact?: boolean;
  className?: string;
}) {
  const count = compact ? 18 : 28;
  const width = compact ? 720 : 1120;
  const height = variant === 'sagging' ? 38 : 24;
  const midY = variant === 'sagging' ? 12 : 12;
  const palette = ['var(--coral)', 'var(--tile)', 'var(--sun)', 'var(--tile)', 'var(--water)', 'var(--tile)'];

  return (
    <div className={`lane-rope-interactive w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="block h-auto w-full"
        style={{ minHeight: compact ? '14px' : '22px', maxHeight: variant === 'sagging' ? '38px' : '24px' }}
      >
        {variant === 'sagging' ? (
          <path
            d={`M0 10 Q ${width / 2} 32 ${width} 10`}
            stroke="var(--ink)"
            strokeWidth="3"
            fill="none"
          />
        ) : (
          <line x1="0" y1={midY} x2={width} y2={midY} stroke="var(--ink)" strokeWidth="3" />
        )}
        {Array.from({ length: count }).map((_, i) => {
          const t = (i + 0.5) / count;
          const x = t * width;
          const y = variant === 'sagging' ? 10 + 4 * 11 * t * (1 - t) : midY;
          const fill = palette[i % palette.length];
          return (
            <g key={i} className="lane-float">
              <rect
                x={x - 14}
                y={y - 7}
                width="28"
                height="14"
                rx="7"
                fill={fill}
                stroke="var(--ink)"
                strokeWidth="2.4"
              />
              <line
                x1={x - 7}
                y1={y - 3.5}
                x2={x + 4}
                y2={y - 3.5}
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Rounded pool-edge coping band with ceramic tile row underneath, separating zones. */
export function CopingEdge({ flip = false, className = '' }: { flip?: boolean; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full select-none ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <div className="h-4 w-full border-y-[2.5px] border-ink bg-tile shadow-[inset_0_-4px_0_var(--grout)]" />
      <div
        className="h-3.5 w-full border-b-[2.5px] border-ink"
        style={{
          backgroundColor: 'var(--water-soft)',
          backgroundImage:
            'repeating-linear-gradient(to right, var(--water) 0 28px, var(--grout) 28px 31px)',
        }}
      />
    </div>
  );
}

/** Enamel poolside rules sign frame with corner screws and a lifebuoy at the top corner. */
export function PoolRulesSign({
  title,
  badge,
  children,
  className = '',
}: {
  title: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl border-[3px] border-ink bg-tile p-6 shadow-[0_8px_0_var(--deep)] sm:p-8 ${className}`}>
      {/* Corner enamel mounting screws */}
      <span aria-hidden="true" className="absolute top-3 left-3 h-3 w-3 rounded-full border-2 border-ink bg-grout" />
      <span aria-hidden="true" className="absolute top-3 right-3 h-3 w-3 rounded-full border-2 border-ink bg-grout" />
      <span aria-hidden="true" className="absolute bottom-3 left-3 h-3 w-3 rounded-full border-2 border-ink bg-grout" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 h-3 w-3 rounded-full border-2 border-ink bg-grout" />

      {/* Lifebuoy perched at top-right corner */}
      <svg
        width="58"
        height="58"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 -right-4 rotate-12 sm:-right-6"
      >
        <circle cx="32" cy="32" r="24" fill="var(--tile)" stroke="var(--ink)" strokeWidth="3.2" />
        <path d="M22 10 L26 22 M42 10 L38 22 M54 22 L42 26 M54 42 L42 38 M42 54 L38 42 M22 54 L26 42 M10 42 L22 38 M10 22 L22 26" stroke="var(--coral)" strokeWidth="7" strokeLinecap="round" />
        <circle cx="32" cy="32" r="24" stroke="var(--ink)" strokeWidth="3.2" />
        <circle cx="32" cy="32" r="11" fill="var(--pool-deck)" stroke="var(--ink)" strokeWidth="3.2" />
      </svg>

      <div className="mb-5 flex flex-wrap items-center gap-3 border-b-2 border-dashed border-grout pb-4 pr-10">
        {badge ? <DepthMarker>{badge}</DepthMarker> : null}
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/** Poolside whiteboard frame with marker tray and magnetic cap tokens. */
export function LaneBoard({
  title,
  subtitle,
  headerAction,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl border-[3.5px] border-ink bg-tile shadow-[0_8px_0_var(--grout)] ${className}`}>
      {/* Whiteboard top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-[0.8rem] border-b-[2.5px] border-ink bg-water-soft px-5 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[var(--cap-coral)]" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[var(--cap-sun)]" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-[var(--cap-aqua)]" />
          </span>
          <div>
            <h2 className="font-display text-xl font-extrabold text-ink sm:text-2xl">{title}</h2>
            {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
          </div>
        </div>
        {headerAction}
      </div>

      <div className="p-4 sm:p-6">{children}</div>

      {/* Whiteboard marker tray at the bottom */}
      <div
        aria-hidden="true"
        className="flex items-center justify-end gap-3 rounded-b-[0.8rem] border-t-[2.5px] border-ink bg-deck px-6 py-2"
      >
        <span className="h-2.5 w-14 rounded-full border-2 border-ink bg-[var(--cap-coral)]" />
        <span className="h-2.5 w-14 rounded-full border-2 border-ink bg-primary" />
        <span className="h-3.5 w-10 rounded-sm border-2 border-ink bg-sun" />
      </div>
    </div>
  );
}

/** Hanging whistle lanyard tag for instructor cards. */
export function WhistleLanyard({
  strapHeight = 44,
  accentColor = 'var(--coral)',
  children,
}: {
  strapHeight?: number;
  accentColor?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Lanyard strap hanging from the pool rail */}
      <div aria-hidden="true" className="flex flex-col items-center">
        <div
          className="w-3 border-x-2 border-ink"
          style={{ height: `${strapHeight}px`, backgroundColor: accentColor }}
        />
        {/* Metal clip */}
        <div className="h-4 w-6 rounded-t-md border-2 border-ink bg-grout" />
      </div>
      {/* Laminated deck badge */}
      <article className="tile-card relative w-full border-[2.5px] border-ink p-5">
        <span
          aria-hidden="true"
          className="mx-auto mb-3 block h-2 w-10 rounded-full border-2 border-ink bg-deck"
        />
        {children}
      </article>
    </div>
  );
}

/** Rising bubble motif for section corners. */
export function BubbleTrail({ className = '' }: { className?: string }) {
  return (
    <svg
      width="68"
      height="110"
      viewBox="0 0 68 110"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="24" cy="90" r="11" fill="var(--water-soft)" stroke="var(--ink)" strokeWidth="2.4" />
      <path d="M19 86 Q22 83 26 84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="46" cy="60" r="14" fill="var(--water-soft)" stroke="var(--ink)" strokeWidth="2.4" />
      <path d="M40 55 Q44 51 49 52" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="22" cy="34" r="8" fill="var(--water-soft)" stroke="var(--ink)" strokeWidth="2.4" />
      <circle cx="42" cy="14" r="6" fill="var(--water)" stroke="var(--ink)" strokeWidth="2.2" />
    </svg>
  );
}

/**
 * Hero illustration: sunlit / night-swim three-quarter view of the tiled teaching pond with
 * coping, "0.9 M" depth marker, steel ladder, lane rope, Pip the otter floating on its back
 * hugging a yellow kickboard, and three smiling swimmers blowing bubbles.
 * Switches seamlessly between light and dark theme artwork for both prefers-color-scheme and
 * explicit theme toggles.
 */
export function PondHero({ className = '' }: { className?: string }) {
  const alt =
    'Illustrated three-quarter view of the warm 0.9 metre teaching pond with Pip the otter floating on a yellow kickboard, a colourful lane rope, a stainless-steel pool ladder, and three smiling children in colourful swim caps blowing bubbles.';

  return (
    <div
      className={`overflow-hidden rounded-2xl border-[3px] border-ink bg-deck ${className}`}
    >
      <img
        src={asset('/hero-light.jpg')}
        alt={alt}
        width={1200}
        height={896}
        decoding="async"
        fetchPriority="high"
        className="hero-image-light h-auto w-full"
      />
      <img
        src={asset('/hero-dark.jpg')}
        alt={alt}
        width={1200}
        height={896}
        decoding="async"
        fetchPriority="high"
        className="hero-image-dark h-auto w-full"
      />
    </div>
  );
}

/** Pip floating on a yellow kickboard — compact motif for closing CTA and Float, flip, follow. */
export function PipOnKickboard({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 150"
      fill="none"
      role="img"
      aria-label="Pip the otter floating calmly on its back on a yellow kickboard."
      className={`block h-auto w-full ${className}`}
    >
      <ellipse cx="140" cy="116" rx="116" ry="22" fill="var(--water)" opacity="0.28" />
      <path d="M24 102 C8 100 10 86 24 84 C40 82 54 90 64 96 Z" fill="var(--otter)" stroke="var(--ink)" strokeWidth="3" />
      <ellipse cx="132" cy="96" rx="70" ry="28" fill="var(--otter)" stroke="var(--ink)" strokeWidth="3" />
      <ellipse cx="130" cy="94" rx="48" ry="18" fill="#EBD3BE" />
      <rect x="94" y="60" width="68" height="50" rx="16" fill="var(--sun)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M108 72 H148" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.8" />
      <ellipse cx="102" cy="88" rx="11" ry="8" fill="var(--otter)" stroke="var(--ink)" strokeWidth="2.8" />
      <ellipse cx="156" cy="90" rx="11" ry="8" fill="var(--otter)" stroke="var(--ink)" strokeWidth="2.8" />
      {/* Pip's head */}
      <g transform="translate(178, 48)">
        <circle cx="10" cy="14" r="7" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="2.8" />
        <circle cx="52" cy="14" r="7" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="2.8" />
        <ellipse cx="31" cy="32" rx="26" ry="23" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="3" />
        <ellipse cx="33" cy="38" rx="15" ry="11" fill="#EBD3BE" />
        <circle cx="23" cy="28" r="2.5" fill="var(--art-ink)" />
        <circle cx="41" cy="28" r="2.5" fill="var(--art-ink)" />
        <ellipse cx="33" cy="36" rx="4.5" ry="3" fill="var(--art-ink)" />
        <path d="M28 42 Q33 46 38 42" stroke="var(--art-ink)" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <circle cx="250" cy="64" r="6" fill="var(--water-soft)" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx="262" cy="48" r="4" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

/** Small Pip diving into the deep end for the footer. */
export function PipDiving({ className = '' }: { className?: string }) {
  return (
    <svg
      width="96"
      height="68"
      viewBox="0 0 96 68"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M8 52 Q26 44 44 52 T88 52" stroke="var(--water)" strokeWidth="3" strokeLinecap="round" />
      {/* Otter arching in dive */}
      <path
        d="M22 44 C28 20 56 14 70 36 C64 42 54 38 46 34 C38 30 30 36 22 44 Z"
        fill="var(--otter)"
        stroke="var(--deep-ink)"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="67" cy="34" r="8" fill="var(--otter)" stroke="var(--deep-ink)" strokeWidth="2.4" />
      <circle cx="70" cy="32" r="1.6" fill="var(--deep-ink)" />
      {/* Bubbles */}
      <circle cx="80" cy="22" r="3.5" fill="var(--water)" />
      <circle cx="86" cy="13" r="2.2" fill="var(--sun)" />
    </svg>
  );
}

/** Three-panel water-safety diagram: Reach with a noodle, Throw a ring, Don't go in. */
export function ReachThrow({ className = '' }: { className?: string }) {
  return (
    <div className={`grid gap-5 md:grid-cols-3 ${className}`}>
      {/* Panel 1: Reach */}
      <figure className="tile-card flex flex-col overflow-hidden border-[2.5px] border-ink">
        <svg viewBox="0 0 280 170" fill="none" role="img" aria-label="Lie flat on the deck and reach out with a pool noodle." className="w-full bg-water-soft">
          {/* Deck */}
          <rect x="0" y="96" width="128" height="74" fill="var(--tile)" stroke="var(--ink)" strokeWidth="3" />
          {/* Water */}
          <rect x="128" y="108" width="152" height="62" fill="var(--water)" stroke="var(--ink)" strokeWidth="3" />
          {/* Helper lying low on deck */}
          <circle cx="102" cy="80" r="12" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.8" />
          <path d="M36 92 H96" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
          {/* Pool noodle reaching across */}
          <path d="M108 90 L214 106" stroke="var(--coral)" strokeWidth="9" strokeLinecap="round" />
          <path d="M108 90 L214 106" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
          {/* Swimmer grabbing noodle */}
          <circle cx="228" cy="108" r="13" fill="var(--cap-aqua)" stroke="var(--ink)" strokeWidth="2.8" />
          <path d="M150 132 Q180 124 210 132 T270 132" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </svg>
        <figcaption className="p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <DepthMarker>1</DepthMarker>
            <strong className="font-display text-lg font-extrabold text-ink">Reach</strong>
          </div>
          <p className="text-sm text-muted">Lie flat on the edge so you can’t be pulled in, and hold out a noodle, pole or towel.</p>
        </figcaption>
      </figure>

      {/* Panel 2: Throw */}
      <figure className="tile-card flex flex-col overflow-hidden border-[2.5px] border-ink">
        <svg viewBox="0 0 280 170" fill="none" role="img" aria-label="Throw a floating lifebuoy ring or kickboard from the shore." className="w-full bg-water-soft">
          <rect x="0" y="96" width="102" height="74" fill="var(--tile)" stroke="var(--ink)" strokeWidth="3" />
          <rect x="102" y="108" width="178" height="62" fill="var(--water)" stroke="var(--ink)" strokeWidth="3" />
          {/* Helper standing back */}
          <circle cx="52" cy="56" r="12" fill="var(--sun)" stroke="var(--ink)" strokeWidth="2.8" />
          <path d="M52 68 V96 M52 76 L80 66" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
          {/* Throw arc */}
          <path d="M88 64 Q146 28 194 86" stroke="var(--ink)" strokeWidth="2.6" strokeDasharray="6 5" fill="none" />
          {/* Lifebuoy flying */}
          <circle cx="192" cy="92" r="16" fill="var(--tile)" stroke="var(--coral)" strokeWidth="6" />
          <circle cx="192" cy="92" r="18" stroke="var(--ink)" strokeWidth="2.4" />
          <circle cx="192" cy="92" r="9" stroke="var(--ink)" strokeWidth="2.4" />
          {/* Swimmer */}
          <circle cx="242" cy="112" r="12" fill="var(--cap-lime)" stroke="var(--ink)" strokeWidth="2.8" />
        </svg>
        <figcaption className="p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <DepthMarker>2</DepthMarker>
            <strong className="font-display text-lg font-extrabold text-ink">Throw</strong>
          </div>
          <p className="text-sm text-muted">Toss something that floats — a lifebuoy, kickboard or sealed jug — and shout for a grown-up.</p>
        </figcaption>
      </figure>

      {/* Panel 3: Don't go */}
      <figure className="tile-card flex flex-col overflow-hidden border-[2.5px] border-ink">
        <svg viewBox="0 0 280 170" fill="none" role="img" aria-label="Do not jump in yourself; call a lifeguard or adult for help." className="w-full bg-water-soft">
          <rect x="0" y="96" width="120" height="74" fill="var(--tile)" stroke="var(--ink)" strokeWidth="3" />
          <rect x="120" y="108" width="160" height="62" fill="var(--water)" stroke="var(--ink)" strokeWidth="3" />
          {/* Crossed-out jump warning sign */}
          <circle cx="140" cy="84" r="46" fill="var(--tile)" stroke="var(--coral)" strokeWidth="7" />
          <circle cx="140" cy="64" r="9" fill="var(--ink)" />
          <path d="M126 84 L142 78 L158 92 M140 78 L134 102" stroke="var(--ink)" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="108" y1="52" x2="172" y2="116" stroke="var(--coral)" strokeWidth="7" strokeLinecap="round" />
          <circle cx="140" cy="84" r="49" stroke="var(--ink)" strokeWidth="2.4" />
        </svg>
        <figcaption className="p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <DepthMarker>3</DepthMarker>
            <strong className="font-display text-lg font-extrabold text-ink">Don’t go in</strong>
          </div>
          <p className="text-sm text-muted">Never jump in after someone in trouble. Stay on dry ground and call a lifeguard or 911.</p>
        </figcaption>
      </figure>
    </div>
  );
}

/** Simple illustrated Green Lake east beach location vignette. */
export function EastBeachVignette({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 210"
      fill="none"
      role="img"
      aria-label="Map vignette showing Otter Pond Swim School just across the park path from Green Lake Park's east beach."
      className={`block h-auto w-full rounded-xl border-[2.5px] border-ink bg-deck ${className}`}
    >
      {/* Green Lake water on left */}
      <path d="M0 0 H158 C176 48 164 114 146 154 C138 174 142 194 152 210 H0 Z" fill="var(--water)" />
      <path d="M22 52 Q52 44 82 52 T138 52 M18 118 Q48 110 78 118 T126 118" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
      <text x="20" y="90" fill="var(--ink)" fontFamily="var(--font-display)" fontWeight="800" fontSize="15">
        Green Lake
      </text>
      <text x="20" y="108" fill="var(--ink)" fontFamily="var(--font-sans)" fontWeight="600" fontSize="11">
        East beach
      </text>

      {/* Park walking path */}
      <path d="M182 0 C198 56 186 122 172 210" stroke="var(--sun)" strokeWidth="20" strokeLinecap="round" />
      <path d="M182 0 C198 56 186 122 172 210" stroke="var(--ink)" strokeWidth="2.5" strokeDasharray="7 7" />

      {/* Park trees */}
      {[
        { x: 224, y: 42 },
        { x: 248, y: 162 },
        { x: 378, y: 158 },
      ].map((t, i) => (
        <g key={i} transform={`translate(${t.x}, ${t.y})`}>
          <circle cx="0" cy="0" r="17" fill="var(--cap-lime)" stroke="var(--ink)" strokeWidth="2.6" />
          <circle cx="-6" cy="-5" r="5" fill="#FFFFFF" opacity="0.35" />
        </g>
      ))}

      {/* Otter Pond Swim School tiled roof */}
      <g transform="translate(248, 56)">
        <rect x="0" y="0" width="128" height="74" rx="12" fill="var(--tile)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="10" y="10" width="108" height="54" rx="6" fill="var(--water-soft)" stroke="var(--grout)" strokeWidth="2" />
        <line x1="12" y1="37" x2="116" y2="37" stroke="var(--coral)" strokeWidth="3.5" strokeDasharray="8 6" />
        <text x="64" y="31" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-display)" fontWeight="800" fontSize="13">
          OTTER POND
        </text>
        <text x="64" y="53" textAnchor="middle" fill="var(--ink-muted)" fontFamily="var(--font-sans)" fontWeight="700" fontSize="10">
          SWIM SCHOOL
        </text>
      </g>
      {/* Pointer arrow from path to door */}
      <path d="M200 94 H240" stroke="var(--coral)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M232 87 L241 94 L232 101" stroke="var(--coral)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 404 illustration: empty lane with lane ropes, Pip surfacing holding lost goggles. */
export function LostGoggles404({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 260"
      fill="none"
      role="img"
      aria-label="An empty swimming lane with Pip the otter surfacing in the middle holding a pair of lost goggles."
      className={`block h-auto w-full rounded-2xl border-[3px] border-ink bg-[var(--pool-basin)] ${className}`}
    >
      {/* Top & bottom lane ropes */}
      <line x1="0" y1="36" x2="520" y2="36" stroke="var(--art-ink)" strokeWidth="3" />
      <line x1="0" y1="224" x2="520" y2="224" stroke="var(--art-ink)" strokeWidth="3" />
      {Array.from({ length: 13 }).map((_, i) => {
        const x = 20 + i * 40;
        const fill = i % 3 === 0 ? 'var(--coral)' : i % 3 === 1 ? 'var(--tile)' : 'var(--sun)';
        return (
          <g key={i}>
            <rect x={x - 14} y="29" width="28" height="14" rx="7" fill={fill} stroke="var(--art-ink)" strokeWidth="2.4" />
            <rect x={x - 14} y="217" width="28" height="14" rx="7" fill={fill} stroke="var(--art-ink)" strokeWidth="2.4" />
          </g>
        );
      })}

      {/* Lane bottom T-mark */}
      <path d="M70 130 H450 M450 96 V164" stroke="var(--deep)" strokeWidth="10" strokeLinecap="round" opacity="0.35" />

      {/* Ripples around Pip */}
      <ellipse cx="260" cy="158" rx="92" ry="26" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="12 8" opacity="0.7" />

      {/* Pip surfacing */}
      <g transform="translate(212, 86)">
        <circle cx="18" cy="24" r="9" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="3" />
        <circle cx="78" cy="24" r="9" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="3" />
        <ellipse cx="48" cy="48" rx="34" ry="30" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="3.2" />
        <ellipse cx="48" cy="56" rx="20" ry="14" fill="#EBD3BE" />
        <circle cx="36" cy="42" r="3" fill="var(--art-ink)" />
        <circle cx="60" cy="42" r="3" fill="var(--art-ink)" />
        <ellipse cx="48" cy="52" rx="5.5" ry="3.8" fill="var(--art-ink)" />
        <path d="M43 60 Q48 64 53 60" stroke="var(--art-ink)" strokeWidth="2.4" strokeLinecap="round" />

        {/* Paw holding lost goggles up */}
        <ellipse cx="90" cy="54" rx="12" ry="9" fill="var(--otter)" stroke="var(--art-ink)" strokeWidth="2.8" />
        <g transform="translate(82, 16) rotate(12)">
          <rect x="0" y="8" width="22" height="14" rx="6" fill="var(--sun)" stroke="var(--art-ink)" strokeWidth="2.8" />
          <rect x="28" y="8" width="22" height="14" rx="6" fill="var(--sun)" stroke="var(--art-ink)" strokeWidth="2.8" />
          <line x1="22" y1="15" x2="28" y2="15" stroke="var(--art-ink)" strokeWidth="2.8" />
          <path d="M6 12 H14 M34 12 H42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* Rising bubbles */}
      <circle cx="192" cy="108" r="8" fill="var(--water-soft)" stroke="var(--art-ink)" strokeWidth="2.4" />
      <circle cx="176" cy="84" r="5.5" fill="#FFFFFF" stroke="var(--art-ink)" strokeWidth="2.2" />
      <circle cx="348" cy="96" r="6" fill="var(--water-soft)" stroke="var(--art-ink)" strokeWidth="2.2" />
    </svg>
  );
}
