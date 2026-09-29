'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAttribution } from '../../lib/analytics';
import { CONSENT_EVENT } from '../../lib/consent';

export default function AcquisitionTracker() {
  const pathname = usePathname();
  useEffect(() => {
    getAttribution();
    const update = () => { getAttribution(); };
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, [pathname]);
  return null;
}
