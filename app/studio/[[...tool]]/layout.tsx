// The studio renders its own full-viewport shell, so it must not inherit the
// marketing site's nav, footer, cursor, or smooth-scroll wrapper.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
