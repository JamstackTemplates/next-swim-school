import { dayPeriods, formatClock12, type OpeningHours } from '../lib/hours';

/** Semantic table of pool desk hours, including Wednesday split periods and Sunday note. */
export function DeskHoursTable({ hours }: { hours: readonly OpeningHours[] }) {
  return (
    <table className="w-full border-collapse text-left text-sm sm:text-base tabular-nums">
      <caption className="sr-only">Pool front desk hours in Seattle (Pacific time)</caption>
      <tbody>
        {hours.map(entry => {
          const periods = dayPeriods(entry)
            .map(p => `${formatClock12(p.opens)}–${formatClock12(p.closes)}`)
            .join(' & ');
          return (
            <tr key={entry.day} className="border-b border-grout/80 last:border-b-0">
              <th scope="row" className="py-2.5 pr-4 font-display font-bold text-ink">
                {entry.day}
              </th>
              <td className="py-2.5 text-right text-ink">
                <span>{periods}</span>
                {entry.note ? (
                  <span className="mt-0.5 block text-xs font-medium text-muted">{entry.note}</span>
                ) : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
