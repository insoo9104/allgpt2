import { useState } from "react"
import Image from "next/image"

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
    <div style={{ maxWidth: "720px", margin: "auto", padding: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>AllGPT</h1>
      </div>
      <p>여러 인공지능의 답변을 한 번에 비교하세요.</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="무엇이든 물어보세요"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "질문 중..." : "질문하기"}
        </button>
      </div>

      {Object.keys(answers).length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {Object.entries(answers).map(([model, response]) => (
            <div key={model} style={{ marginBottom: "12px", padding: "10px", border: "1px solid #ddd" }}>
              <h3>🧠 {model}</h3>
              <p>{response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
