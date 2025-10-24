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

QUAN TRỌNG - Định dạng văn bản:
- Sử dụng **in đậm** cho tên món ăn, tiêu đề, và thông tin quan trọng
- Sử dụng *in nghiêng* để nhấn mạnh hoặc ghi chú
- Sử dụng dấu đầu dòng (-) để liệt kê
- Sử dụng số (1., 2., 3.) cho các bước nấu ăn
- Chia nhỏ thành các đoạn rõ ràng

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
  servings: string;
  mealsPerDay: string;
  diet: string;
  skillLevel: string;
}

export async function generateMenu(params: MenuParams): Promise<string> {
  try {
    const { budget, servings, mealsPerDay, diet, skillLevel } = params;
    
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
- Số người ăn: ${servings ? `${servings} người` : '1 người'}
- Số bữa ăn: ${mealsPerDay ? `${mealsPerDay} bữa/ngày` : '3 bữa/ngày'}
- Chế độ ăn: ${diet ? dietLabels[diet] : 'bình thường'}
- Kỹ năng nấu ăn: ${skillLevel ? skillLabels[skillLevel] : 'trung bình'}

Hãy đưa ra thực đơn với format sau:
1. Tổng quan ngân sách phân bổ
2. Thực đơn chi tiết cho ${mealsPerDay || '3'} bữa (bữa sáng, trưa, tối)
3. Mỗi món ăn cần có:
   - Tên món (**in đậm**)
   - Nguyên liệu chi tiết (liệt kê dạng danh sách với số lượng cụ thể cho ${servings || '1'} người)
   - Giá ước tính
   - Thời gian nấu
   - HƯỚNG DẪN NẤU TỪNG BƯỚC (số thứ tự 1., 2., 3., ...)
   - Mẹo nhỏ (*in nghiêng*)

Hãy đảm bảo thực đơn:
- Phù hợp với ngân sách
- Tính toán nguyên liệu chính xác cho ${servings || '1'} người
- Cân bằng dinh dưỡng
- Dễ mua nguyên liệu tại chợ/siêu thị TP.HCM
- Phù hợp với kỹ năng nấu ăn của người dùng
- Sử dụng nguyên liệu Việt Nam phổ biến
- Hướng dẫn nấu rõ ràng, dễ hiểu, chi tiết từng bước`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là chuyên gia dinh dưỡng và đầu bếp chuyên tạo thực đơn cho sinh viên Việt Nam. 
Bạn hiểu rõ về giá cả thực phẩm tại TP.HCM, các món ăn Việt Nam truyền thống, và cách cân bằng dinh dưỡng với ngân sách hạn chế.
Bạn giỏi tính toán nguyên liệu cho nhiều người ăn.
Hãy tạo thực đơn thực tế, dễ thực hiện, và phù hợp với đời sống sinh viên.

QUAN TRỌNG - Bạn PHẢI bao gồm HƯỚNG DẪN NẤU CHI TIẾT cho TỪNG món ăn trong thực đơn!

Định dạng văn bản:
- Sử dụng **in đậm** cho tên món ăn, tiêu đề các phần
- Sử dụng *in nghiêng* cho ghi chú, mẹo nhỏ
- Sử dụng ### cho tiêu đề chính (### BỮA SÁNG)
- Sử dụng dấu đầu dòng (-) để liệt kê nguyên liệu
- Sử dụng số thứ tự (1., 2., 3.) cho các bước nấu
- Tổ chức rõ ràng, dễ đọc với khoảng trống hợp lý

Cấu trúc cho mỗi món:
**Tên món**
- Nguyên liệu: ...
- Giá: ~X,000 VNĐ
- Thời gian: Y phút

Cách nấu:
1. Bước 1...
2. Bước 2...
3. Bước 3...

*Mẹo: ...*`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 3000,
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, không thể tạo thực đơn lúc này.";
  } catch (error) {
    console.error("Error generating menu:", error);
    throw new Error("Không thể tạo thực đơn. Vui lòng thử lại sau.");
  }
}

interface MealParams {
  budget: string;
  servings: string;
  diet: string;
  dishName?: string;
}

interface IngredientsParams {
  ingredients: string[];
  otherIngredients?: string;
  servings: string;
  budget: string;
  diet: string;
  skillLevel: string;
}

export async function generateRecipeFromIngredients(params: IngredientsParams): Promise<string> {
  try {
    const { ingredients, otherIngredients, servings, budget, diet, skillLevel } = params;
    
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

    const ingredientsList = ingredients.join(', ');
    const allIngredients = otherIngredients && otherIngredients.trim() 
      ? `${ingredientsList}, ${otherIngredients}`
      : ingredientsList;

    const prompt = `Gợi ý món ăn phù hợp nhất từ các nguyên liệu có sẵn sau:
**Nguyên liệu đã có:** ${allIngredients}

**Yêu cầu:**
- Số người ăn: ${servings} người
- Ngân sách thêm (nếu thiếu nguyên liệu): ${budget} VNĐ
- Chế độ ăn: ${dietLabels[diet] || 'bình thường'}
- Kỹ năng nấu ăn: ${skillLabels[skillLevel] || 'trung bình'}

Hãy gợi ý MỘT món ăn tối ưu nhất và cung cấp:
1. **Tên món** (in đậm) - giải thích TẠI SAO món này phù hợp với nguyên liệu có sẵn
2. Cách sử dụng nguyên liệu đã có
3. Nguyên liệu cần mua thêm (nếu có) - với số lượng cụ thể cho ${servings} người
4. Giá ước tính cho nguyên liệu cần mua thêm (phải nằm trong ngân sách ${budget} VNĐ)
5. Tổng giá (chỉ tính nguyên liệu mua thêm)
6. Thời gian chuẩn bị và nấu
7. **Cách nấu từng bước** (số thứ tự 1., 2., 3., ...)
8. *Mẹo nhỏ* (in nghiêng)
9. Giá trị dinh dưỡng

Đảm bảo:
- TỐI ƯU hóa việc sử dụng nguyên liệu đã có
- Nguyên liệu mua thêm phải nằm trong ngân sách
- Phù hợp với kỹ năng ${skillLabels[skillLevel]}
- Phù hợp với chế độ ăn ${dietLabels[diet]}
- Hướng dẫn rõ ràng, chi tiết từng bước`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là chuyên gia đầu bếp và dinh dưỡng chuyên tư vấn nấu ăn cho sinh viên Việt Nam.
Bạn rất giỏi trong việc tạo ra món ăn từ nguyên liệu có sẵn, giúp sinh viên tránh lãng phí thực phẩm.
Bạn hiểu rõ về giá cả thực phẩm tại TP.HCM và cách tối ưu hóa ngân sách.

Định dạng văn bản:
- Sử dụng **in đậm** cho tên món ăn, tiêu đề
- Sử dụng *in nghiêng* cho mẹo nhỏ, ghi chú
- Sử dụng ### cho tiêu đề chính
- Sử dụng dấu đầu dòng (-) để liệt kê nguyên liệu
- Sử dụng số thứ tự (1., 2., 3.) cho các bước nấu
- Tổ chức rõ ràng, dễ đọc

QUAN TRỌNG:
- Ưu tiên SỬ DỤNG TỐI ĐA nguyên liệu đã có
- Chỉ gợi ý CHỈ 1 món duy nhất
- Luôn bao gồm hướng dẫn nấu chi tiết từng bước
- Giá phải thực tế và nằm trong ngân sách`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, không thể tạo công thức lúc này.";
  } catch (error) {
    console.error("Error generating recipe from ingredients:", error);
    throw new Error("Không thể tạo công thức. Vui lòng thử lại sau.");
  }
}

export async function generateMealRecipe(params: MealParams): Promise<string> {
  try {
    const { budget, servings, diet, dishName } = params;
    
    const dietLabels: Record<string, string> = {
      'normal': 'bình thường',
      'vegetarian': 'ăn chay',
      'low-carb': 'ít tinh bột',
      'high-protein': 'nhiều đạm'
    };

    let prompt = '';
    
    if (dishName && dishName.trim()) {
      // User specified a dish
      prompt = `Tạo công thức nấu chi tiết cho món "${dishName}" với các yêu cầu:
- Ngân sách: ${budget} VNĐ
- Số người ăn: ${servings} người
- Chế độ ăn: ${dietLabels[diet] || 'bình thường'}

Hãy cung cấp:
1. **Tên món** (in đậm)
2. Nguyên liệu chi tiết (liệt kê dạng danh sách với số lượng cụ thể cho ${servings} người)
3. Giá ước tính cho từng nguyên liệu chính
4. Tổng giá (phải nằm trong ngân sách ${budget} VNĐ)
5. Thời gian chuẩn bị và nấu
6. **Cách nấu từng bước** (số thứ tú 1., 2., 3., ...)
7. *Mẹo nhỏ* (in nghiêng)
8. Giá trị dinh dưỡng

Đảm bảo:
- Phù hợp với ngân sách
- Nguyên liệu dễ mua tại TP.HCM
- Hướng dẫn rõ ràng, dễ hiểu
- Phù hợp với chế độ ăn ${dietLabels[diet]}`;
    } else {
      // No dish specified, recommend one
      prompt = `Gợi ý MỘT món ăn phù hợp nhất với các yêu cầu sau:
- Ngân sách: ${budget} VNĐ
- Số người ăn: ${servings} người
- Chế độ ăn: ${dietLabels[diet] || 'bình thường'}

Hãy gợi ý món ăn PHÙ HỢP NHẤT với ngân sách và cung cấp đầy đủ:
1. **Tên món** (in đậm) - giải thích TẠI SAO phù hợp với ngân sách này
2. Nguyên liệu chi tiết (liệt kê dạng danh sách với số lượng cụ thể cho ${servings} người)
3. Giá ước tính cho từng nguyên liệu chính
4. Tổng giá (phải nằm trong ngân sách ${budget} VNĐ)
5. Thời gian chuẩn bị và nấu
6. **Cách nấu từng bước** (số thứ tự 1., 2., 3., ...)
7. *Mẹo nhỏ* (in nghiêng)
8. Giá trị dinh dưỡng

Đảm bảo:
- CHỈ gợi ý 1 món duy nhất
- Phù hợp với ngân sách (QUAN TRỌNG!)
- Nguyên liệu dễ mua tại TP.HCM
- Hướng dẫn rõ ràng, dễ hiểu
- Phù hợp với chế độ ăn ${dietLabels[diet]}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Bạn là chuyên gia đầu bếp và dinh dưỡng chuyên tư vấn nấu ăn cho sinh viên Việt Nam.
Bạn hiểu rõ về giá cả thực phẩm tại TP.HCM, các món ăn Việt Nam, và cách tính toán nguyên liệu cho nhiều người.

Định dạng văn bản:
- Sử dụng **in đậm** cho tên món ăn, tiêu đề
- Sử dụng *in nghiêng* cho mẹo nhỏ, ghi chú
- Sử dụng ### cho tiêu đề chính
- Sử dụng dấu đầu dòng (-) để liệt kê nguyên liệu
- Sử dụng số thứ tự (1., 2., 3.) cho các bước nấu
- Tổ chức rõ ràng, dễ đọc

QUAN TRỌNG:
- Nếu người dùng chỉ định món ăn: chỉ cung cấp thông tin về món đó
- Nếu không chỉ định: gợi ý CHỈ 1 món phù hợp nhất với ngân sách
- Luôn bao gồm hướng dẫn nấu chi tiết từng bước
- Giá phải thực tế và nằm trong ngân sách`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || "Xin lỗi, không thể tạo công thức lúc này.";
  } catch (error) {
    console.error("Error generating meal recipe:", error);
    throw new Error("Không thể tạo công thức. Vui lòng thử lại sau.");
  }
}
