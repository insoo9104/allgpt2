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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    setAnswers(data)
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="AllGPT Logo" width={40} height={40} />
        <h1 className="text-3xl font-bold tracking-tight">AllGPT</h1>
      </div>
      <p className="text-muted-foreground text-base">
        여러 인공지능의 답변을 한 번에 비교하세요
      </p>

      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="무엇이든 물어보세요"
          className="border p-2 rounded w-full"
        />
        <button onClick={handleAsk} disabled={loading} className="bg-black text-white px-4 py-2 rounded">
          {loading ? "질문 중..." : "질문하기"}
        </button>
      </div>

      {Object.keys(answers).length > 0 && (
        <div className="space-y-4">
          {Object.entries(answers).map(([model, content]) => (
            <div key={model} className="border p-4 rounded">
              <h2 className="font-semibold text-lg">🧠 {model}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
