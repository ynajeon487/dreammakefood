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

export default function Shopping() {
  const initialShoppingList = [
    {
      category: "Rau củ",
      items: [
        {
          id: 1,
          name: "Cà chua",
          amount: "4 quả",
          price: 12000,
          pricePerUnit: "3,000đ/quả",
          checked: false,
        },
        {
          id: 2,
          name: "Rau muống",
          amount: "300g",
          price: 9000,
          pricePerUnit: "30,000đ/kg",
          checked: false,
        },
        {
          id: 3,
          name: "Hành lá",
          amount: "2 cây",
          price: 4000,
          pricePerUnit: "2,000đ/cây",
          checked: false,
        },
      ],
    },
    {
      category: "Protein",
      items: [
        {
          id: 4,
          name: "Trứng gà",
          amount: "10 quả",
          price: 35000,
          pricePerUnit: "3,500đ/quả",
          checked: false,
        },
        {
          id: 5,
          name: "Thịt gà",
          amount: "200g",
          price: 32000,
          pricePerUnit: "160,000đ/kg",
          checked: false,
        },
      ],
    },
    {
      category: "Khác",
      items: [
        {
          id: 6,
          name: "Gạo",
          amount: "1kg",
          price: 25000,
          pricePerUnit: "25,000đ/kg",
          checked: false,
        },
        {
          id: 7,
          name: "Dầu ăn",
          amount: "1 chai",
          price: 45000,
          pricePerUnit: "45,000đ/chai",
          checked: false,
        },
      ],
    },
  ];

  const [shoppingList, setShoppingList] = useState(initialShoppingList);

  const totalPrice = shoppingList.reduce((total, category) => {
    return (
      total +
      category.items.reduce(
        (sum, item) => (item.checked ? sum + item.price : sum),
        0
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
              item.id === itemId ? { ...item, checked: !item.checked } : item
            ),
          };
        }
        return category;
      })
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
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Khu vực:</span>
              <span className="font-semibold text-accent">TP Hồ Chí Minh</span>
              <span className="text-muted-foreground">
                • Giá cập nhật: Tháng 1/2025
              </span>
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
                  <p>Tải xuống danh sách mua sắm dưới dạng file PDF hoặc text</p>
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
              <Card
                key={categoryIndex}
                className="p-6"
                data-testid={`category-${categoryIndex}`}
              >
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

          {shoppingList.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Danh sách mua sắm trống. Hãy tạo thực đơn để bắt đầu!
              </p>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
