import CaseStudyCard from './CaseStudyCard';
import EmptyState, { type EmptyStateAction } from './EmptyState';
import type { ResolvedCaseStudy } from '../../data/case-studies';

interface StudyGridProps {
  studies: ResolvedCaseStudy[];
  emptyTitle?: string;
  emptyMessage?: string;
  emptyAction?: EmptyStateAction;
}

/** Renders the grid, or a real empty state when a filter or a thin hub yields nothing. */
export default function StudyGrid({
  studies,
  emptyTitle = 'No case studies match yet',
  emptyMessage = 'Check back soon, or browse the full library for a comparable engagement.',
  emptyAction = { label: 'View all case studies', href: '/case-studies' },
}: StudyGridProps) {
  if (studies.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} action={emptyAction} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {studies.map((study) => (
        <CaseStudyCard key={study.id} study={study} />
      ))}
    </div>
  );
}
