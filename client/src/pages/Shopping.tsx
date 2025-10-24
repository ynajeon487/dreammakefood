import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Trash2 } from 'lucide-react';

export default function Shopping() {
  const shoppingList = [
    {
      category: 'Rau củ',
      items: [
        { id: 1, name: 'Cà chua', amount: '4 quả', checked: false },
        { id: 2, name: 'Rau muống', amount: '300g', checked: false },
        { id: 3, name: 'Hành lá', amount: '2 cây', checked: true },
      ],
    },
    {
      category: 'Protein',
      items: [
        { id: 4, name: 'Trứng gà', amount: '10 quả', checked: false },
        { id: 5, name: 'Thịt gà', amount: '200g', checked: false },
      ],
    },
    {
      category: 'Khác',
      items: [
        { id: 6, name: 'Gạo', amount: '1kg', checked: true },
        { id: 7, name: 'Dầu ăn', amount: '1 chai', checked: false },
      ],
    },
  ];

  const handleDownload = () => {
    console.log('Downloading shopping list');
  };

  const handleClearList = () => {
    console.log('Clearing shopping list');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-['Lexend']">
              Danh Sách Mua Sắm
            </h1>
            <p className="text-muted-foreground text-lg">
              Danh sách nguyên liệu cần mua từ thực đơn đã lập
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <Button onClick={handleDownload} data-testid="button-download-list">
              <Download className="h-4 w-4 mr-2" />
              Tải danh sách
            </Button>
            <Button variant="outline" onClick={handleClearList} data-testid="button-clear-list">
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa danh sách
            </Button>
          </div>

          <div className="space-y-6">
            {shoppingList.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6" data-testid={`category-${categoryIndex}`}>
                <h3 className="text-xl font-semibold text-primary mb-4 font-['Lexend']">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3" data-testid={`item-${item.id}`}>
                      <Checkbox 
                        defaultChecked={item.checked}
                        data-testid={`checkbox-item-${item.id}`}
                      />
                      <span className={`flex-1 ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.name} - {item.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {shoppingList.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg">
                Danh sách mua sắm trống. Hãy tạo thực đơn để bắt đầu!
              </p>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
