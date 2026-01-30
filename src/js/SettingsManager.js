/**
 * Quản lý cài đặt ứng dụng (Lưu vào LocalStorage)
 */
export class SettingsManager {
    constructor() {
        this.storageKey = 'pricing_settings';
        this.defaults = {
            profit_margin: 30,      // % Lãi trên giá vốn
            packaging_cost: 5000,   // VNĐ
            risk_percent: 5,        // % Rủi ro
            tax_gtgt_percent: 1,    // % Thuế GTGT
            tax_tncn_percent: 0.5,  // % Thuế TNCN
            fee_grab: 25,           // % Phí Grab
            fee_shopee: 15,         // % Phí Shopee
            has_discount: true,     // Mặc định có mã giảm giá
            discount_percent: 20,   // % Giảm giá
            ads_fee: 0              // % Phí quảng cáo
        };
        this.settings = this.load();
    }

    /**
     * Tải cài đặt từ LocalStorage hoặc dùng mặc định
     */
    load() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                return { ...this.defaults, ...JSON.parse(saved) };
            } catch (e) {
                console.error("Lỗi đọc cài đặt:", e);
                return { ...this.defaults };
            }
        }
        return { ...this.defaults };
    }

    /**
     * Lưu cài đặt mới
     */
    save(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    }

    /**
     * Reset về mặc định
     */
    reset() {
        this.settings = { ...this.defaults };
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    }

    get(key) {
        return this.settings[key];
    }

    getAll() {
        return this.settings;
    }
}
