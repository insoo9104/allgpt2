// pages/index.js

import Image from "next/image"

export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1>AllGPT</h1>
      </div>
      <p>여러 인공지능의 답변을 한 번에 비교하세요.</p>
      <input
        type="text"
        placeholder="질문을 입력하세요"
        style={{
          marginTop: "20px",
          padding: "8px",
          width: "100%",
          maxWidth: "400px",
        }}
      />
    </div>
  )
}
  )
}
