# Life insurance content audit

Reviewed 2026-09-19 against all 11 PDFs in `apps/web/src/public/life`. Both English and Lithuanian app summaries were checked and updated. Policy references now appear on every coverage card that describes an included benefit. Page numbers for the ERGO bundle are the **printed** numbers (PDF viewer page = printed page + 2).

The review covers the app's product descriptions, availability labels, entry/expiry ages, insured-event definitions, example payouts, benefit interactions, waiting periods, exclusions and material contract conditions. This is a summary audit, not a reproduction of every medical definition or injury-table row. Individual underwriting decisions and a customer's policy schedule are not available. No prices or current tax-law guarantees are inferred from the documents.

## Material corrections and additions

| Area | Finding and app correction | Source |
| --- | --- | --- |
| Scope | “Not offered” overstated absence from this document set. Labels and descriptions now refer to the reviewed policies. “Death from any cause” removed. | All reviewed documents; each product has exclusions. |
| Swedbank contract | Loan sum has a policy override; life and injury cover have different start dates. Added unpaid-premium suspension, disclosure obligations, sanctions, claim notification and qualified claim timing. | LI2020 pp. 2, 4–6; TR2020 pp. 2–4. |
| Swedbank suicide | Added continuous-replacement exception and three-year restriction on sum increases. | LI2020 pp. 3–4. |
| Swedbank disability | Added the functional test, combining six-month periods with gaps no longer than 30 days, event date, benefit interaction with life cover and proportional loan interest. No initial wait does not remove the 12-month disability test. | DI2020 pp. 1–3; pre-contractual §5. |
| Swedbank injuries | Added 180-day surgery deadline, one surgery supplement per event, 90-day inpatient window, minor-fracture alternative, item-19 two-event limit, diagnostic requirements and non-stacking rules. Added self-harm/recurrent-dislocation exclusions and aviation/military exceptions. | TR2020 pp. 2–6, items 19–22 and additional payment conditions. |
| SEB illness/incapacity | Cover ends on the insured event, not only after payment. An increase's waiting period applies only to the increased amount. Diagnosis alone does not establish an insured event. | Critical illness pp. 1–5; incapacity pp. 1–2. |
| SEB cancer | Explicitly carries critical-illness exclusions, including one-month survival and residence restriction. | Critical illness §§1, exclusions, waiting period, pp. 1, 4–5. |
| SEB injury/severe injury | Added same-body-part maximum, first soft-tissue event per joint/year, imaging requirements, deduction for previous functional impairment and full coma criteria. Hospital supplement shares the annual injury limit. | Injury payout §§3–4; severe injury payout §§2, 7. |
| SEB exclusions | Clarified causal exclusions and that requested misinformation must relate to the event. Residence can lead to refusal as well as reduction. | Exclusions in the six risk documents. |
| ERGO document version | 2026-06-19 is the pre-contractual sheet's date, not the effective date of every section. | Bundle headers: general/life/cancer 2019-11-18; accident/adult/child/incapacity 2022-07-01; price list 2025-05-01. |
| ERGO contract | Qualified withdrawal eligibility, minimum terms/sums, first-payment timing and retrospective-cover exception. Added claim deadlines, disclosure, sport definitions, sanctions and contract changes. | Pre-contractual pp. 2–5; general §§1.21–1.22, 3, 4, 7; special change clauses; price list p. 71. |
| ERGO life | Added court-declared death date requirement and lowest-sum rule after an increase for suicide. | 028-02 §§3.2, 5.3. |
| ERGO cancer | Added exact early prostate/thyroid and skin cancer qualifications, combined cover from both parents, children's cover ending with parent’s invasive-cancer benefit, conditional premium refund and sum-increase restriction. Disclosure alone is insufficient for the prior-condition exception. | 028-01 §§2–5. |
| ERGO adult/child critical illness | Adult policy also includes children’s cancer protection. Added reinstatement/increase restrictions and exceptions, child congenital-defect exclusion, partial-payment interaction and explicit child exclusions rather than importing the adult list. | 028-04 §§2.2, 4, 6; 028-05 §§4, 6 and appendix. |
| ERGO incapacity | Added complete restriction on income-producing work, insurer determination and increased-sum/continuity qualifications. | 028-06 §§3–5. |
| ERGO accidental disability | Added same-part/organ maximum, prior-loss deduction, post-surgery assessment timing, and the minimum two-sign condition on CNS example groups. | 028-03 §4.2; table 1 §§1–3, article 1 note. |
| ERGO injuries | Corrected overbroad percentage increases/reductions. Added no payment for later repetitions, pregnancy-loss exception and gestational thresholds, diagnostic/non-stacking rules, tick-disease wait, Achilles surgery rate and repeated-sprain exclusion. | Table 2 §§1–3, articles 12, 16–17. |
| ERGO accident exclusions | Intoxication requires influence on the accident; fighting has a self-defence/official-duty exception. Radiotherapy exception retained for critical illness/incapacity. | 028-03 §§3.1.6, 4.1.2.3, 4.3.2.3; 028-04/05/06 exclusions. |
| ERGO assistance | Added repatriation, wound-treatment benefit, separate annual/per-event sublimits, rehabilitation non-duplication, selected-illness waiting period and parent's hospital evidence. Restricted doctor-consultation exclusion to the diagnostic item. | 028-03 §§4.4–4.8; table 3. |

## Source gaps and inconsistencies retained visibly

- **SEB:** All six supplied risk rules require the missing *Asmens draudimo taisyklės*. General payment, cancellation and claims provisions cannot be fully verified from this set. The app explicitly states this limitation; it does not invent those provisions.
- **ERGO cancer waiting period:** 028-04 §4.1.1 and 028-05 §4.1.1 state three months. The pre-contractual sheet describes six months for cancer (three for employee groups), and separate 028-01 §4.1.1 uses six/three months. The adult appendix refers to the separate cancer conditions; the child appendix has its own cancer definitions. The app describes the competing wording and calls for confirmation in the actual policy rather than silently applying six months to every product.
- **Swedbank withdrawal:** LI2020 p. 6 counts 30 days from conclusion; pre-contractual §7 counts from policy delivery. Both are identified.
- **ERGO withdrawal:** Newer pre-contractual p. 4 counts from notification of conclusion; general §7.4.1 counts from delivery. Both are identified.
- **ERGO life criminal-act exclusion:** Stated in pre-contractual p. 3 but not repeated in special 028-02 §4. The app attributes it to the pre-contractual information.
- Tax wording is attributed to the supplied pre-contractual information, not presented as an unconditional current or future tax ruling.

## Validation

- Text extracted from all 11 source PDFs; material table layouts cross-checked visually (SEB injuries, Swedbank supplements, ERGO injury conditions and additional assistance).
- Official web copies of Swedbank LI2020, SEB critical illness and the ERGO bundle were also opened to check the cited source destinations. The local documents remain the audit baseline.
- `bun run lint` (Biome and all workspace TypeScript projects).
- `bun test packages/i18n/src/translations/translations.test.ts` (locale key, interpolation and markup parity).
- Coverage-field completeness checked for both locales, including all new references.

## Source inventory

SHA-256 fingerprints pin the exact local editions reviewed. Links in the app still point to insurer-hosted copies, which may change independently.

- `ergo/Bendrosios-gyvybės-draudimo-taisyklės-Nr.028,-kainorastis,-ikisutartine-informacija.pdf` (74 PDF pages)
  - SHA-256: `96e9d5eba2d4c1d9710dec49b6c0a395004370ad7fd0a97d9b412f36f07fce9e`
- `seb/draudimas-nuo-kritiniu-ligu-taisykles.pdf` (5 PDF pages)
  - SHA-256: `395294ee56eb2cd3cd94e98844cf68aced0329095a6c0480b194e6748d3684a1`
- `seb/draudimas-nuo-mirties-del-nelaimingo-atsitikimo-taisykles.pdf` (2 PDF pages)
  - SHA-256: `f1494da7b9ed3271a3e749c107bf646531001d51466d7963852d0d69b0f90a4c`
- `seb/draudimas-nuo-nuolatinio-nedarbingumo-taisykles.pdf` (2 PDF pages)
  - SHA-256: `0c6dd22817268d59386dbd0698d92197b001769c648a50cb52916797a670239b`
- `seb/draudimas-nuo-sunkiu-traumu-taisykles.pdf` (4 PDF pages)
  - SHA-256: `8e4b743432a250d3dbf35fa37e4fbfedeab4422eccb3bf815c83730cc08c8151`
- `seb/draudimas-nuo-traumu-taisykles.pdf` (4 PDF pages)
  - SHA-256: `4bb4159af63c7def1472ce7a242ea7f01b0e0d6e7edae9c0e56d7c050fa80a49`
- `seb/gyvybes-draudimas-taisykles.pdf` (1 PDF pages)
  - SHA-256: `2d646de8e42bd938f378acff05891f23ddf3a2d099a3a83af91484015bc33e5c`
- `swedbank/Gyvybes_draudimo_ikisutartine_informacija_LIT.pdf` (4 PDF pages)
  - SHA-256: `9b332a1bd3122efbbf1e70723933ecd060797791dfd53d3e656070155dcc5b3f`
- `swedbank/Gyvybes_draudimo_ir_Gyvybes_draudimo_paskolos_grazinimui_taisykles_20250925_LIT.pdf` (8 PDF pages)
  - SHA-256: `9b06db92afc8d852a752aa373540cc2022bcc50ad7bcf6fc822a35e8a5b5a153`
- `swedbank/Papildomo_sunkios_negalios_draudimo_taisykles_20240101_LIT.pdf` (4 PDF pages)
  - SHA-256: `82bfefccbfe7f54de5e74afcf78935500e89aaf010e3ac5a0f695b5f0d828a08`
- `swedbank/Papildomo_traumu_del_nelaimingu_atsitikimu_draudimo_taisykles_20240523_LIT.pdf` (6 PDF pages)
  - SHA-256: `b3248fcda90b046695acd4936f4708bcbb530e416efe387f07b6993864c1b601`
