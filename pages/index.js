// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleClick = () => {
    setOutput(`"${input}"에 대한 AI 답변 예시입니다.`);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AllGPT</h1>
      <p>여러 인공지능의 답변을 한 번에 비교하세요.</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="질문을 입력하세요"
        style={{ padding: '0.5rem', marginRight: '0.5rem', width: '300px' }}
      />
      <button onClick={handleClick} style={{ padding: '0.5rem 1rem' }}>
        질문하기
      </button>

      {output && (
        <div style={{ marginTop: '2rem' }}>
          <h3>AI 답변:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}

  )
}
