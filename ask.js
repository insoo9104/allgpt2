export default async function handler(req, res) {
  const { question } = req.body;
  const OPENAI_API_KEY = "sk-test-1234567890abcdef";

  const fetchOpenAI = async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: question }],
        }),
      });
      const json = await response.json();
      return json.choices?.[0]?.message?.content || "답변 없음";
    } catch (e) {
      return "OpenAI 오류 발생";
    }
  };

  const fetchGemini = async () => "Google Gemini 응답 (가상 예시)";
  const fetchHyperCLOVA = async () => "NAVER HyperCLOVA 응답 (가상 예시)";
  const fetchClaude = async () => "Anthropic Claude 응답 (가상 예시)";

  const [openai, gemini, clova, claude] = await Promise.all([
    fetchOpenAI(),
    fetchGemini(),
    fetchHyperCLOVA(),
    fetchClaude(),
  ]);

  res.status(200).json({
    "GPT-4 (OpenAI)": openai,
    "Gemini (Google)": gemini,
    "HyperCLOVA (Naver)": clova,
    "Claude (Anthropic)": claude,
  });
}
