export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { text = '', style = 'natural' } = req.body || {};
  const cleaned = text.replace(/\s+/g, ' ').trim();
  const tweaks = cleaned    .replace(/\butilizar\b/gi, 'usar')    .replace(/\bno entanto\b/gi, 'mas')    .replace(/\bportanto\b/gi, 'então')    .replace(/\bdevido a\b/gi, 'por causa de')    .replace(/\brealizar\b/gi, 'fazer');
  const rewritten = (style === 'formal') ? tweaks.replace(/\bmas\b/gi, 'no entanto') : tweaks;
  res.status(200).json({
    original: text,
    rewritten,
    style_used: style,
    changes_summary: ['ajustes de clareza', 'vocabulário mais simples', 'normalização de espaços']
  });
}
