export default async function handler(request, response) {
  // Ideally, move these to Vercel Environment Variables in your dashboard
  const API_KEY = process.env.PH_API_KEY || "7F2ibwHqAZ82bsGNiIh