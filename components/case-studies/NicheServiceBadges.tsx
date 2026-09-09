import Badge from '../ui/Badge';
import { nicheLabel, serviceLabel } from '../../data/case-studies';
import type { Niche, ServiceKey } from '../../data/case-studies';

export default function NicheServiceBadges({
  niche,
  services,
}: {
  niche: Niche;
  services: readonly ServiceKey[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="accent">{nicheLabel(niche)}</Badge>
      {services.map((s) => (
        <Badge key={s} variant="muted">
          {serviceLabel(s)}
        </Badge>
      ))}
    </div>
  );
}
