# Phase 02: UI Update
Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Update the Settings Modal layout to show three separate input fields for taxes and risk.

## Requirements
### Functional
- [x] Remove the single "Rủi ro & Thuế" input.
- [x] Add Input for "Thuế GTGT (%)" (step 0.1).
- [x] Add Input for "Thuế TNCN (%)" (step 0.1).
- [x] Add Input for "Dự phòng Rủi ro (%)" (step 0.1).
- [x] populate these inputs with values from `SettingsManager`. <!-- id: 13 -->

## Implementation Steps
1. [x] Modify `index.html` to replace the old input group with 3 new groups. <!-- id: 14 -->
2. [x] Update `src/js/ui.js` `openSettings()` to load values into 3 inputs. <!-- id: 15 -->
3. [x] Update `src/js/ui.js` `saveSettings()` to read values from 3 inputs. <!-- id: 16 -->

## Files to Create/Modify
- `index.html` - HTML structure.
- `src/js/ui.js` - DOM binding.

## Test Criteria
- [ ] Open Settings modal shows 3 fields.
- [ ] Default values are displayed correctly.
