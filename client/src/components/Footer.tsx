import { ChefHat, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ChefHat className="h-8 w-8" />
              <span className="font-bold text-xl font-['Lexend']">Dream Makers</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Website hỗ trợ sinh viên lập thực đơn và nấu ăn tiết kiệm với công thức món Việt Nam.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Lexend']">Liên hệ</h4>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@nauansinhvien.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4 font-['Lexend']">Chính sách</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Về chúng tôi
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>© 2025 Dream Makers. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
}
