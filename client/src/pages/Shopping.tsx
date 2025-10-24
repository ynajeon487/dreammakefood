import { useState } from "react";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Trash2 } from "lucide-react";
import { vietnameseIngredients } from "@/lib/ingredients";

interface IngredientPrice {
  amount: string;
  price: number;
  pricePerUnit: string;
}

const ingredientPrices: Record<string, IngredientPrice> = {
  "cà chua": { amount: "4 quả", price: 12000, pricePerUnit: "3,000đ/quả" },
  "cà rốt": { amount: "500g", price: 10000, pricePerUnit: "20,000đ/kg" },
  "khoai tây": { amount: "500g", price: 15000, pricePerUnit: "30,000đ/kg" },
  "bắp cải": { amount: "1 củ", price: 12000, pricePerUnit: "12,000đ/củ" },
  "rau muống": { amount: "300g", price: 9000, pricePerUnit: "30,000đ/kg" },
  "rau cải": { amount: "300g", price: 8000, pricePerUnit: "27,000đ/kg" },
  "dưa chuột": { amount: "3 quả", price: 9000, pricePerUnit: "3,000đ/quả" },
  "đậu đũa": { amount: "300g", price: 12000, pricePerUnit: "40,000đ/kg" },
  "bí đao": { amount: "500g", price: 8000, pricePerUnit: "16,000đ/kg" },

  "thịt heo": { amount: "300g", price: 45000, pricePerUnit: "150,000đ/kg" },
  "thịt bò": { amount: "300g", price: 75000, pricePerUnit: "250,000đ/kg" },
  "thịt gà": { amount: "300g", price: 48000, pricePerUnit: "160,000đ/kg" },
  "ba chỉ": { amount: "300g", price: 42000, pricePerUnit: "140,000đ/kg" },

  tôm: { amount: "200g", price: 60000, pricePerUnit: "300,000đ/kg" },
  cá: { amount: "300g", price: 45000, pricePerUnit: "150,000đ/kg" },
  mực: { amount: "200g", price: 55000, pricePerUnit: "275,000đ/kg" },

  "đậu hũ": { amount: "2 miếng", price: 8000, pricePerUnit: "4,000đ/miếng" },
  trứng: { amount: "10 quả", price: 35000, pricePerUnit: "3,500đ/quả" },
  "đậu xanh": { amount: "200g", price: 10000, pricePerUnit: "50,000đ/kg" },

  "nấm rơm": { amount: "200g", price: 15000, pricePerUnit: "75,000đ/kg" },
  "nấm hương": { amount: "100g", price: 20000, pricePerUnit: "200,000đ/kg" },

  gạo: { amount: "1kg", price: 25000, pricePerUnit: "25,000đ/kg" },
  mì: { amount: "500g", price: 12000, pricePerUnit: "24,000đ/kg" },
  bún: { amount: "500g", price: 10000, pricePerUnit: "20,000đ/kg" },
  "bánh mì": { amount: "4 ổ", price: 20000, pricePerUnit: "5,000đ/ổ" },

  "hành tây": { amount: "300g", price: 9000, pricePerUnit: "30,000đ/kg" },
  "hành tím": { amount: "200g", price: 12000, pricePerUnit: "60,000đ/kg" },
  tỏi: { amount: "100g", price: 8000, pricePerUnit: "80,000đ/kg" },
  gừng: { amount: "100g", price: 6000, pricePerUnit: "60,000đ/kg" },
  ớt: { amount: "100g", price: 5000, pricePerUnit: "50,000đ/kg" },
  sả: { amount: "50g", price: 4000, pricePerUnit: "80,000đ/kg" },
};

export default function Shopping() {
  // Generate shopping list from ingredients with prices
  const generateInitialShoppingList = () => {
    const grouped: Record<string, any[]> = {};
    let idCounter = 1;

    vietnameseIngredients.forEach((ingredient) => {
      const priceInfo = ingredientPrices[ingredient.value];
      if (priceInfo) {
        const category = ingredient.category;
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push({
          id: idCounter++,
          name: ingredient.label,
          amount: priceInfo.amount,
          price: priceInfo.price,
          pricePerUnit: priceInfo.pricePerUnit,
          checked: false,
        });
      }
    });

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
    }));
  };

  const [shoppingList, setShoppingList] = useState(
    generateInitialShoppingList(),
  );

  const totalPrice = shoppingList.reduce((total, category) => {
    return (
      total +
      category.items.reduce(
        (sum, item) => (item.checked ? sum + item.price : sum),
        0,
      )
    );
  }, 0);

  const handleItemCheck = (categoryIndex: number, itemId: number) => {
    setShoppingList((prev) =>
      prev.map((category, idx) => {
        if (idx === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item) =>
              item.id === itemId ? { ...item, checked: !item.checked } : item,
            ),
          };
        }
        return category;
      }),
    );
  };

  const handleDownload = () => {
    console.log("Downloading shopping list");
  };

  const handleClearList = () => {
    console.log("Clearing shopping list");
  };

  return (
    <>
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Danh Sách Mua Sắm
            </h1>
            <p className="text-muted-foreground text-lg mb-2">
              Danh sách nguyên liệu cần mua từ thực đơn đã lập
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Khu vực:</span>
                <span className="font-semibold text-accent">
                  TP Hồ Chí Minh
                </span>
                <span className="text-muted-foreground">
                  Giá cập nhật: Tháng 1/2025
                </span>
              </div>
              <p className="text-muted-foreground italic text-xs">
                Giá được thể hiện ở đây có thể có sự chênh lệch giữa các khu vực
                khác nhau, với mức sống khác nhau. Vui lòng kiểm tra thật kĩ.
                Xin cảm ơn.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleDownload}
                    data-testid="button-download-list"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Tải danh sách
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Tải xuống danh sách mua sắm dưới dạng file PDF hoặc text
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleClearList}
                    data-testid="button-clear-list"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Xóa danh sách
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Xóa toàn bộ danh sách mua sắm hiện tại</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Card className="px-4 py-3 bg-accent/10 border-accent">
              <div className="text-sm text-muted-foreground">
                Tổng chi phí (đã chọn)
              </div>
              <div className="text-2xl font-bold text-accent font-['Lexend']">
                {totalPrice.toLocaleString("vi-VN")}đ
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {shoppingList.map((category, categoryIndex) => (
              <Card key={category.category} className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-4 font-['Lexend']">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start gap-3"
                      data-testid={`item-${item.id}`}
                    >
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() =>
                          handleItemCheck(categoryIndex, item.id)
                        }
                        className="mt-1"
                        data-testid={`checkbox-item-${item.id}`}
                      />
                      <div className="flex-1">
                        <div
                          className={`flex items-baseline justify-between gap-2 ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="font-semibold text-accent whitespace-nowrap">
                            {item.price.toLocaleString("vi-VN")}đ
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {item.amount} • {item.pricePerUnit}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
