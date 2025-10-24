import { useState } from 'react';
import { useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeFilter from '@/components/RecipeFilter';
import RecipeCard from '@/components/RecipeCard';

import eggTomatoImage from '@assets/generated_images/Scrambled_eggs_with_tomatoes_21887b7f.png';
import morningGloryImage from '@assets/generated_images/Stir-fried_morning_glory_b8c1df15.png';
import friedRiceImage from '@assets/generated_images/Vietnamese_fried_rice_170f31d9.png';
import noodlesImage from '@assets/generated_images/Upgraded_instant_noodles_75cdd539.png';
import porridgeImage from '@assets/generated_images/Chicken_rice_porridge_19a95b8b.png';

export default function Recipes() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [mealTypeFilter, setMealTypeFilter] = useState('all');

  const allRecipes = [
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
    {
      id: 5,
      name: 'Cháo gà',
      image: porridgeImage,
      price: 25000,
      cookTime: 30,
      servings: 2,
      rating: 4.8,
      mealType: 'Bữa sáng',
    },
    {
      id: 6,
      name: 'Trứng luộc rau củ',
      image: eggTomatoImage,
      price: 10000,
      cookTime: 8,
      servings: 1,
      rating: 4.5,
      mealType: 'Bữa sáng',
    },
  ];

  const filteredRecipes = allRecipes.filter((recipe) => {
    if (searchQuery && !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 bg-background">
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
      </main>
      <Footer />
    </div>
  );
}
