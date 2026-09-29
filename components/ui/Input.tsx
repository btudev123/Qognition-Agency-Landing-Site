import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/* Four fixes, all of them accessibility rather than styling.
 *
 * 1. `focus:outline-none` is gone. It suppressed the site-wide focus ring and
 *    put a 20%-alpha teal ring in its place, which is nowhere near the 3:1 that
 *    SC 1.4.11 asks of a focus indicator. The global ring — --accent-deep on
 *    light, white on dark — now applies here like everywhere else.
 * 2. The error state was a 50%-alpha red border plus red text, so the only
 *    programmatic signal was colour. `aria-invalid` states it, and
 *    `aria-describedby` ties the message to the field so a screen reader reads
 *    it on focus instead of stranding it after the input in the tab order.
 * 3. The border goes to --border-strong on error, not a translucent red. A
 *    50%-alpha red on a white field is under 3:1 as a non-text boundary, and
 *    the message carries the meaning anyway.
 * 4. min-h-11 is 44px. It was roughly 40px, which is under the target floor on
 *    the forms that are the site's only conversion surface.
 *
 * Requires `error` and `label` to be paired with an id — inputId falls back to
 * `name`, and a field with neither gets no label association, which is why the
 * label only renders when it can point at something.
 */
export default function Input({ error, label, className = '', id, ...props }: InputProps) {
  const inputId = id || props.name;
  const errorId = inputId ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && inputId && (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--text)]">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
        className={`w-full min-h-11 px-3 py-2.5 border bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-faint)] text-sm transition-colors ${
          error ? 'border-[var(--border-strong)]' : 'border-[var(--border)]'
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-meta text-[var(--error-text)]">
          {error}
        </p>
      )}
    </div>
  );
}
