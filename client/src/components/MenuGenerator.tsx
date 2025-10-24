import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function MenuGenerator() {
  const [budget, setBudget] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [diet, setDiet] = useState('');
  const [skillLevel, setSkillLevel] = useState('');

  const handleGenerateMenu = () => {
    console.log('Generating menu with:', { budget, mealsPerDay, diet, skillLevel });
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
            Tạo Thực Đơn Của Bạn
          </h2>
          <p className="text-muted-foreground text-lg">
            Điền thông tin dưới đây để nhận thực đơn phù hợp với nhu cầu của bạn
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Ngân sách (VNĐ/ngày)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Ví dụ: 50000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                data-testid="input-budget"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meals">Số bữa/ngày</Label>
              <Select value={mealsPerDay} onValueChange={setMealsPerDay}>
                <SelectTrigger id="meals" data-testid="select-meals">
                  <SelectValue placeholder="Chọn số bữa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 bữa</SelectItem>
                  <SelectItem value="2">2 bữa</SelectItem>
                  <SelectItem value="3">3 bữa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet">Chế độ ăn</Label>
              <Select value={diet} onValueChange={setDiet}>
                <SelectTrigger id="diet" data-testid="select-diet">
                  <SelectValue placeholder="Chọn chế độ ăn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Bình thường</SelectItem>
                  <SelectItem value="vegetarian">Ăn chay</SelectItem>
                  <SelectItem value="low-carb">Ít tinh bột</SelectItem>
                  <SelectItem value="high-protein">Nhiều đạm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill">Mức độ kỹ năng</Label>
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger id="skill" data-testid="select-skill">
                  <SelectValue placeholder="Chọn kỹ năng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Mới bắt đầu</SelectItem>
                  <SelectItem value="intermediate">Trung bình</SelectItem>
                  <SelectItem value="advanced">Thành thạo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            className="w-full bg-primary text-primary-foreground text-lg py-6"
            onClick={handleGenerateMenu}
            data-testid="button-generate-menu"
          >
            Tạo Thực Đơn
          </Button>
        </Card>
      </div>
    </section>
  );
}
