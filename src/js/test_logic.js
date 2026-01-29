import { SettingsManager } from './SettingsManager.js';
import { PriceCalculator } from './PriceCalculator.js';
import { formatCurrency } from './utils.js';

// Mock localStorage for non-browser environment if needed (though we'll test in browser eventually)
if (typeof localStorage === 'undefined') {
    global.localStorage = {
        store: {},
        getItem: (key) => global.localStorage.store[key] || null,
        setItem: (key, val) => global.localStorage.store[key] = val.toString(),
        clear: () => global.localStorage.store = {}
    };
}

const sm = new SettingsManager();
const pc = new PriceCalculator(sm);

function test() {
    console.log("--- BẮT ĐẦU TEST LOGIC ---");

    const testCost = 20000;
    console.log(`Giá vốn mẫu: ${formatCurrency(testCost)}đ`);
    console.log(`Cài đặt mặc định: Lãi ${sm.get('profit_margin')}%, Đóng gói ${formatCurrency(sm.get('packaging_cost'))}đ`);

    const channels = ['store', 'grab', 'shopee'];

    channels.forEach(channel => {
        const price = pc.calculateSellingPrice(testCost, channel);
        const profit = pc.calculateActualProfit(price, testCost, channel);
        console.log(`\n[Kênh: ${channel.toUpperCase()}]`);
        console.log(`-> Giá bán gợi ý: ${formatCurrency(price)}đ`);
        console.log(`-> Lãi thực tế: ~${formatCurrency(profit)}đ`);
    });

    console.log("\n--- KẾT THÚC TEST ---");
}

test();
