import Image from "next/image"

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1>AllGPT</h1>
      </div>
      <p>여러 인공지능의 답변을 한 번에 비교하세요.</p>
    </div>
  )
}
