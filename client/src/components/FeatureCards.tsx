import { Card } from '@/components/ui/card';
import { Wallet, Calendar, ShoppingBag } from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Món Tiết Kiệm',
    description: 'Khám phá hàng trăm công thức với chi phí dưới 30,000đ/bữa, phù hợp với ngân sách sinh viên.',
  },
  {
    icon: Calendar,
    title: 'Thực Đơn Theo Tuần',
    description: 'Lập thực đơn cả tuần chỉ trong vài phút, cân bằng dinh dưỡng và tiết kiệm thời gian.',
  },
  {
    icon: ShoppingBag,
    title: 'Mẹo Mua Sắm',
    description: 'Danh sách nguyên liệu tối ưu, gợi ý thay thế và cách bảo quản thực phẩm lâu hơn.',
  },
];

export default function FeatureCards() {
  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-transform hover:-translate-y-1 cursor-pointer"
                data-testid={`card-feature-${index}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3 font-['Lexend']">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
