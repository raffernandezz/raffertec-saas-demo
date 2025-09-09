
import { useState, useRef } from 'react';

export default function Home() {
  const [input, setInput] = useState('Cole seu texto aqui...');
  const [score, setScore] = useState(null);
  const [rewritten, setRewritten] = useState('');
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingRewrite, setLoadingRewrite] = useState(false);
  const editorRef = useRef(null);

  function scrollToEditor() {
    if (editorRef.current) editorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleScore() {
    setLoadingScore(true); setScore(null);
    try {
      const res = await fetch('/api/score', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ text: input }) });
      const data = await res.json();
      setScore(data);
    } catch (e) { setScore({ error: 'Falha ao calcular score.' }); }
    finally { setLoadingScore(false); }
  }

  async function handleRewrite(style='natural') {
    setLoadingRewrite(true); setRewritten('');
    try {
      const res = await fetch('/api/rewrite', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ text: input, style }) });
      const data = await res.json();
      setRewritten(data.rewritten || '');
    } catch (e) { setRewritten('Erro ao reescrever.'); }
    finally { setLoadingRewrite(false); }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="hero">
          <img src="/logo.svg" alt="RafferTec" />
          <div>
            <h1>RafferTec — Humanizador de Texto</h1>
            <p className="lead">UX limpa, rápida e responsiva. Calcule um <strong>AI Score</strong> e gere uma versão mais humana do seu texto.</p>
          </div>
        </div>

        <div className="cta">
          <button className="btn" onClick={scrollToEditor}>Testar agora</button>
          <a className="btn link" href="#como-funciona">Como funciona</a>
        </div>

        <hr className="sep" />

        <div id="como-funciona" className="small" style={{marginBottom:12}}>
          <strong>Como funciona:</strong> insira um texto, clique em <em>Check AI Score</em> para simular o score e em <em>Humanizar Texto</em> para ver uma versão reescrita (endpoints de exemplo).
        </div>

        <div ref={editorRef}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} />
        </div>

        <div className="row" style={{marginTop:12}}>
          <button className="btn" onClick={handleScore} disabled={loadingScore}>{loadingScore ? 'Calculando...' : 'Check AI Score'}</button>
          <button className="btn secondary" onClick={()=>handleRewrite('natural')} disabled={loadingRewrite}>{loadingRewrite ? 'Reescrevendo...' : 'Humanizar Texto'}</button>
          <button className="btn secondary" onClick={()=>handleRewrite('formal')} disabled={loadingRewrite}>Versão Formal</button>
        </div>

        <div className="row" style={{marginTop:16}}>
          <div className="card" style={{flex:'1 1 280px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <strong>AI Score</strong>
              {score && !score.error && <span className="badge">{score.scale}</span>}
            </div>
            <div style={{marginTop:10}} className="score">
              {score?.error ? '—' : (score ? score.score : '—')}
            </div>
            <div style={{color:'#9aa4bf', fontSize:13, marginTop:8}}>
              {score?.notes || 'Clique em "Check AI Score" para simular.'}
            </div>
          </div>

          <div className="card" style={{flex:'2 1 420px'}}>
            <strong>Texto Reescrito</strong>
            <div className="output" style={{marginTop:10}}>
              {rewritten || 'Clique em "Humanizar Texto" para ver o resultado.'}
            </div>
          </div>
        </div>

        <footer>© {new Date().getFullYear()} RafferTec. Demo mock — pronta pra evoluir com IA real.</footer>
      </div>
    </div>
  );
}
