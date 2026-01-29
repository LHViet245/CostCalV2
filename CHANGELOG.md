# Changelog

## [1.0.0] - 2026-01-29
### Added
- Khởi tạo dự án với Vite + Vanilla JS.
- Module `PriceCalculator` xử lý công thức giá đa kênh.
- Module `SettingsManager` lưu cài đặt vào LocalStorage.
- Giao diện Calculator tối ưu cho người lớn tuổi (iPhone 11).
- Tính năng làm tròn lên 500đ.
- Phân tách logic: Tại quán, Grab, Shopee.

### Fixed
- Lỗi không nhập được số > 10.000đ do dấu chấm hàng nghìn trong định dạng Tiếng Việt.
- Lỗi nhảy con trỏ khi đang gõ số trong ô input.

### Verified
- Test logic qua Node.js console.
- Test UI qua Browser Subagent (Screenshots: main ui, 100k calc, settings).
