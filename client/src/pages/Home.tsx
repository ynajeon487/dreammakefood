import { useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import RecipeCard from '@/components/RecipeCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

import eggTomatoImage from '@assets/generated_images/Scrambled_eggs_with_tomatoes_21887b7f.png';
import morningGloryImage from '@assets/generated_images/Stir-fried_morning_glory_b8c1df15.png';
import friedRiceImage from '@assets/generated_images/Vietnamese_fried_rice_170f31d9.png';
import noodlesImage from '@assets/generated_images/Upgraded_instant_noodles_75cdd539.png';

export default function Home() {
  const [, setLocation] = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('testingBannerDismissed');
    if (bannerDismissed === 'true') {
      setShowBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('testingBannerDismissed', 'true');
  };

  const featuredRecipes = [
    {
      id: 1,
      name: 'Trứng chiên cà chua',
      image: eggTomatoImage,
      price: 15000,
      cookTime: 15,
      servings: 1,
      rating: 4.8,
      mealType: 'Bữa sáng',
    },
    {
      id: 2,
      name: 'Rau muống xào tỏi',
      image: morningGloryImage,
      price: 12000,
      cookTime: 10,
      servings: 2,
      rating: 4.6,
      mealType: 'Bữa trưa',
    },
    {
      id: 3,
      name: 'Cơm chiên trứng',
      image: friedRiceImage,
      price: 20000,
      cookTime: 20,
      servings: 1,
      rating: 4.9,
      mealType: 'Bữa tối',
    },
    {
      id: 4,
      name: 'Mì tôm nâng cấp',
      image: noodlesImage,
      price: 18000,
      cookTime: 12,
      servings: 1,
      rating: 4.7,
      mealType: 'Ăn vặt',
    },
  ];

  return (
    <>
      {showBanner && (
        <motion.div
          className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
          data-testid="banner-testing-warning"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 font-medium">
                  Trang web đang trong quá trình thử nghiệm.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismissBanner}
                className="h-8 w-8 hover:bg-yellow-100 dark:hover:bg-yellow-900/40"
                data-testid="button-dismiss-banner"
              >
                <X className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      <Hero onCtaClick={() => setLocation('/menu')} />
      <FeatureCards />
      
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Món Ăn Nổi Bật
            </h2>
            <p className="text-muted-foreground text-lg">
              Những công thức phổ biến và được yêu thích nhất
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                index={index}
                onClick={() => setLocation(`/recipes/${recipe.id}`)}
              />
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-10"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setLocation('/recipes')}
              data-testid="button-view-all-recipes"
            >
              Xem Tất Cả Công Thức
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
