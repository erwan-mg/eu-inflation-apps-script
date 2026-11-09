# Consumer price trends in Germany, France and Poland (2022–2026), automated with Google Apps Script

> **How did consumer prices evolve in Germany, France and Poland between 2022 and 2026?**
> A Google Sheets analysis of Eurostat price indices, where a Google Apps Script (JavaScript) writes all the growth-rate and summary formulas automatically instead of typing them by hand.

**Tools:** Google Sheets · Google Apps Script (JavaScript) · Eurostat  
**Type:** individual graded exam project (JavaScript module)  
**Live Google Sheet (read-only):** [open the spreadsheet](https://docs.google.com/spreadsheets/d/1uS-23kVu1b3RnVZ2PlCaMcd2bAOAfCVwdpoi_YXHyq0/edit?usp=sharing)  
**Slides (in French):** [`docs/slides_fr.pdf`](docs/slides_fr.pdf)

---

## 1. Context

This project compares three economies with different profiles (Germany, France, Poland) using a single official source, and uses scripting to make the calculations reproducible: one run of the script fills the whole calculation sheet.

## 2. Data

| | |
|---|---|
| Source | Eurostat (ESTAT), extracted on 12/10/2026 (last update 02/10/2026) |
| Indicator | Consumer price index, total (COICOP 2018) |
| Unit | Index, 2025 = 100 |
| Frequency | Monthly |
| Countries | Germany, France, Poland |
| Period | 2022-01 → 2022-09 and 2026-01 → 2026-09 (18 months per country) |

The tidy dataset is in [`data/eurostat_cpi_2022_2026.csv`](data/eurostat_cpi_2022_2026.csv) (`month, country, index_2025_100, eurostat_flag`).
The 2026-09 values for Germany and France carry Eurostat's `e` flag (estimated).

## 3. Method

The Google Sheet has two tabs:

- **`Données`**: raw Eurostat extract. Each value column is followed by a flag column, so values sit in every other column (B, D, F, …, AJ).
- **`Calculs`**: filled by the script [`src/remplirFeuilleCalculs.gs`](src/remplirFeuilleCalculs.gs).

The script:

1. Loops over the 3 countries × 17 periods and writes **51 growth-rate formulas**:
   `rate = (index of the month − index of the previous month) / index of the previous month`.
   Two column lists shifted by one step give each month and the previous one.
2. Writes **15 summary formulas** (5 per country): first index, last index, average monthly rate (`AVERAGE`), highest (`MAX`) and lowest (`MIN`) monthly rate.
3. Shows a confirmation pop-up.

Writing formulas (rather than hard-coded values) keeps every number traceable in the sheet.

**To run it:** make a copy of the [Google Sheet](https://docs.google.com/spreadsheets/d/1uS-23kVu1b3RnVZ2PlCaMcd2bAOAfCVwdpoi_YXHyq0/edit?usp=sharing) (*File → Make a copy*) → *Extensions → Apps Script* → paste the `.gs` file → run `remplirFeuilleCalculs`.

## 4. Results

**Cumulative change in the price index, 2022-01 → 2026-09**

| Country | 2022-01 | 2026-09 | Change |
|---|---:|---:|---:|
| Poland | 78.36 | 103.72 | **+32.4 %** |
| Germany | 85.11 | 103.93 | **+22.1 %** |
| France | 88.01 | 103.39 | **+17.5 %** |

**Summary statistics produced by the script** (17 variations per country)

| | Germany | France | Poland |
|---|---:|---:|---:|
| Average monthly rate | 1.20 % | 0.97 % | 1.73 % |
| Highest rate (MAX) | 8.60 % | 7.85 % | 16.86 % |
| Lowest rate (MIN) | −0.21 % | −0.51 % | −0.28 % |
| Average monthly rate, **excluding the 2022-09 → 2026-01 jump** (16 variations) | 0.74 % | 0.54 % | 0.79 % |

**Takeaways**
- Poland had by far the strongest price increase over the period, France the weakest.
- The "highest monthly rate" is not a real one-month change (see limits): once that jump is removed, average monthly rates are much closer across the three countries.
- 51 rates and 15 statistics are produced in a single run of the script.

## 5. Limits

- **Gap in the series.** Months 2022-10 to 2025-12 are missing, so the "2026-01" rate actually compares 2026-01 with 2022-09 (≈ 40 months). This is what produces the MAX values (8.60 %, 7.85 %, 16.86 %) and inflates the averages.
- **Index levels cannot be compared across countries.** Every index equals 100 in 2025 by construction. The gap between countries in index points (e.g. Poland 9.65 points below France in 2022-01, converging to < 1 point in 2026) only reflects different price growth up to 2025, not different price levels. Comparing price levels would require Eurostat's price level indices (PPP-based).
- **Estimated values.** 2026-09 figures for Germany and France are provisional and may be revised.
- **Hard-coded layout.** Column letters (three lists of 17) and row numbers are written by hand in the script, so it only works for this exact sheet layout. In the exported workbook, the `Calculs` tab starts one row higher than the row numbers used in the script (formulas were adjusted automatically; results are identical).

## 6. Next steps

- Download the full monthly series (2022-01 → 2026-09) to remove the jump.
- Make the script layout-independent: detect the last column and the country rows automatically, and generate column letters in a loop.
- Add a chart of the three indices and of year-on-year inflation.

## Repository structure

```
├── README.md
├── src/
│   └── remplirFeuilleCalculs.gs      # Google Apps Script
├── data/
│   └── eurostat_cpi_2022_2026.csv   # tidy Eurostat extract
└── docs/
    ├── Projet_Javascript.xlsx        # exported Google Sheet (Données + Calculs)
    └── slides_fr.pdf                 # presentation (French)
```

## Author

**Erwan Ramamonjisoa**: MSc AI Applied to Business (Eugenia School) · BSc Economics (Université Paris 1 Panthéon-Sorbonne)  
[LinkedIn](https://www.linkedin.com/in/erwan-r)
