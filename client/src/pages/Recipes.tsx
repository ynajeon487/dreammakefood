import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Footer from '@/components/Footer';
import RecipeFilter from '@/components/RecipeFilter';
import RecipeCard from '@/components/RecipeCard';
import { recipesData } from '@shared/recipes';
import { getRecipeImage } from '@/lib/recipeImages';
import { motion, useReducedMotion } from 'framer-motion';
import AutoDismissBanner from '@/components/AutoDismissBanner';

export default function Recipes() {
  const [location, setLocation] = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  const allRecipes = recipesData.map((recipe) => ({
    ...recipe,
    image: getRecipeImage(recipe.image),
  }));

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <>
      <AutoDismissBanner />
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Công Thức Món Ăn
            </h1>
            <p className="text-muted-foreground text-lg">
              Khám phá hàng trăm công thức nấu ăn tiết kiệm và dễ làm
            </p>
          </motion.div>

          <RecipeFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priceFilter={priceFilter}
            onPriceChange={setPriceFilter}
            timeFilter={timeFilter}
            onTimeChange={setTimeFilter}
            mealTypeFilter={mealTypeFilter}
            onMealTypeChange={setMealTypeFilter}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
                index={index}
                onClick={() => setLocation(`/recipes/${recipe.id}`)}
              />
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Không tìm thấy công thức phù hợp. Thử thay đổi bộ lọc!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
