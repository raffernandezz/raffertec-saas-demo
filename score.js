export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { text = '' } = req.body || {};
  // Simple mock heuristics for demo only
  const length = Math.max(1, text.trim().length);
  const uniqueWords = new Set(text.toLowerCase().split(/\W+/).filter(Boolean)).size;
  const lexicalVar = uniqueWords / Math.max(1, text.split(/\W+/).filter(Boolean).length);
  let base = 0.5 + Math.min(0.4, lexicalVar) - Math.min(0.2, Math.abs(250 - length)/250);
  base = Math.max(0.05, Math.min(0.95, base));
  const score = Number(base.toFixed(2));
  res.status(200).json({
    score,
    scale: '0-1',
    breakdown: {
      lexicalVar: Number(lexicalVar.toFixed(2)),
      lengthPenalty: Number((Math.min(0.2, Math.abs(250 - length)/250)).toFixed(2))
    },
    notes: 'Score meramente ilustrativo para demonstração.'
  });
}
