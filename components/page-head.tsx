import type { ReactNode } from 'react';
import { BubbleTrail, DepthMarker, LaneRope } from './pool-art';
import { PoolIcon, type PoolIconName } from './pool-icons';

/** Tiled pool-wall page head with painted depth marker badge, icon, title, intro and lane rope. */
export function PageHead({
  marker,
  icon,
  title,
  children,
  id,
  extra,
}: {
  marker: string;
  icon?: PoolIconName;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  extra?: ReactNode;
}) {
  return (
    <header className="tile-wall relative overflow-hidden border-b-2 border-grout">
      <BubbleTrail className="absolute -right-2 top-3 hidden opacity-70 sm:block" />
      <div className="wrap relative pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <DepthMarker size="md">
            {icon ? <PoolIcon name={icon} size={18} /> : null}
            <span>{marker}</span>
          </DepthMarker>
        </div>
        <h1
          id={id}
          className="mt-4 max-w-[20ch] font-display text-[clamp(2.35rem,5.5vw,4rem)] font-extrabold text-ink"
        >
          {title}
        </h1>
        {children ? (
          <div className="mt-4 max-w-(--measure) text-[clamp(1.02rem,1.5vw,1.18rem)] leading-relaxed text-muted">
            {children}
          </div>
        ) : null}
        {extra ? <div className="mt-6">{extra}</div> : null}
      </div>
      <LaneRope compact />
    </header>
  );
}
