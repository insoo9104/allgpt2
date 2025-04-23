import { useState } from "react"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({})

  const handleAsk = async () => {
    if (!question) return
    setLoading(true)
    setAnswers({})

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      })

      const data = await res.json()
      setAnswers(data)
    } catch (err) {
      alert("에러 발생")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: "700px", margin: "auto", padding: "40px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>AllGPT</h1>
      <p style={{ color: "#666" }}>여러 인공지능의 답변을 한 번에 비교하세요.</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="질문을 입력하세요"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{
            padding: "10px 16px",
            fontSize: "16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "질문 중..." : "질문하기"}
        </button>
      </div>

      {Object.keys(answers).length > 0 && (
        <div style={{ marginTop: "30px" }}>
          {Object.entries(answers).map(([model, response]) => (
            <div
              key={model}
              style={{
                background: "#f2f2f2",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <strong>{model}</strong>
              <p style={{ marginTop: "8px", whiteSpace: "pre-wrap" }}>{response}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
