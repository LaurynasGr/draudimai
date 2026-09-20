/** The day the insurers' documents below were read; shown on the page so readers can judge how fresh the summary is. */
export const RETRIEVED_ON = '2026-09-19'

/**
 * Coverages found in the reviewed documents, in display order. Absence describes only these policies,
 * not the insurer's entire product range.
 */
export const COVERAGE_IDS = [
    'life',
    'accidentalDeath',
    'criticalIllness',
    'cancer',
    'childCriticalIllness',
    'disability',
    'accidentDisability',
    'injuries',
    'dailyAllowance',
    'hospitalAllowance',
    'medicalExpenses',
] as const
export type CoverageId = (typeof COVERAGE_IDS)[number]

/**
 * `key` is the coverage's message path under `lifeInsurance`, spelled out so that the translator can type-check it:
 * an offered or partly offered coverage has `product`, `summary` and the five facts, a missing one only `summary`.
 */
interface Coverage {
    id: CoverageId
    status: 'offered' | 'partial' | 'notOffered'
    key: string
}

interface Insurer {
    id: string
    /** The insurer's product page. */
    url: string
    /** The documents the summary was written from; `key` is the title's message path under `lifeInsurance`. */
    documents: { key: string; url: string }[]
    /** One entry per `COVERAGE_IDS`, in that order. */
    coverages: Coverage[]
}

export const INSURERS = [
    {
        id: 'swedbank',
        url: 'https://www.swedbank.lt/private/insurance/life/life',
        documents: [
            {
                key: 'swedbank.documents.lifeRules',
                url: 'https://www.swedbank.lt/static/life-insurance/Gyvybes_draudimo_ir_Gyvybes_draudimo_paskolos_grazinimui_taisykles_20250925_LIT.pdf',
            },
            {
                key: 'swedbank.documents.disabilityRules',
                url: 'https://www.swedbank.lt/static/life-insurance/Papildomo_sunkios_negalios_draudimo_taisykles_20240101_LIT.pdf',
            },
            {
                key: 'swedbank.documents.injuryRules',
                url: 'https://www.swedbank.lt/static/life-insurance/Papildomo_traumu_del_nelaimingu_atsitikimu_draudimo_taisykles_20240523_LIT.pdf',
            },
            {
                key: 'swedbank.documents.precontract',
                url: 'https://www.swedbank.lt/static/life-insurance/Gyvybes_draudimo_ikisutartine_informacija_LIT.pdf',
            },
        ],
        coverages: [
            { id: 'life', status: 'offered', key: 'swedbank.life' },
            { id: 'accidentalDeath', status: 'notOffered', key: 'swedbank.accidentalDeath' },
            { id: 'criticalIllness', status: 'notOffered', key: 'swedbank.criticalIllness' },
            { id: 'cancer', status: 'notOffered', key: 'swedbank.cancer' },
            { id: 'childCriticalIllness', status: 'notOffered', key: 'swedbank.childCriticalIllness' },
            { id: 'disability', status: 'offered', key: 'swedbank.disability' },
            { id: 'accidentDisability', status: 'notOffered', key: 'swedbank.accidentDisability' },
            { id: 'injuries', status: 'offered', key: 'swedbank.injuries' },
            { id: 'dailyAllowance', status: 'notOffered', key: 'swedbank.dailyAllowance' },
            { id: 'hospitalAllowance', status: 'partial', key: 'swedbank.hospitalAllowance' },
            { id: 'medicalExpenses', status: 'notOffered', key: 'swedbank.medicalExpenses' },
        ],
    },
    {
        id: 'seb',
        url: 'https://www.seb.lt/privatiems/draudimas/asmens-draudimas',
        documents: [
            {
                key: 'seb.documents.lifeRules',
                url: 'https://www.seb.lt/sites/default/files/tac/gyvybes-draudimas-taisykles.pdf',
            },
            {
                key: 'seb.documents.injuryRules',
                url: 'https://www.seb.lt/sites/default/files/tac/draudimas-nuo-traumu-taisykles.pdf',
            },
            {
                key: 'seb.documents.severeInjuryRules',
                url: 'https://www.seb.lt/sites/default/files/tac/draudimas-nuo-sunkiu-traumu-taisykles.pdf',
            },
            {
                key: 'seb.documents.criticalIllnessRules',
                url: 'https://www.seb.lt/sites/default/files/tac/draudimas-nuo-kritiniu-ligu-taisykles.pdf',
            },
            {
                key: 'seb.documents.disabilityRules',
                url: 'https://www.seb.lt/sites/default/files/tac/draudimas-nuo-nuolatinio-nedarbingumo-taisykles.pdf',
            },
            {
                key: 'seb.documents.accidentalDeathRules',
                url: 'https://www.seb.lt/sites/default/files/tac/draudimas-nuo-mirties-del-nelaimingo-atsitikimo-taisykles.pdf',
            },
        ],
        coverages: [
            { id: 'life', status: 'offered', key: 'seb.life' },
            { id: 'accidentalDeath', status: 'offered', key: 'seb.accidentalDeath' },
            { id: 'criticalIllness', status: 'offered', key: 'seb.criticalIllness' },
            { id: 'cancer', status: 'partial', key: 'seb.cancer' },
            { id: 'childCriticalIllness', status: 'notOffered', key: 'seb.childCriticalIllness' },
            { id: 'disability', status: 'offered', key: 'seb.disability' },
            { id: 'accidentDisability', status: 'offered', key: 'seb.accidentDisability' },
            { id: 'injuries', status: 'offered', key: 'seb.injuries' },
            { id: 'dailyAllowance', status: 'notOffered', key: 'seb.dailyAllowance' },
            { id: 'hospitalAllowance', status: 'partial', key: 'seb.hospitalAllowance' },
            { id: 'medicalExpenses', status: 'notOffered', key: 'seb.medicalExpenses' },
        ],
    },
    {
        id: 'ergo',
        url: 'https://ergo.lt/privatiems/gyvybes-kritiniu-ligu-ir-nelaimingu-atsitikimu-draudimas',
        documents: [
            {
                key: 'ergo.documents.rules',
                url: 'https://ergo.lt/files/web-public/2026-07/Bendrosios-gyvyb%C4%97s-draudimo-taisykl%C4%97s-Nr.028,-kainorastis,-ikisutartine-informacija.pdf',
            },
        ],
        coverages: [
            { id: 'life', status: 'offered', key: 'ergo.life' },
            { id: 'accidentalDeath', status: 'offered', key: 'ergo.accidentalDeath' },
            { id: 'criticalIllness', status: 'offered', key: 'ergo.criticalIllness' },
            { id: 'cancer', status: 'offered', key: 'ergo.cancer' },
            { id: 'childCriticalIllness', status: 'offered', key: 'ergo.childCriticalIllness' },
            { id: 'disability', status: 'offered', key: 'ergo.disability' },
            { id: 'accidentDisability', status: 'offered', key: 'ergo.accidentDisability' },
            { id: 'injuries', status: 'offered', key: 'ergo.injuries' },
            { id: 'dailyAllowance', status: 'offered', key: 'ergo.dailyAllowance' },
            { id: 'hospitalAllowance', status: 'offered', key: 'ergo.hospitalAllowance' },
            { id: 'medicalExpenses', status: 'offered', key: 'ergo.medicalExpenses' },
        ],
    },
] as const satisfies Insurer[]

export type InsurerId = (typeof INSURERS)[number]['id']

/** The insurer a URL segment names, if any. */
export function findInsurer(id: string) {
    return INSURERS.find((insurer) => insurer.id === id)
}

export type InsurerCoverage = (typeof INSURERS)[number]['coverages'][number]
