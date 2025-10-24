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
      model: "gpt-4o-mini",
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
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Không thể kết nối với AI. Vui lòng thử lại sau.");
  }
}

interface MenuParams {
  budget: string;
  mealsPerDay: string;
  diet: string;
  skillLevel: string;
}

export async function generateMenu(params: MenuParams): Promise<string> {
  try {
    const { budget, mealsPerDay, diet, skillLevel } = params;
    
    const dietLabels: Record<string, string> = {
      'normal': 'bình thường',
      'vegetarian': 'ăn chay',
      'low-carb': 'ít tinh bột',
      'high-protein': 'nhiều đạm'
    };

    const skillLabels: Record<string, string> = {
      'beginner': 'mới bắt đầu nấu ăn',
      'intermediate': 'đã có kinh nghiệm nấu ăn',
      'advanced': 'nấu ăn thành thạo'
    };

    const prompt = `Tạo thực đơn chi tiết cho sinh viên với các yêu cầu sau:
- Ngân sách: ${budget ? `${budget} VNĐ/ngày` : 'linh hoạt'}
- Số bữa ăn: ${mealsPerDay ? `${mealsPerDay} bữa/ngày` : '3 bữa/ngày'}
- Chế độ ăn: ${diet ? dietLabels[diet] : 'bình thường'}
- Kỹ năng nấu ăn: ${skillLevel ? skillLabels[skillLevel] : 'trung bình'}

Hãy đưa ra thực đơn với format sau:
1. Tổng quan ngân sách phân bổ
2. Thực đơn chi tiết cho ${mealsPerDay || '3'} bữa (bữa sáng, trưa, tối)
3. Mỗi món ăn cần có:
   - Tên món
   - Nguyên liệu chính và ước lượng giá
   - Thời gian nấu
   - Độ khó (phù hợp với kỹ năng)
   - Giá trị dinh dưỡng cơ bản

Hãy đảm bảo thực đơn:
- Phù hợp với ngân sách
- Cân bằng dinh dưỡng
- Dễ mua nguyên liệu tại chợ/siêu thị TP.HCM
- Phù hợp với kỹ năng nấu ăn của người dùng
- Sử dụng nguyên liệu Việt Nam phổ biến`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là chuyên gia dinh dưỡng và đầu bếp chuyên tạo thực đơn cho sinh viên Việt Nam. 
Bạn hiểu rõ về giá cả thực phẩm tại TP.HCM, các món ăn Việt Nam truyền thống, và cách cân bằng dinh dưỡng với ngân sách hạn chế.
Hãy tạo thực đơn thực tế, dễ thực hiện, và phù hợp với đời sống sinh viên.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1500,
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, không thể tạo thực đơn lúc này.";
  } catch (error) {
    console.error("Error generating menu:", error);
    throw new Error("Không thể tạo thực đơn. Vui lòng thử lại sau.");
  }
}
