export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({
    ok: true,
    service: 'qognition-agency',
    status: 'healthy',
    time: new Date().toISOString()
  });
}
