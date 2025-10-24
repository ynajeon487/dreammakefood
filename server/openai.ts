import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini", // Using mini version for cost efficiency
      messages: [
        {
          role: "system",
          content: `Bạn là một trợ lý AI chuyên tư vấn nấu ăn cho sinh viên Việt Nam. 
Nhiệm vụ của bạn:
- Gợi ý món ăn tiết kiệm, phù hợp với ngân sách sinh viên
- Tư vấn về dinh dưỡng và cách cân bằng bữa ăn
- Hướng dẫn cách nấu các món ăn đơn giản
- Gợi ý thay thế nguyên liệu khi cần
- Chia sẻ mẹo mua sắm và bảo quản thực phẩm

Hãy trả lời bằng tiếng Việt, thân thiện, dễ hiểu và thiết thực cho sinh viên.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_completion_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Không thể kết nối với AI. Vui lòng thử lại sau.");
  }
}
