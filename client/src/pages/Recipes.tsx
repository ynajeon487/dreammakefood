import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Footer from '@/components/Footer';
import RecipeFilter from '@/components/RecipeFilter';
import RecipeCard from '@/components/RecipeCard';
import { recipesData } from '@shared/recipes';

import eggTomatoImage from '@assets/generated_images/Scrambled_eggs_with_tomatoes_21887b7f.png';
import morningGloryImage from '@assets/generated_images/Stir-fried_morning_glory_b8c1df15.png';
import friedRiceImage from '@assets/generated_images/Vietnamese_fried_rice_170f31d9.png';
import noodlesImage from '@assets/generated_images/Upgraded_instant_noodles_75cdd539.png';
import porridgeImage from '@assets/generated_images/Chicken_rice_porridge_19a95b8b.png';
import braisedPorkImage from '@assets/generated_images/Vietnamese_braised_pork_with_eggs_7b5f6288.png';
import sourFishSoupImage from '@assets/generated_images/Vietnamese_sour_fish_soup_1d225652.png';
import tofuTomatoImage from '@assets/generated_images/Vietnamese_tofu_tomato_sauce_8ef66d72.png';

export default function Recipes() {
  const [location, setLocation] = useLocation();
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

  const recipeImages = [
    eggTomatoImage,
    morningGloryImage,
    friedRiceImage,
    noodlesImage,
    porridgeImage,
    braisedPorkImage,
    sourFishSoupImage,
    tofuTomatoImage,
  ];

  const allRecipes = recipesData.map((recipe, index) => ({
    ...recipe,
    image: recipeImages[index],
  }));

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Công Thức Món Ăn
            </h1>
            <p className="text-muted-foreground text-lg">
              Khám phá hàng trăm công thức nấu ăn tiết kiệm và dễ làm
            </p>
          </div>

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
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                {...recipe}
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
