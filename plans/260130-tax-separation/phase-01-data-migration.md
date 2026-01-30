# Phase 01: Data Migration
Status: ⬜ Pending
Dependencies: None

## Objective
Migrate the `SettingsManager` to support split tax fields (VAT, TNCN) and Risk, while maintaining backward compatibility or resetting defaults.

## Requirements
### Functional
- [x] Remove `tax_percent` from defaults.
- [x] Add `tax_gtgt_percent` (1.0%) to defaults.
- [x] Add `tax_tncn_percent` (0.5%) to defaults.
- [x] Ensure `risk_percent` default is 5.0%.
- [x] In `load()`, migrating legacy `tax_percent` is optional. <!-- id: 10 -->

## Implementation Steps
1. [x] Update `defaults` object in `src/js/SettingsManager.js`. <!-- id: 11 -->
2. [x] Update `save()` method if necessary. <!-- id: 12 -->

## Files to Create/Modify
- `src/js/SettingsManager.js` - Update defaults.

## Test Criteria
- [ ] `SettingsManager.getAll()` returns new keys.
- [ ] Values match defaults (gtgt=1, tncn=0.5, risk=5).
