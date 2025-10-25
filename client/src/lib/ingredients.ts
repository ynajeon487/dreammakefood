export const vietnameseIngredients = [
  // Rau củ (9 loại)
  { value: 'cà chua', label: 'Cà chua', category: 'Rau củ' },
  { value: 'cà rốt', label: 'Cà rốt', category: 'Rau củ' },
  { value: 'khoai tây', label: 'Khoai tây', category: 'Rau củ' },
  { value: 'bắp cải', label: 'Bắp cải', category: 'Rau củ' },
  { value: 'rau muống', label: 'Rau muống', category: 'Rau củ' },
  { value: 'rau cải', label: 'Rau cải', category: 'Rau củ' },
  { value: 'dưa chuột', label: 'Dưa chuột', category: 'Rau củ' },
  { value: 'đậu đũa', label: 'Đậu đũa', category: 'Rau củ' },
  { value: 'bí đao', label: 'Bí đao', category: 'Rau củ' },
  
  // Thịt heo (9 loại chi tiết)
  { value: 'ba rọi', label: 'Ba rọi', category: 'Thịt' },
  { value: 'sườn non', label: 'Sườn non', category: 'Thịt' },
  { value: 'bắp chân giò', label: 'Bắp, chân giò', category: 'Thịt' },
  { value: 'xương có thịt', label: 'Xương (có thịt)', category: 'Thịt' },
  { value: 'thịt xay', label: 'Thịt xay', category: 'Thịt' },
  { value: 'cốt lết', label: 'Cốt lết', category: 'Thịt' },
  { value: 'thịt đùi heo', label: 'Thịt đùi heo', category: 'Thịt' },
  { value: 'nạc heo', label: 'Nạc heo', category: 'Thịt' },
  { value: 'nạc thăn', label: 'Nạc thăn', category: 'Thịt' },
  
  // Thịt bò (3 loại chi tiết)
  { value: 'thăn bò', label: 'Thăn bò', category: 'Thịt' },
  { value: 'ba chỉ bò', label: 'Ba chỉ bò', category: 'Thịt' },
  { value: 'đùi bò', label: 'Đùi bò', category: 'Thịt' },
  
  // Thịt gà (4 loại chi tiết)
  { value: 'má đùi', label: 'Má đùi gà', category: 'Thịt' },
  { value: 'đùi gà', label: 'Đùi gà', category: 'Thịt' },
  { value: 'ức gà', label: 'Ức gà', category: 'Thịt' },
  { value: 'xương gà', label: 'Xương gà', category: 'Thịt' },
  
  // Hải sản - Tôm (3 loại chi tiết)
  { value: 'tôm sú', label: 'Tôm sú', category: 'Hải sản' },
  { value: 'tôm thẻ', label: 'Tôm thẻ', category: 'Hải sản' },
  { value: 'tôm he', label: 'Tôm he', category: 'Hải sản' },
  
  // Hải sản - Cá (6 loại chi tiết)
  { value: 'cá rô phi', label: 'Cá rô phi', category: 'Hải sản' },
  { value: 'cá diêu hồng', label: 'Cá diêu hồng', category: 'Hải sản' },
  { value: 'cá lóc', label: 'Cá lóc', category: 'Hải sản' },
  { value: 'cá thu', label: 'Cá thu', category: 'Hải sản' },
  { value: 'cá nục', label: 'Cá nục', category: 'Hải sản' },
  { value: 'cá sòng', label: 'Cá sòng', category: 'Hải sản' },
  
  // Hải sản - Khác
  { value: 'mực', label: 'Mực', category: 'Hải sản' },
  
  // Đạm thực vật (5 loại)
  { value: 'đậu hũ', label: 'Đậu hũ (Đậu phụ)', category: 'Đạm thực vật' },
  { value: 'trứng gà', label: 'Trứng gà', category: 'Đạm thực vật' },
  { value: 'trứng vịt', label: 'Trứng vịt', category: 'Đạm thực vật' },
  { value: 'trứng cút', label: 'Trứng cút', category: 'Đạm thực vật' },
  { value: 'đậu xanh', label: 'Đậu xanh', category: 'Đạm thực vật' },
  
  // Nấm (2 loại)
  { value: 'nấm rơm', label: 'Nấm rơm', category: 'Nấm' },
  { value: 'nấm hương', label: 'Nấm hương', category: 'Nấm' },
  
  // Tinh bột (4 loại)
  { value: 'gạo', label: 'Gạo', category: 'Tinh bột' },
  { value: 'mì', label: 'Mì', category: 'Tinh bột' },
  { value: 'bún', label: 'Bún', category: 'Tinh bột' },
  { value: 'bánh mì', label: 'Bánh mì', category: 'Tinh bột' },
  
  // Gia vị (6 loại)
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
