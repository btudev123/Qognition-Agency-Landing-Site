import { NextRequest, NextResponse } from 'next/server';

const AGENT_LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</docs/api>; rel="service-doc"',
  '</api/health>; rel="status"',
  '</llm.txt>; rel="alternate"; type="text/plain"'
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
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!isStatic && !isApi && !isMarkdownRoute) {
    response.headers.set('Link', AGENT_LINK_HEADER);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.png|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|manifest.json).*)']
};
