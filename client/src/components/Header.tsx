import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Thực đơn', path: '/menu' },
    { label: 'Công thức', path: '/recipes' },
    { label: 'Mua sắm', path: '/shopping' },
    { label: 'Kiến thức', path: '/knowledge' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer">
              <ChefHat className="h-8 w-8" />
              <span className="font-bold text-xl font-['Lexend']">Nấu Ăn SV</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                <Button
                  variant="ghost"
                  className={`text-primary-foreground hover:bg-primary-foreground/10 ${
                    location === item.path ? 'bg-primary-foreground/20' : ''
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover-elevate active-elevate-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className={`block px-4 py-2 rounded-md hover-elevate active-elevate-2 ${
                    location === item.path ? 'bg-primary-foreground/20' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
