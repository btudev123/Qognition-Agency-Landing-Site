import { NextRequest, NextResponse } from 'next/server';
import { submitHubSpotLead } from '../../../lib/leadDelivery';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const result = await submitHubSpotLead(payload, request);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit lead.' }, { status: 500 });
  }
}
