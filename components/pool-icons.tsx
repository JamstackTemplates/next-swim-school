import type { SVGProps } from 'react';

export type PoolIconName =
  | 'kickboard'
  | 'goggles'
  | 'whistle'
  | 'clock'
  | 'noodle'
  | 'lifebuoy'
  | 'towel'
  | 'calendar'
  | 'ladder'
  | 'lifejacket'
  | 'gate'
  | 'bathtub'
  | 'lake'
  | 'cone'
  | 'heart';

type Props = SVGProps<SVGSVGElement> & {
  name: PoolIconName;
  size?: number;
};

/** 24px poolside icons sharing the 2.2px rounded ink stroke and flat token fills. */
export function PoolIcon({ name, size = 24, className, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {name === 'kickboard' && (
        <>
          <path d="M6 19V9a6 6 0 0 1 12 0v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z" fill="var(--sun)" />
          <path d="M9.5 14.5h5" />
          <path d="M9.5 10.5a2.5 2.5 0 0 1 5 0" />
        </>
      )}
      {name === 'goggles' && (
        <>
          <rect x="2.5" y="8.5" width="8" height="7" rx="3.2" fill="var(--water)" />
          <rect x="13.5" y="8.5" width="8" height="7" rx="3.2" fill="var(--water)" />
          <path d="M10.5 12h3" />
          <path d="M5 10.8h2" stroke="#FFFFFF" strokeWidth={1.6} />
          <path d="M16 10.8h2" stroke="#FFFFFF" strokeWidth={1.6} />
        </>
      )}
      {name === 'whistle' && (
        <>
          <path d="M4 11h10a5 5 0 1 1-4.5 7.2L6.5 15H4a1.5 1.5 0 0 1 0-3Z" fill="var(--coral)" />
          <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
          <path d="M13 7V5M16.5 8l1.5-1.5" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="9" fill="var(--tile)" />
          <path d="M12 7v5l3.5 2" />
        </>
      )}
      {name === 'noodle' && (
        <>
          <path d="M5 19C6 10 10 5 17 5" stroke="var(--coral)" strokeWidth={5.5} />
          <path d="M5 19C6 10 10 5 17 5" stroke="currentColor" strokeWidth={1.8} />
          <circle cx="17.5" cy="5" r="2.2" fill="var(--sun)" />
        </>
      )}
      {name === 'lifebuoy' && (
        <>
          <circle cx="12" cy="12" r="9" fill="var(--tile)" />
          <circle cx="12" cy="12" r="4" fill="var(--water-soft)" />
          <path d="M9.2 3.5l1.3 4.7M14.8 3.5l-1.3 4.7M20.5 9.2l-4.7 1.3M20.5 14.8l-4.7-1.3M14.8 20.5l-1.3-4.7M9.2 20.5l1.3-4.7M3.5 14.8l4.7-1.3M3.5 9.2l4.7 1.3" stroke="var(--coral)" strokeWidth={2.4} />
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="4" />
        </>
      )}
      {name === 'towel' && (
        <>
          <path d="M4 5h16" />
          <rect x="6" y="5" width="12" height="15" rx="1.5" fill="var(--water-soft)" />
          <path d="M6 15h12M6 17.5h12" stroke="var(--coral)" />
        </>
      )}
      {name === 'calendar' && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2.5" fill="var(--tile)" />
          <path d="M3 10h18M8 3v4M16 3v4" />
          <rect x="7" y="13" width="3" height="3" rx="0.5" fill="var(--sun)" stroke="none" />
          <rect x="14" y="13" width="3" height="3" rx="0.5" fill="var(--coral)" stroke="none" />
        </>
      )}
      {name === 'ladder' && (
        <>
          <path d="M7 20V7a3 3 0 0 1 3-3h0" />
          <path d="M17 20V7a3 3 0 0 0-3-3h0" />
          <path d="M7 10h10M7 14h10M7 18h10" />
        </>
      )}
      {name === 'lifejacket' && (
        <>
          <path d="M7 4h3l2 4 2-4h3l3 4-2 12H6L4 8l3-4Z" fill="var(--coral)" />
          <path d="M12 8v12M7 13h10M7 16.5h10" />
        </>
      )}
      {name === 'gate' && (
        <>
          <path d="M3 6v14M21 6v14M3 9h18M3 17h18M7.5 9v8M12 9v8M16.5 9v8" />
          <circle cx="19" cy="12" r="1.5" fill="var(--sun)" />
        </>
      )}
      {name === 'bathtub' && (
        <>
          <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z" fill="var(--water-soft)" />
          <path d="M6 12V7a2 2 0 0 1 4 0" />
          <path d="M7 19l-1 2M17 19l1 2" />
        </>
      )}
      {name === 'lake' && (
        <>
          <path d="M2 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
          <path d="M4 11l4.5-6 4 4.5 3-3.5L20 11" fill="var(--water-soft)" />
        </>
      )}
      {name === 'cone' && (
        <>
          <path d="M12 3l6 15H6L12 3Z" fill="var(--coral)" />
          <path d="M8.8 11h6.4M7.4 14.5h9.2" stroke="#FFFFFF" strokeWidth={2} />
          <path d="M4 18h16" />
        </>
      )}
      {name === 'heart' && (
        <path
          d="M12 20s-7.5-4.7-7.5-10a4.4 4.4 0 0 1 7.5-3.1A4.4 4.4 0 0 1 19.5 10c0 5.3-7.5 10-7.5 10Z"
          fill="var(--coral)"
        />
      )}
    </svg>
  );
}
