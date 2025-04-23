import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setAnswers({});
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswers(data);
    setLoading(false);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>AllGPT</h1>
      <p>여러 AI 답변을 한눈에!</p>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="무엇이든 물어보세요"
        style={{ width: '60%', marginRight: 10 }}
      />
      <button onClick={handleAsk} disabled={loading}>
        {loading ? '로딩중...' : '질문하기'}
      </button>
      <div style={{ marginTop: 20 }}>
        {Object.entries(answers).map(([model, content]) => (
          <div key={model} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <h3>{model}</h3>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
