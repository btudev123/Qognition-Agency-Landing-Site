'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Layout from '../components/Layout';
import { ParamProvider } from '../lib/routerCompat';

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ParamProvider>
    <ScrollToTop />
    <Layout>{children}</Layout>
  </ParamProvider>
);

export default ClientLayout;
