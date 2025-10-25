export const vietnameseIngredients = [
  // Rau củ
  { value: 'cà chua', label: 'Cà chua', category: 'Rau củ' },
  { value: 'cà rốt', label: 'Cà rốt', category: 'Rau củ' },
  { value: 'khoai tây', label: 'Khoai tây', category: 'Rau củ' },
  { value: 'bắp cải', label: 'Bắp cải', category: 'Rau củ' },
  { value: 'rau muống', label: 'Rau muống', category: 'Rau củ' },
  { value: 'rau cải', label: 'Rau cải', category: 'Rau củ' },
  { value: 'dưa chuột', label: 'Dưa chuột', category: 'Rau củ' },
  { value: 'đậu đũa', label: 'Đậu đũa', category: 'Rau củ' },
  { value: 'bí đao', label: 'Bí đao', category: 'Rau củ' },
  
  // Thịt
  { value: 'thịt heo', label: 'Thịt heo', category: 'Thịt' },
  { value: 'thịt bò', label: 'Thịt bò', category: 'Thịt' },
  { value: 'thịt gà', label: 'Thịt gà', category: 'Thịt' },
  
  // Hải sản
  { value: 'tôm', label: 'Tôm', category: 'Hải sản' },
  { value: 'cá', label: 'Cá', category: 'Hải sản' },
  { value: 'mực', label: 'Mực', category: 'Hải sản' },
  
  // Đạm thực vật
  { value: 'đậu hũ', label: 'Đậu hũ (Đậu phụ)', category: 'Đạm thực vật' },
  { value: 'trứng gà', label: 'Trứng gà', category: 'Đạm thực vật' },
  { value: 'trứng vịt', label: 'Trứng vịt', category: 'Đạm thực vật' },
  { value: 'trứng cút', label: 'Trứng cút', category: 'Đạm thực vật' },
  { value: 'đậu xanh', label: 'Đậu xanh', category: 'Đạm thực vật' },
  
  // Nấm
  { value: 'nấm rơm', label: 'Nấm rơm', category: 'Nấm' },
  { value: 'nấm hương', label: 'Nấm hương', category: 'Nấm' },
  
  // Tinh bột
  { value: 'gạo', label: 'Gạo', category: 'Tinh bột' },
  { value: 'mì', label: 'Mì', category: 'Tinh bột' },
  { value: 'bún', label: 'Bún', category: 'Tinh bột' },
  { value: 'bánh mì', label: 'Bánh mì', category: 'Tinh bột' },
  
  // Gia vị
  { value: 'hành tây', label: 'Hành tây', category: 'Gia vị' },
  { value: 'hành tím', label: 'Hành tím', category: 'Gia vị' },
  { value: 'tỏi', label: 'Tỏi', category: 'Gia vị' },
  { value: 'gừng', label: 'Gừng', category: 'Gia vị' },
  { value: 'ớt', label: 'Ớt', category: 'Gia vị' },
  { value: 'sả', label: 'Sả', category: 'Gia vị' },
];

export function searchIngredients(query: string) {
  const lowerQuery = query.toLowerCase();
  return vietnameseIngredients.filter(
    (ingredient) =>
      ingredient.label.toLowerCase().includes(lowerQuery) ||
      ingredient.value.toLowerCase().includes(lowerQuery)
  );
}
