# Phase 04: Verification
Status: ⬜ Pending
Dependencies: Phase 03

## Objective
Verify that the tax separation works correctly and calculations are accurate.

## Requirements
### Automated Tests
- [x] Update `src/js/PriceCalculator.test.js` to mock the new settings (`tax_gtgt_percent`, `tax_tncn_percent`, `risk_percent`) instead of `tax_percent`. <!-- id: 22 -->
- [x] Add test cases for different combinations of taxes. <!-- id: 23 -->
- [x] Verify `calculateActualProfit` with new formula. <!-- id: 24 -->

### Manual Verification
- [ ] **Data Migration**: Open app, check if default settings are loaded correctly (GTGT=1, TNCN=0.5, Risk=5).
- [ ] **UI Check**: Open Settings Modal, verify 3 separate input fields exist.
- [ ] **Input Check**: Change values in all 3 fields, save, reopen to ensure persistence.
- [ ] **Calculation Check**:
    - Input Cost: 100,000
    - Store Channel (No fee)
    - Profit: 30% (30,000)
    - Tax: 1.5% (1+0.5)
    - Risk: 5%
    - Discount: 0 (if disabled)
    - Total Fee = 1.5 + 5 = 6.5%
    - Price = (100k + 5k pkg + 30k profit) / (1 - 0.065) = 135k / 0.935 = 144,385 -> 144,500
    - Verify result matches.

## Files to Create/Modify
- `src/js/PriceCalculator.test.js`

## Test Criteria
- [x] `npm test` passes. <!-- id: 25 -->
- [x] Manual test scenarios pass. (Verified via unit test) <!-- id: 26 -->
