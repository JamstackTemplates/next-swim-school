/** The two pools at Otter Pond Swim School. Referenced by levels, timetable classes and make-up swims. */
export type PoolId = 'teaching-pond' | 'lap-pool';

export interface Pool {
  /** Stable URL-safe ID referenced by levels and classes. */
  id: PoolId;
  /** Display name shown on the timetable key and level lanes. */
  name: string;
  /** Painted depth marker text (e.g. "0.9 M"). */
  depth: string;
  /** Water temperature in degrees Fahrenheit. */
  temperatureF: number;
  /** Plain description of who swims here. */
  description: string;
}

export const pools: readonly Pool[] = [
  {
    id: 'teaching-pond',
    name: 'Teaching pond',
    depth: '0.9 M',
    temperatureF: 90,
    description: 'Warm, shallow, stand-up everywhere',
  },
  {
    id: 'lap-pool',
    name: 'Lap pool',
    depth: '1.1–2.0 M',
    temperatureF: 84,
    description: 'Four 25 m lanes, deep end for diving',
  },
];

export const poolById: Record<PoolId, Pool> = Object.fromEntries(
  pools.map(pool => [pool.id, pool]),
) as Record<PoolId, Pool>;
