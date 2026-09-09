import { permanentRedirect } from 'next/navigation';

/**
 * The 25 fabricated case studies that lived under /work were deleted, so their ids no longer
 * resolve. Redirecting to the id would 308 straight into a 404 — send the whole tree to the
 * library index instead, which is a real destination for anyone arriving on an old link.
 */
export default function Page() {
  permanentRedirect('/case-studies');
}
