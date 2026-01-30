# FEATURE SPEC: Tax Separation

**Date:** 2026-01-30
**Status:** In Progress
**Plan:** `plans/260130-tax-separation/`

## 1. Executive Summary
Split the current "Tax & Risk" setting into three separate configurable fields: VAT (GTGT), Personal Income Tax (TNCN), and Risk Provision. This allows for more granular control and better transparency in cost calculation.

## 2. User Stories
- As a user, I want to see separate fields for VAT and Personal Income Tax so I can adjust them independently.
- As a user, I want to set a specific percentage for Risk Provision to cover returns or lost goods.
- As a user, I want the selling price calculation to include all these fees automatically.

## 3. Database Design (LocalStorage)
**Old Scale:**
```json
{
  "risk_percent": 5,
  "tax_percent": 1.5
}
```

**New Scale:**
```json
{
  "risk_percent": 5,
  "tax_gtgt_percent": 1.0,
  "tax_tncn_percent": 0.5
}
```

## 4. UI Changes
- **Settings Modal**:
    - Remove "Rủi ro & Thuế (%)" input row.
    - Add row: "Thuế GTGT (%)" (Default 1.0)
    - Add row: "Thuế TNCN (%)" (Default 0.5)
    - Add row: "Dự phòng rủi ro (%)" (Default 5.0)

## 5. Logic
**Formula:**
`TotalFee% = ChannelFee + Risk% + TaxGTGT% + TaxTNCN% + Discount% + Ads%`

## 6. Implementation Plan
See `plans/260130-tax-separation/plan.md` for detailed phases.
