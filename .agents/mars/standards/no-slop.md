# no-slop — UI

Read every run before writing frontend code. Applies to any product surface. These are bans, not preferences.

The products this applies to are dense, data-heavy admin tools used by professionals for eight hours a day — regulated industries, real work. The visual reference is **Linear, Stripe Dashboard, Retool**. Not a landing page. Not a marketing site.

## Banned outright

- **Purple-to-pink or blue-to-violet gradients.** Any decorative gradient, in fact.
- **Centered hero with three icon cards.** The default AI layout. Never.
- **Emoji in UI copy or headings.** Not in buttons, labels, empty states, headers, or toasts.
- **`rounded-2xl` and `shadow-lg` applied by default to everything.** Radius and elevation carry meaning; spraying them removes it.
- **Untouched shadcn defaults presented as design.** Installing a component library is not designing.
- **Icons inside coloured circles as decoration.** If the icon is not doing work, delete it.
- **Glassmorphism.** Backdrop blur as decoration.
- **"Powered by AI" badges.** Or any badge announcing the implementation to the user.
- **Vague button labels** where a specific verb belongs. "Get Started", "Learn More", "Submit", "Continue" when the action is "Create case", "Export CSV", "Approve and file".
- **Animation that does not communicate state.** Motion tells the user something changed, something is loading, or where something went. Everything else is noise.

## Required

- **Tokens before components.** Every spacing, size, radius and colour comes from the scale. No arbitrary values. If the project has a token file, read it first. If it does not, ask which scale to use rather than inventing one.
- **All five states, every component:** empty, loading, error, populated, and **overflowing** — a table that holds zero rows and one that holds fifty thousand. The overflow state is the one that gets skipped and the one that breaks in production.
- **Real copy or `[COPY NEEDED]`.** Never lorem ipsum, never "Item 1 / Item 2 / Item 3", never invented sample names that look like real records.
- **Dark mode designed, not bolted on.** Check every surface. A token defined only inside a media query is a bug.
- **Keyboard and screen reader are part of done**, not a follow-up ticket. Regulated buyers procure against accessibility; it is a sales blocker, not a nice-to-have.
- **Density over whitespace.** These users live in the tool. Generous padding that looks good in a screenshot costs them scrolling all day.
