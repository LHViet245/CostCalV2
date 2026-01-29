/**
 * Định dạng tiền tệ VNĐ (VD: 100.000)
 */
export function formatCurrency(value) {
    if (isNaN(value)) return '0';
    return new Intl.NumberFormat('vi-VN').format(Math.round(value));
}

/**
 * Làm sạch chuỗi số (xóa dấu chấm hàng nghìn, ký tự lạ) để tính toán
 * Trong tiếng Việt, 10.000 (chấm) là hàng nghìn, nên phải xóa dấu chấm đi.
 */
export function cleanNumber(str) {
    if (!str) return 0;
    // Xóa tất cả dấu chấm (hàng nghìn) và các ký tự không phải số
    return parseFloat(str.toString().replace(/\./g, "").replace(/[^0-9.-]+/g, ""));
}

/**
 * Debounce function để tránh tính toán quá liên tục khi gõ phím
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
