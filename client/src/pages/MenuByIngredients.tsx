import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, AlertCircle, Search, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { parseMarkdown } from '@/lib/markdown';
import { vietnameseIngredients, searchIngredients } from '@/lib/ingredients';
import { Badge } from '@/components/ui/badge';

export default function MenuByIngredients() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [servings, setServings] = useState('');
  const [budget, setBudget] = useState('');
  const [diet, setDiet] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [errors, setErrors] = useState({
    ingredients: false,
    servings: false,
    budget: false,
    diet: false,
    skillLevel: false,
  });
  const { toast } = useToast();

  const filteredIngredients = searchQuery
    ? searchIngredients(searchQuery)
    : vietnameseIngredients;

  const toggleIngredient = (value: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setErrors((prev) => ({ ...prev, ingredients: false }));
  };

  const removeIngredient = (value: string) => {
    setSelectedIngredients((prev) => prev.filter((item) => item !== value));
  };

  const handleGenerateRecipe = async () => {
    const newErrors = {
      ingredients: selectedIngredients.length === 0,
      servings: !servings || servings.trim() === '',
      budget: !budget || budget.trim() === '',
      diet: !diet,
      skillLevel: !skillLevel,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      toast({
        title: 'Chưa thể tạo món ăn',
        description: 'Hãy cung cấp thêm thông tin bạn nhé!',
        variant: 'destructive',
        duration: 2000,
      });
      return;
    }

    setIsLoading(true);
    setGeneratedRecipe('');

    try {
      const response = await fetch('/api/menu/generate-from-ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          servings,
          budget,
          diet,
          skillLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const data = await response.json();
      setGeneratedRecipe(data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setGeneratedRecipe(
        'Xin lỗi, đã có lỗi xảy ra khi tạo công thức. Vui lòng thử lại sau.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const groupedIngredients = vietnameseIngredients.reduce((acc, ingredient) => {
    const category = ingredient.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {} as Record<string, typeof vietnameseIngredients>);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 font-['Lexend']">
            Món Ăn Từ Nguyên Liệu Có Sẵn
          </h2>
          <p className="text-muted-foreground text-lg">
            Chọn nguyên liệu bạn đã có, chúng tôi sẽ gợi ý món ăn phù hợp
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="ingredients"
                className={errors.ingredients ? 'text-destructive' : ''}
              >
                Nguyên liệu đã có <span className="text-destructive">*</span>
              </Label>
              
              {selectedIngredients.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-md">
                  {selectedIngredients.map((value) => {
                    const ingredient = vietnameseIngredients.find(
                      (i) => i.value === value
                    );
                    return (
                      <Badge
                        key={value}
                        variant="secondary"
                        className="pl-3 pr-1"
                      >
                        {ingredient?.label}
                        <button
                          type="button"
                          onClick={() => removeIngredient(value)}
                          className="ml-1 rounded-sm hover:bg-secondary-foreground/20 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}

              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="ingredients"
                  type="text"
                  placeholder="Tìm kiếm nguyên liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-ingredients"
                />
              </div>

              <div className="max-h-80 overflow-y-auto border rounded-md p-4 space-y-4">
                {Object.entries(groupedIngredients).map(([category, items]) => {
                  const filteredItems = searchQuery
                    ? items.filter((item) =>
                        item.label.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    : items;

                  if (filteredItems.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {filteredItems.map((ingredient) => (
                          <div
                            key={ingredient.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={ingredient.value}
                              checked={selectedIngredients.includes(
                                ingredient.value
                              )}
                              onCheckedChange={() =>
                                toggleIngredient(ingredient.value)
                              }
                              data-testid={`checkbox-${ingredient.value}`}
                            />
                            <label
                              htmlFor={ingredient.value}
                              className="text-sm cursor-pointer"
                            >
                              {ingredient.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {errors.ingredients && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Vui lòng chọn ít nhất 1 nguyên liệu
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="servings" className={errors.servings ? 'text-destructive' : ''}>
                  Số người <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="servings"
                  type="number"
                  placeholder="Ví dụ: 2"
                  value={servings}
                  onChange={(e) => {
                    setServings(e.target.value);
                    setErrors((prev) => ({ ...prev, servings: false }));
                  }}
                  className={
                    errors.servings
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }
                  data-testid="input-servings"
                />
                {errors.servings && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Vui lòng nhập số người
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className={errors.budget ? 'text-destructive' : ''}>
                  Ngân sách thêm (VNĐ) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Ví dụ: 20000"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                    setErrors((prev) => ({ ...prev, budget: false }));
                  }}
                  className={
                    errors.budget
                      ? 'border-destructive focus-visible:ring-destructive'
                      : ''
                  }
                  data-testid="input-budget"
                />
                <p className="text-xs text-muted-foreground">
                  Ngân sách có thể chi trả nếu thiếu nguyên liệu
                </p>
                {errors.budget && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Vui lòng nhập ngân sách
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="diet" className={errors.diet ? 'text-destructive' : ''}>
                  Chế độ ăn <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={diet}
                  onValueChange={(value) => {
                    setDiet(value);
                    setErrors((prev) => ({ ...prev, diet: false }));
                  }}
                >
                  <SelectTrigger
                    id="diet"
                    className={
                      errors.diet ? 'border-destructive focus:ring-destructive' : ''
                    }
                    data-testid="select-diet"
                  >
                    <SelectValue placeholder="Chọn chế độ ăn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Bình thường</SelectItem>
                    <SelectItem value="vegetarian">Ăn chay</SelectItem>
                    <SelectItem value="low-carb">Ít tinh bột</SelectItem>
                    <SelectItem value="high-protein">Nhiều đạm</SelectItem>
                  </SelectContent>
                </Select>
                {errors.diet && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Vui lòng chọn chế độ ăn
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="skill"
                  className={errors.skillLevel ? 'text-destructive' : ''}
                >
                  Mức độ kỹ năng <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={skillLevel}
                  onValueChange={(value) => {
                    setSkillLevel(value);
                    setErrors((prev) => ({ ...prev, skillLevel: false }));
                  }}
                >
                  <SelectTrigger
                    id="skill"
                    className={
                      errors.skillLevel
                        ? 'border-destructive focus:ring-destructive'
                        : ''
                    }
                    data-testid="select-skill"
                  >
                    <SelectValue placeholder="Chọn kỹ năng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Mới bắt đầu</SelectItem>
                    <SelectItem value="intermediate">Trung bình</SelectItem>
                    <SelectItem value="advanced">Thành thạo</SelectItem>
                  </SelectContent>
                </Select>
                {errors.skillLevel && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Vui lòng chọn kỹ năng
                  </p>
                )}
              </div>
            </div>

            <Button
              className="w-full bg-secondary text-secondary-foreground text-lg py-6"
              onClick={handleGenerateRecipe}
              disabled={isLoading}
              data-testid="button-generate-recipe"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang tạo công thức...
                </>
              ) : (
                'Gợi Ý Món Ăn'
              )}
            </Button>
          </div>
        </Card>

        {generatedRecipe && (
          <Card className="p-6 md:p-8 mt-8">
            <h3 className="text-2xl font-bold text-secondary mb-4 font-['Lexend']">
              Món Ăn Gợi Ý
            </h3>
            <div className="prose prose-sm max-w-none">
              <div
                className="text-foreground leading-relaxed markdown-content"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(generatedRecipe) }}
              />
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}
