import { useState } from "react";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Trash2 } from "lucide-react";
import { vietnameseIngredients } from "@/lib/ingredients";
import html2pdf from "html2pdf.js";

interface IngredientPriceInfo {
  defaultQuantity: number;
  unit: string;
  baseUnitPrice: number; // price per single unit (1g, 1 quả, etc.)
  displayPriceUnit: string; // for display like "3,000đ/quả"
}

// Price per base unit (1g for weight items, 1 piece for count items)
const ingredientPrices: Record<string, IngredientPriceInfo> = {
  'cà chua': { defaultQuantity: 4, unit: 'quả', baseUnitPrice: 3000, displayPriceUnit: '3.000đ/quả' },
  'cà rốt': { defaultQuantity: 500, unit: 'g', baseUnitPrice: 20, displayPriceUnit: '20.000đ/kg' },
  'khoai tây': { defaultQuantity: 500, unit: 'g', baseUnitPrice: 30, displayPriceUnit: '30.000đ/kg' },
  'bắp cải': { defaultQuantity: 1, unit: 'củ', baseUnitPrice: 12000, displayPriceUnit: '12.000đ/củ' },
  'rau muống': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 30, displayPriceUnit: '30.000đ/kg' },
  'rau cải': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 27, displayPriceUnit: '27.000đ/kg' },
  'dưa chuột': { defaultQuantity: 3, unit: 'quả', baseUnitPrice: 3000, displayPriceUnit: '3.000đ/quả' },
  'đậu đũa': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 40, displayPriceUnit: '40.000đ/kg' },
  'bí đao': { defaultQuantity: 500, unit: 'g', baseUnitPrice: 16, displayPriceUnit: '16.000đ/kg' },
  
  'thịt heo': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 150, displayPriceUnit: '150.000đ/kg' },
  'thịt bò': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 250, displayPriceUnit: '250.000đ/kg' },
  'thịt gà': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 160, displayPriceUnit: '160.000đ/kg' },
  'ba chỉ': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 140, displayPriceUnit: '140.000đ/kg' },
  
  'tôm': { defaultQuantity: 200, unit: 'g', baseUnitPrice: 300, displayPriceUnit: '300.000đ/kg' },
  'cá': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 150, displayPriceUnit: '150.000đ/kg' },
  'mực': { defaultQuantity: 200, unit: 'g', baseUnitPrice: 275, displayPriceUnit: '275.000đ/kg' },
  
  'đậu hũ': { defaultQuantity: 2, unit: 'miếng', baseUnitPrice: 4000, displayPriceUnit: '4.000đ/miếng' },
  'trứng': { defaultQuantity: 10, unit: 'quả', baseUnitPrice: 3500, displayPriceUnit: '3.500đ/quả' },
  'đậu xanh': { defaultQuantity: 200, unit: 'g', baseUnitPrice: 50, displayPriceUnit: '50.000đ/kg' },
  
  'nấm rơm': { defaultQuantity: 200, unit: 'g', baseUnitPrice: 75, displayPriceUnit: '75.000đ/kg' },
  'nấm hương': { defaultQuantity: 100, unit: 'g', baseUnitPrice: 200, displayPriceUnit: '200.000đ/kg' },
  
  'gạo': { defaultQuantity: 1000, unit: 'g', baseUnitPrice: 25, displayPriceUnit: '25.000đ/kg' },
  'mì': { defaultQuantity: 500, unit: 'g', baseUnitPrice: 24, displayPriceUnit: '24.000đ/kg' },
  'bún': { defaultQuantity: 500, unit: 'g', baseUnitPrice: 20, displayPriceUnit: '20.000đ/kg' },
  'bánh mì': { defaultQuantity: 4, unit: 'ổ', baseUnitPrice: 5000, displayPriceUnit: '5.000đ/ổ' },
  
  'hành tây': { defaultQuantity: 300, unit: 'g', baseUnitPrice: 30, displayPriceUnit: '30.000đ/kg' },
  'hành tím': { defaultQuantity: 200, unit: 'g', baseUnitPrice: 60, displayPriceUnit: '60.000đ/kg' },
  'tỏi': { defaultQuantity: 100, unit: 'g', baseUnitPrice: 80, displayPriceUnit: '80.000đ/kg' },
  'gừng': { defaultQuantity: 100, unit: 'g', baseUnitPrice: 60, displayPriceUnit: '60.000đ/kg' },
  'ớt': { defaultQuantity: 100, unit: 'g', baseUnitPrice: 50, displayPriceUnit: '50.000đ/kg' },
  'sả': { defaultQuantity: 50, unit: 'g', baseUnitPrice: 80, displayPriceUnit: '80.000đ/kg' },
};

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  baseUnitPrice: number;
  displayPriceUnit: string;
  checked: boolean;
}

interface ShoppingCategory {
  category: string;
  items: ShoppingItem[];
}

export default function Shopping() {
  // Generate shopping list from ingredients with prices
  const generateInitialShoppingList = (): ShoppingCategory[] => {
    const grouped: Record<string, ShoppingItem[]> = {};
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
          quantity: priceInfo.defaultQuantity,
          unit: priceInfo.unit,
          baseUnitPrice: priceInfo.baseUnitPrice,
          displayPriceUnit: priceInfo.displayPriceUnit,
          checked: false,
        });
      }
    });

    return Object.entries(grouped).map(([category, items]) => ({
      category,
      items,
    }));
  };

  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>(generateInitialShoppingList());

  const calculateItemPrice = (item: ShoppingItem): number => {
    return item.quantity * item.baseUnitPrice;
  };

  const totalPrice = shoppingList.reduce((total, category) => {
    return (
      total +
      category.items.reduce(
        (sum, item) => (item.checked ? sum + calculateItemPrice(item) : sum),
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

  const handleQuantityChange = (categoryIndex: number, itemId: number, newQuantity: string) => {
    const quantity = parseFloat(newQuantity) || 0;
    setShoppingList((prev) =>
      prev.map((category, idx) => {
        if (idx === categoryIndex) {
          return {
            ...category,
            items: category.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        }
        return category;
      })
    );
  };

  const handleDownload = async () => {
    // Get only checked items
    const checkedCategories = shoppingList
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.checked),
      }))
      .filter((category) => category.items.length > 0);
    
    // Create HTML content
    let htmlContent = `
      <div style="font-family: 'Lexend', 'Inter', sans-serif; padding: 30px; color: #2a321b;">
        <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px; color: #556B2F; font-weight: bold;">
          DANH SÁCH MUA SẮM
        </h1>
        
        <div style="margin-bottom: 20px; font-size: 12px; color: #555;">
          <p style="margin: 5px 0;"><strong>Khu vực:</strong> TP Hồ Chí Minh</p>
          <p style="margin: 5px 0;"><strong>Giá cập nhật:</strong> Tháng 1/2025</p>
          <p style="margin: 5px 0; font-style: italic; font-size: 11px;">
            Lưu ý: Giá có thể chênh lệch giữa các khu vực khác nhau
          </p>
        </div>
        
        <hr style="border: none; border-top: 2px solid #8FA31E; margin: 20px 0;" />
    `;
    
    if (checkedCategories.length === 0) {
      htmlContent += `
        <p style="text-align: center; font-size: 14px; color: #666; margin-top: 30px;">
          Chưa có món nào được chọn.
        </p>
      `;
    } else {
      checkedCategories.forEach((category) => {
        htmlContent += `
          <div style="margin-bottom: 25px;">
            <h2 style="font-size: 16px; font-weight: bold; color: #556B2F; margin-bottom: 10px; text-transform: uppercase;">
              ${category.category}
            </h2>
        `;
        
        category.items.forEach((item) => {
          const itemPrice = calculateItemPrice(item);
          htmlContent += `
            <div style="margin-left: 15px; margin-bottom: 12px; border-left: 3px solid #C6D870; padding-left: 10px;">
              <p style="margin: 3px 0; font-size: 13px; font-weight: 600; color: #2a321b;">
                ${item.name} - ${item.quantity}${item.unit}
              </p>
              <p style="margin: 3px 0; font-size: 12px; color: #666;">
                Giá: <strong style="color: #8FA31E;">${itemPrice.toLocaleString("vi-VN")}đ</strong> (${item.displayPriceUnit})
              </p>
            </div>
          `;
        });
        
        htmlContent += `</div>`;
      });
    }
    
    htmlContent += `
        <hr style="border: none; border-top: 2px solid #8FA31E; margin: 20px 0;" />
        
        <div style="text-align: right; margin-top: 20px;">
          <p style="font-size: 18px; font-weight: bold; color: #556B2F;">
            TỔNG CHI PHÍ: <span style="color: #8FA31E;">${totalPrice.toLocaleString("vi-VN")}đ</span>
          </p>
        </div>
      </div>
    `;
    
    // Create temporary element
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    
    // Configure html2pdf options
    const options = {
      margin: 10,
      filename: `danh-sach-mua-sam-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };
    
    // Generate PDF
    try {
      await html2pdf().set(options).from(element).save();
    } finally {
      // Clean up
      document.body.removeChild(element);
    }
  };

  const handleClearList = () => {
    setShoppingList((prev) =>
      prev.map((category) => ({
        ...category,
        items: category.items.map((item) => ({
          ...item,
          checked: false,
        })),
      }))
    );
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
                <span className="font-semibold text-accent">TP Hồ Chí Minh</span>
                <span className="text-muted-foreground">
                  • Giá cập nhật: Tháng 1/2025
                </span>
              </div>
              <p className="text-muted-foreground italic text-xs">
                Giá được thể hiện ở đây có thể có sự chênh lệch giữa các khu vực khác nhau, với mức sống khác nhau. Vui lòng kiểm tra thật kĩ. Xin cảm ơn.
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
                  <p>Tải xuống danh sách mua sắm dưới dạng file text</p>
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
                  <p>Bỏ chọn tất cả các món</p>
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
                  {category.items.map((item) => {
                    const itemPrice = calculateItemPrice(item);
                    return (
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
                            className={`flex items-baseline justify-between gap-2 ${item.checked ? "text-muted-foreground" : "text-foreground"}`}
                          >
                            <span className="font-medium">{item.name}</span>
                            <span className="font-semibold text-accent whitespace-nowrap">
                              {itemPrice.toLocaleString("vi-VN")}đ
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Input
                              type="number"
                              min="0"
                              step={item.unit === 'g' ? '10' : '1'}
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(categoryIndex, item.id, e.target.value)
                              }
                              className="w-24 h-8 text-sm"
                              data-testid={`input-quantity-${item.id}`}
                            />
                            <span className="text-sm text-muted-foreground">
                              {item.unit} • {item.displayPriceUnit}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
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
