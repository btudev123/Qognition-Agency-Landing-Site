import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const clientId = process.env.PH_API_KEY || process.env.PRODUCT_HUNT_CLIENT_ID;
  const clientSecret = process.env.PH_API_SECRET || process.env.PRODUCT_HUNT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Product Hunt credentials are not configured' }, { status: 503 });
  }

  try {
    const payload = await request.json();
    const tokenRes = await fetch('https://api.producthunt.com/v2/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }),
      cache: 'no-store'
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Product Hunt authentication failed' }, { status: 502 });
    }

    const graphRes = await fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData.access_token}`
      },
      body: JSON.stringify(payload),
      next: { revalidate: 3600 }
    });

    const data = await graphRes.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Product Hunt data' }, { status: 500 });
  }
}
