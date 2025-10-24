import { Button } from '@/components/ui/button';
import heroImage from '@assets/generated_images/Vietnamese_student_meal_hero_e30b3c8d.png';

interface HeroProps {
  onCtaClick?: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  return (
    <section className="relative h-[70vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary/70" />
      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Lexend']">
          Nấu Ăn Tiết Kiệm<br />Dành Cho Sinh Viên
        </h1>
        <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto">
          Lập thực đơn khoa học, tính toán chi phí hợp lý, và học cách nấu những món ăn ngon lành từ công thức dễ làm
        </p>
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent text-accent-foreground text-lg px-8 py-6 shadow-lg"
          onClick={onCtaClick}
          data-testid="button-cta-hero"
        >
          LÊN THỰC ĐƠN NGAY
        </Button>
      </div>
    </section>
  );
}
