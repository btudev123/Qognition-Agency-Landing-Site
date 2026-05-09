import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const fieldNames: Record<string, string> = {
  firstname: 'firstname',
  email: 'email',
  company: 'company',
  website: 'website',
  message: 'message'
};

export async function POST(request: NextRequest) {
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_LEAD_FORM_GUID;

  if (!portalId || !formGuid) {
    return NextResponse.json(
      { error: 'HubSpot is not configured. Add HUBSPOT_PORTAL_ID and HUBSPOT_LEAD_FORM_GUID.' },
      { status: 503 }
    );
  }

  try {
    const payload = await request.json();
    const fields = Object.entries(payload.fields || {})
      .filter(([key, value]) => fieldNames[key] && typeof value === 'string' && value.trim().length > 0)
      .map(([key, value]) => ({
        name: fieldNames[key],
        value: String(value)
      }));

    if (!fields.some((field) => field.name === 'email')) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const messageField = fields.find((field) => field.name === 'message');
    const sourceNote = `Source: ${payload.source || 'Website'}${payload.resource ? ` | Resource: ${payload.resource}` : ''}`;
    if (messageField) {
      messageField.value = `${messageField.value}\n\n${sourceNote}`;
    } else {
      fields.push({ name: 'message', value: sourceNote });
    }

    const hutk = request.cookies.get('hubspotutk')?.value;
    const hubspotResponse = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submittedAt: Date.now().toString(),
        fields,
        context: {
          hutk,
          pageUri: payload.pageUri,
          pageName: payload.pageName
        }
      }),
      cache: 'no-store'
    });

    const data = await hubspotResponse.json().catch(() => ({}));
    if (!hubspotResponse.ok) {
      return NextResponse.json({ error: data?.message || 'HubSpot submission failed.' }, { status: hubspotResponse.status });
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit lead.' }, { status: 500 });
  }
}
