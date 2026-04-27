// Anonymous, no-PII custom-event counter for IamFeelingLow.
// Stores aggregate counts in Upstash Redis under keys `event:<name>` and
// `event:<name>:<value>`. No IP, no cookie, no per-user record.
//
// POST /api/track  body { name: <allowlisted string>, value?: <slug> }

const ALLOWED_EVENTS = new Set([
  'clicked_start',
  'answered_q1',
  'answered_q2',
  'answered_q3',
  'answered_q4',
  'viewed_result',
  'clicked_share',
]);

const VALUE_RE = /^[a-z0-9_-]{1,32}$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(503).json({ error: 'tracker not configured' });
  }

  let body;
  try {
    body = typeof req.body === 'object' && req.body !== null
      ? req.body
      : JSON.parse(req.body || '{}');
  } catch (e) {
    return res.status(400).json({ error: 'invalid body' });
  }

  const name = body && typeof body.name === 'string' ? body.name : '';
  const value = body && typeof body.value === 'string' ? body.value : '';

  if (!ALLOWED_EVENTS.has(name)) {
    return res.status(400).json({ error: 'unknown event' });
  }

  if (value && !VALUE_RE.test(value)) {
    return res.status(400).json({ error: 'invalid value' });
  }

  const headers = { Authorization: `Bearer ${token}` };
  const totalKey = `event:${name}`;
  const bucketKey = value ? `event:${name}:${value}` : null;

  try {
    await fetch(`${url}/incr/${totalKey}`, { method: 'POST', headers });
    if (bucketKey) {
      await fetch(`${url}/incr/${bucketKey}`, { method: 'POST', headers });
    }
    return res.status(204).end();
  } catch (e) {
    return res.status(503).json({ error: 'tracker unavailable' });
  }
}
