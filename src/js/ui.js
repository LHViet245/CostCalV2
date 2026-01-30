/**
 * Quản lý Giao diện (DOM)
 */
import { formatCurrency, cleanNumber } from './utils.js';

export class UIManager {
    constructor(calculator, settingsManager) {
        this.calculator = calculator;
        this.sm = settingsManager;

        // Elements
        this.costInput = document.getElementById('cost-input');
        this.channelBtns = document.querySelectorAll('.channel-btn');
        this.discountToggle = document.getElementById('discount-toggle');
        this.resultValue = document.getElementById('result-value');
        this.profitEstimate = document.getElementById('profit-estimate');
        this.clearBtn = document.getElementById('clear-btn');

        // Settings Elements
        this.settingsBtn = document.getElementById('settings-btn');
        this.settingsModal = document.getElementById('settings-modal');
        this.closeSettings = document.getElementById('close-settings');
        this.saveSettingsBtn = document.getElementById('save-settings');
        this.resetSettingsBtn = document.getElementById('reset-settings');

        // State
        this.currentChannel = 'store';

        this.init();
    }

    init() {
        // Calculator Events
        this.costInput.addEventListener('input', (e) => {
            // Lưu vị trí con trỏ trước khi format
            let cursorPosition = e.target.selectionStart;
            let oldLength = e.target.value.length;

            let val = cleanNumber(e.target.value);
            if (val > 0) {
                const formatted = formatCurrency(val);
                e.target.value = formatted;

                // Điều chỉnh vị trí con trỏ sau khi format để không bị nhảy về cuối
                let newLength = formatted.length;
                let newPosition = cursorPosition + (newLength - oldLength);
                e.target.setSelectionRange(newPosition, newPosition);
            } else {
                e.target.value = '';
            }
            this.updateResult();
        });

        this.channelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.channelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentChannel = btn.dataset.channel;
                this.updateDiscountState();
                this.updateResult();
            });
        });

        this.discountToggle.addEventListener('change', () => {
            this.sm.save({ has_discount: this.discountToggle.checked });
            this.updateResult();
        });

        this.clearBtn.addEventListener('click', () => {
            this.costInput.value = '';
            this.updateResult();
            this.costInput.focus();
        });

        // Settings Events
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettings.addEventListener('click', () => this.closeSettingsModal());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.resetSettingsBtn.addEventListener('click', () => this.resetSettings());

        // Sync local toggle state with saved settings
        this.updateDiscountState();
    }

    updateDiscountState() {
        if (this.currentChannel === 'store') {
            this.discountToggle.checked = false;
            this.discountToggle.disabled = true;
            this.sm.save({ has_discount: false });
        } else {
            this.discountToggle.disabled = false;
            this.discountToggle.checked = this.sm.get('has_discount');
        }
    }

    updateResult() {
        const cost = cleanNumber(this.costInput.value);
        if (!cost) {
            this.resultValue.innerText = '0 đ';
            this.profitEstimate.innerText = 'Lãi dự kiến: 0 đ';
            return;
        }

        const price = this.calculator.calculateSellingPrice(cost, this.currentChannel);

        if (price === -1) {
            this.resultValue.innerText = 'HẾT LÃI!';
            this.resultValue.style.color = 'red';
            this.profitEstimate.innerText = 'Phí quá cao!';
            return;
        }

        this.resultValue.style.color = '';
        this.resultValue.innerText = formatCurrency(price) + ' đ';

        const profit = this.calculator.calculateActualProfit(price, cost, this.currentChannel);
        this.profitEstimate.innerText = `Lãi thực tế: ~${formatCurrency(profit)} đ`;
    }

    openSettings() {
        const s = this.sm.getAll();
        document.getElementById('setting-profit').value = s.profit_margin;
        document.getElementById('setting-packaging').value = s.packaging_cost;
        document.getElementById('setting-grab').value = s.fee_grab;
        document.getElementById('setting-shopee').value = s.fee_shopee;
        document.getElementById('setting-tax-risk').value = s.risk_percent + s.tax_percent;

        this.settingsModal.classList.add('active');
    }

    closeSettingsModal() {
        this.settingsModal.classList.remove('active');
    }

    saveSettings() {
        const trTotal = parseFloat(document.getElementById('setting-tax-risk').value);
        // Split back to 1.5 tax and rest risk if needed, or just simplify logic
        const newSettings = {
            profit_margin: parseFloat(document.getElementById('setting-profit').value),
            packaging_cost: parseFloat(document.getElementById('setting-packaging').value),
            fee_grab: parseFloat(document.getElementById('setting-grab').value),
            fee_shopee: parseFloat(document.getElementById('setting-shopee').value),
            tax_percent: 1.5, // keep fixed for simplicity as requested "Tax 1% + 0.5% TNCN"
            risk_percent: Math.max(0, trTotal - 1.5)
        };

        this.sm.save(newSettings);
        this.closeSettingsModal();
        this.updateResult();
    }

    resetSettings() {
        if (confirm("Khôi phục cài đặt gốc?")) {
            this.sm.reset();
            this.openSettings();
            this.discountToggle.checked = this.sm.get('has_discount');
            this.updateResult();
        }
    }
}
