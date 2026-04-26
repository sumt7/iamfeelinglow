// Anonymous Start-button counter for v1a.
// Stores a single integer in Upstash Redis. No IP, no cookie, no per-user record.
// GET  -> { count: <int> }
// POST -> increments, returns { count: <int> }

const KEY = 'v1a-start-clicks';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return res.status(503).json({ error: 'counter not configured' });
  }

  const headers = { Authorization: `Bearer ${token}` };

  try {
    if (req.method === 'POST') {
      const r = await fetch(`${url}/incr/${KEY}`, { method: 'POST', headers });
      if (!r.ok) throw new Error('upstream');
      const { result } = await r.json();
      return res.status(200).json({ count: Number(result) });
    }

    const r = await fetch(`${url}/get/${KEY}`, { headers });
    if (!r.ok) throw new Error('upstream');
    const { result } = await r.json();
    return res.status(200).json({ count: parseInt(result || '0', 10) });
  } catch (e) {
    return res.status(503).json({ error: 'counter unavailable' });
  }
}
