/**
 * Bộ não tính toán giá bán
 */
export class PriceCalculator {
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }

    /**
     * Tính giá bán gợi ý
     * @param {number} costPrice - Giá vốn nhập vào
     * @param {string} channel - 'store' | 'grab' | 'shopee'
     */
    calculateSellingPrice(costPrice, channel) {
        if (!costPrice || costPrice <= 0) return 0;

        const s = this.settingsManager.getAll();

        // 1. Xác định phí sàn theo kênh
        let channelFee = 0;
        if (channel === 'grab') channelFee = s.fee_grab;
        else if (channel === 'shopee') channelFee = s.fee_shopee;

        // 2. Tổng % trích từ doanh thu (Phí + Thuế + Rủi ro + Khuyến mãi + Ads)
        const discount = s.has_discount ? s.discount_percent : 0;
        const totalFeePercent = (channelFee + s.risk_percent + s.tax_gtgt_percent + s.tax_tncn_percent + discount + s.ads_fee) / 100;

        // Nếu phí > 100% thì không thể tính (lỗ chắc chắn)
        if (totalFeePercent >= 1) return null;

        // 3. Số tiền cần thu về (Giá vốn + Phí đóng gói + Lãi mong muốn)
        const profitAmount = costPrice * (s.profit_margin / 100);
        const requiredRevenue = costPrice + s.packaging_cost + profitAmount;

        // 4. Tính giá bán theo công thức chia ngược
        let sellingPrice = requiredRevenue / (1 - totalFeePercent);

        // 5. Làm tròn lên bội số 500đ
        return this.roundUp(sellingPrice, 500);
    }

    /**
     * Tính toán số lãi thực tế thu về (dùng để hiển thị thông tin thêm)
     */
    calculateActualProfit(sellingPrice, costPrice, channel) {
        if (!sellingPrice || !costPrice) return 0;

        const s = this.settingsManager.getAll();
        let channelFee = 0;
        if (channel === 'grab') channelFee = s.fee_grab;
        else if (channel === 'shopee') channelFee = s.fee_shopee;

        const discount = s.has_discount ? s.discount_percent : 0;
        const feesAmount = sellingPrice * ((channelFee + s.risk_percent + s.tax_gtgt_percent + s.tax_tncn_percent + discount + s.ads_fee) / 100);

        return sellingPrice - feesAmount - costPrice - s.packaging_cost;
    }

    /**
     * Làm tròn lên theo step
     */
    roundUp(num, step) {
        return Math.ceil(num / step) * step;
    }
}
