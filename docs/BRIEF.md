# 💡 BRIEF: CostCal - Tách Biệt Thuế & Rủi Ro

**Ngày tạo:** 2026-01-30
**Trạng thái:** Đề xuất

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
- Hiện tại, **Thuế (1.5%)** và **Rủi ro (5%)** đang được gộp chung trong 1 ô nhập liệu ở phần Cài đặt.
- Người dùng muốn tách rõ ràng:
  1.  **Thuế TNCN** (Thu nhập cá nhân)
  2.  **Thuế GTGT** (Giá trị gia tăng)
  3.  **Rủi ro** (Hàng hoàn, bom hàng...)
- Lý do: Minh bạch hóa các khoản phí và dễ dàng điều chỉnh khi chính sách thuế thay đổi.

## 2. GIẢI PHÁP ĐỀ XUẤT
### Thay đổi Data (SettingsManager):
- Xóa `tax_percent` (gộp).
- Thêm `tax_tncn_percent` (Mặc định 0.5%).
- Thêm `tax_gtgt_percent` (Mặc định 1.0%).
- Giữ `risk_percent` (Mặc định 5.0%).

### Thay đổi UI Cài Đặt:
- Thay ô "Rủi ro & Thuế" thành 3 ô riêng biệt:
  1.  [Input] Thuế GTGT (%)
  2.  [Input] Thuế TNCN (%)
  3.  [Input] Dự phòng rủi ro (%)

### Thay đổi Logic Tính Giá:
- `Tổng phí = Phí Sàn + (TNCN + GTGT + Rủi ro) + Khác`

## 3. ƯỚC TÍNH
- **Độ phức tạp:** Thấp (Chủ yếu là UI & Config update).
- **Rủi ro:** Không có rủi ro lớn. Cần migrate dữ liệu cũ nếu user đã dùng app (nhưng hiện tại là local app nên có thể reset settings).

## 4. BƯỚC TIẾP THEO
→ Chạy `/plan` để thực hiện thay đổi.
