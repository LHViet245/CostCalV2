# CostCal - Tính Giá Nhanh 🧮

Công cụ tính giá bán đa kênh (Tại quán, Grab, Shopee) siêu đơn giản, tối ưu cho người lớn tuổi.

## ✨ Tính năng nổi bật
- **Tính toán tự động:** Nhập giá vốn, chọn kênh bán -> Có ngay giá bán gợi ý.
- **Tối ưu Mobile:** Giao diện to rõ, nút bấm lớn, dùng cực tốt trên iPhone 11.
- **Công thức chuẩn:** Đã tính phí sàn, thuế (1.5%), rủi ro (5%) và mã giảm giá (20%).
- **Làm tròn thông minh:** Tự động làm tròn lên 500đ để bảo vệ lợi nhuận.
- **Cài đặt linh hoạt:** Tùy chỉnh % lãi và phí sàn ngay trong App.

## 🛠️ Hướng dẫn cài đặt
1. Cài đặt các thư viện:
   ```bash
   npm install
   ```
2. Chạy ứng dụng (Vite):
   ```bash
   npm run dev
   ```
3. Mở trình duyệt tại: `http://localhost:3000`

## 🧠 Cấu trúc dự án
- `src/js/PriceCalculator.js`: Bộ não tính toán.
- `src/js/SettingsManager.js`: Quản lý lưu trữ cài đặt.
- `src/js/ui.js`: Xử lý giao diện & logic nhập liệu.
- `.brain/`: Lưu trữ ngữ cảnh cho AI (Brain & Session).
