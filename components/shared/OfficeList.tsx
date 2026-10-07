import { OFFICES } from '../../data/siteConfig';

/* The five offices, city and country, in OFFICES order (operator, 2026-10-08).
   No headquarters and no street addresses, so nothing here may mark one office
   as the main one. Callers pass the grid columns; the list itself only owns the
   markup, so /about, /contact and /team cannot drift apart in wording or order.
   Long or added city names wrap inside their cell instead of widening the grid.
   No empty state: OFFICES is a fixed, non-empty tuple, so the type rules it out. */
export default function OfficeList({ className = '', labelledBy }: { className?: string; labelledBy?: string }) {
  return (
    <ul aria-labelledby={labelledBy} className={`m-0 p-0 list-none grid gap-x-6 gap-y-2 ${className}`}>
      {OFFICES.map((office) => (
        <li key={`${office.city}-${office.countryCode}`} className="min-w-0 break-words text-body">
          <span className="text-[var(--text)]">{office.city}</span>
          <span className="text-[var(--text-muted)]">, {office.country}</span>
        </li>
      ))}
    </ul>
  );
}
