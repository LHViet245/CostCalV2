import './src/css/style.css';
import { SettingsManager } from './src/js/SettingsManager.js';
import { PriceCalculator } from './src/js/PriceCalculator.js';
import { UIManager } from './src/js/ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const settingsManager = new SettingsManager();
    const calculator = new PriceCalculator(settingsManager);
    new UIManager(calculator, settingsManager);

    console.log('App initialization complete');
});
