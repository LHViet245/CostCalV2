# Phase 03: Logic Implementation
Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Update the `PriceCalculator` to use the new tax fields in the formula.

## Requirements
### Functional
- [x] Update `calculateSellingPrice` to sum `risk_percent`, `tax_gtgt_percent`, `tax_tncn_percent`. <!-- id: 19 -->
- [x] Update `calculateActualProfit` to use the same sum. <!-- id: 20 -->
- [x] Formula: `TotalFee% = ChannelFee + Risk + VAT + TNCN + Discount + Ads`. <!-- id: 21 -->

## Implementation Steps
1. [x] Modify `src/js/PriceCalculator.js`. <!-- id: 17 -->
2. [x] Replace `s.tax_percent` with `s.tax_gtgt_percent + s.tax_tncn_percent`. <!-- id: 18 -->

## Files to Create/Modify
- `src/js/PriceCalculator.js`

## Test Criteria
- [ ] Calculation results match expected values with the split taxes.
