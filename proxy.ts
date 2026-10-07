import { NextRequest, NextResponse } from 'next/server';
import { isPreviewDeployment } from './lib/deploymentMode';

const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</docs/api>; rel="service-doc"',
  '</api/health>; rel="status"',
  '</llms.txt>; rel="alternate"; type="text/plain"'
].join(', ');

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const localeCandidate = pathname.split('/')[1];
  const locale = ['de', 'fr', 'nl', 'sv', 'da', 'nb', 'fi', 'ar', 'it', 'zh-Hans'].includes(localeCandidate) ? localeCandidate : 'en';
  const requestHeaders = new Headers(request.headers);
  // Overwrite any user-supplied value so the document language follows the URL.
  requestHeaders.set('x-qognition-locale', locale);
  const isStatic = pathname.startsWith('/_next') || pathname.startsWith('/assets') || PUBLIC_FILE.test(pathname);
  const isApi = pathname.startsWith('/api/');
  const isMarkdownRoute = pathname.startsWith('/agent-markdown');

  if (request.method === 'GET' && !isStatic && !isApi && !isMarkdownRoute && request.headers.get('accept')?.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = '/agent-markdown';
    url.search = `?path=${encodeURIComponent(pathname + search)}`;
    const rewritten = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    if (isPreviewDeployment()) rewritten.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return rewritten;
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (isPreviewDeployment()) response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  if (!isStatic && !isApi && !isMarkdownRoute) {
    response.headers.set('Link', AGENT_LINK_HEADER);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.png|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|manifest.json).*)']
};
