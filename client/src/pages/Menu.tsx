import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, UtensilsCrossed, ShoppingBasket } from 'lucide-react';
import { Link } from 'wouter';

export default function Menu() {
  return (
    <section className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3 font-['Lexend']">
            Tạo Thực Đơn
          </h1>
          <p className="text-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
            Chọn loại thực đơn bạn muốn tạo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 hover-elevate transition-all cursor-pointer group h-full">
            <Link href="/menu/by-day">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-primary mb-2 font-['Lexend']">
                    Theo Ngày
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Tạo thực đơn đầy đủ cho cả ngày với nhiều bữa ăn
                  </p>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Lập kế hoạch cho 1-3 bữa/ngày</li>
                    <li>• Phân bổ ngân sách hợp lý</li>
                    <li>• Cân bằng dinh dưỡng</li>
                  </ul>
                </div>
                <Button 
                  className="w-full mt-6"
                  data-testid="button-menu-by-day"
                >
                  Bắt đầu
                </Button>
              </div>
            </Link>
          </Card>

          <Card className="p-8 hover-elevate transition-all cursor-pointer group h-full">
            <Link href="/menu/by-meal">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors mb-4">
                  <UtensilsCrossed className="h-10 w-10 text-accent" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-accent mb-2 font-['Lexend']">
                    Theo Bữa Ăn Lẻ
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Tạo công thức cho 1 món ăn cụ thể
                  </p>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Hướng dẫn nấu chi tiết</li>
                    <li>• Tính toán cho nhiều người</li>
                    <li>• Gợi ý hoặc tùy chọn món</li>
                  </ul>
                </div>
                <Button 
                  className="w-full mt-6 bg-accent hover:bg-accent/90"
                  data-testid="button-menu-by-meal"
                >
                  Bắt đầu
                </Button>
              </div>
            </Link>
          </Card>

          <Card className="p-8 hover-elevate transition-all cursor-pointer group h-full">
            <Link href="/menu/by-ingredients">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors mb-4">
                  <ShoppingBasket className="h-10 w-10 text-secondary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-secondary mb-2 font-['Lexend']">
                    Đã Có Nguyên Liệu?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Gợi ý món từ nguyên liệu sẵn có
                  </p>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Chọn nguyên liệu có sẵn</li>
                    <li>• Tối ưu ngân sách</li>
                    <li>• Tránh lãng phí thực phẩm</li>
                  </ul>
                </div>
                <Button 
                  className="w-full mt-6 bg-secondary hover:bg-secondary/90"
                  data-testid="button-menu-by-ingredients"
                >
                  Bắt đầu
                </Button>
              </div>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
