import Link from 'next/link';
import Heading from '../ui/Heading';
import Text from '../ui/Text';

export type EmptyStateAction =
  | { label: string; href: string; onClick?: never }
  | { label: string; onClick: () => void; href?: never };

interface EmptyStateProps {
  title: string;
  message: string;
  action?: EmptyStateAction;
}

/** The real empty state: names what happened and gives one concrete next step. */
export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-12 text-center sm:px-12">
      <Heading level="h3" className="mb-2">
        {title}
      </Heading>
      <Text className="max-w-md mx-auto">{message}</Text>
      {action &&
        (action.href ? (
          <Link
            href={action.href}
            className="inline-flex mt-6 text-body font-medium text-[var(--accent)] underline underline-offset-2 hover:brightness-110"
          >
            {action.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex mt-6 text-body font-medium text-[var(--accent)] underline underline-offset-2 hover:brightness-110"
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
