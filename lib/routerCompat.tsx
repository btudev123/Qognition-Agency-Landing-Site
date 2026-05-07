'use client';

import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext } from 'react';

type Params = Record<string, string | undefined>;

const ParamsContext = createContext<Params>({});

export const ParamProvider: React.FC<{ params?: Params; children: React.ReactNode }> = ({ params = {}, children }) => (
  <ParamsContext.Provider value={params}>{children}</ParamsContext.Provider>
);

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to?: string;
  href?: string;
  prefetch?: boolean;
  children: React.ReactNode;
};

export const Link: React.FC<LinkProps> = ({ to, href, children, ...props }) => {
  const target = href || to || '/';

  if (target.startsWith('http') || target.startsWith('mailto:') || target.startsWith('tel:')) {
    return (
      <a href={target} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
};

export const useParams = <T extends Params = Params>(): T => useContext(ParamsContext) as T;

export const useNavigate = () => {
  const router = useRouter();
  return (to: string | number) => {
    if (typeof to === 'number') {
      window.history.go(to);
      return;
    }
    router.push(to);
  };
};

export const useLocation = () => {
  const pathname = usePathname() || '/';
  return { pathname };
};

export const BrowserRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Route: React.FC = () => null;
