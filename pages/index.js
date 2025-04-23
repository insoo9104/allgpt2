import { useState } from "react"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({})

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    setAnswers({})

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    setAnswers(data)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>AllGPT</h1>
      <p>여러 AI의 답변을 한 번에 받아보세요</p>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="질문을 입력하세요"
        style={{ width: "100%", padding: 8 }}
      />
      <button onClick={handleAsk} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "질문 중..." : "질문하기"}
      </button>

      {Object.keys(answers).length > 0 && (
        <div style={{ marginTop: 20 }}>
          {Object.entries(answers).map(([key, val]) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <strong>{key}</strong>
              <p>{val}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
