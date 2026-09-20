'use cache'

import { formatLongDate } from '@scaffold/core'
import type { Locale } from '@scaffold/i18n'
import { getTranslations } from '@scaffold/i18n/server'
import { Badge } from '@scaffold/ui/components/badge'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@scaffold/ui/components/card'
import { PageContainer } from '@scaffold/ui/layouts/page-container'
import { PageHeader } from '@scaffold/ui/layouts/page-header'
import { cn } from '@scaffold/ui/lib/utils'
import { ExternalLinkIcon, FileTextIcon } from 'lucide-react'
import Link from 'next/link'
import { findInsurer, INSURERS, type InsurerCoverage, type InsurerId, RETRIEVED_ON } from './insurers'

const FACTS = ['event', 'payout', 'terms', 'exclusions', 'references'] as const

const STATUS_BADGE = { offered: 'default', partial: 'secondary', notOffered: 'outline' } as const

const EXTERNAL_LINK = 'inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline'

/** A message with one point per line: a paragraph for a single point, a bullet list for several. */
function Lines({ text }: LinesProps) {
    const lines = text.split('\n')
    if (lines.length === 1) return <p>{text}</p>
    return (
        <ul className="list-disc space-y-1 pl-5">
            {lines.map((line) => (
                <li key={line}>{line}</li>
            ))}
        </ul>
    )
}

interface LinesProps {
    text: string
}

/** One coverage of one insurer: what is paid and when, or a line on why it is missing. */
async function CoverageCard({ coverage, locale }: CoverageCardProps) {
    const t = await getTranslations({ locale, namespace: 'lifeInsurance' })
    return (
        <Card className={coverage.status === 'notOffered' ? 'bg-transparent shadow-none' : undefined}>
            <CardHeader>
                <CardTitle>{t(`coverage.${coverage.id}`)}</CardTitle>
                {coverage.status !== 'notOffered' && <CardDescription>{t(`${coverage.key}.product`)}</CardDescription>}
                <CardAction>
                    <Badge variant={STATUS_BADGE[coverage.status]}>{t(`status.${coverage.status}`)}</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <p className={coverage.status === 'notOffered' ? 'text-muted-foreground' : undefined}>
                    {t(`${coverage.key}.summary`)}
                </p>
                {coverage.status !== 'notOffered' && (
                    <dl className="grid gap-x-6 gap-y-3 md:grid-cols-[12rem_1fr]">
                        {FACTS.map((fact) => (
                            <div key={fact} className="contents">
                                <dt className="font-medium text-muted-foreground">{t(`facts.${fact}`)}</dt>
                                <dd>
                                    <Lines text={t(`${coverage.key}.${fact}`)} />
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </CardContent>
        </Card>
    )
}

interface CoverageCardProps {
    coverage: InsurerCoverage
    locale: Locale
}

/** Everything known about one insurer: how the product works, each coverage, and the documents it all comes from. */
async function InsurerPanel({ insurer, locale }: InsurerPanelProps) {
    const t = await getTranslations({ locale, namespace: 'lifeInsurance' })
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>{t('overview')}</CardTitle>
                    <CardDescription>{t(`${insurer.id}.insurer`)}</CardDescription>
                    <CardAction>
                        <a href={insurer.url} target="_blank" rel="noreferrer" className={`${EXTERNAL_LINK} text-sm`}>
                            {t('productPage')}
                            <ExternalLinkIcon className="size-3.5" />
                        </a>
                    </CardAction>
                </CardHeader>
                <CardContent className="text-sm">
                    <Lines text={t(`${insurer.id}.overview`)} />
                </CardContent>
            </Card>
            <h3 className="mt-2 text-base font-semibold tracking-tight">{t('coverages')}</h3>
            {insurer.coverages.map((coverage) => (
                <CoverageCard key={coverage.id} coverage={coverage} locale={locale} />
            ))}
            <Card>
                <CardHeader>
                    <CardTitle>{t('sources')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        {insurer.documents.map((document) => (
                            <li key={document.key}>
                                <a href={document.url} target="_blank" rel="noreferrer" className={EXTERNAL_LINK}>
                                    <FileTextIcon className="size-4 shrink-0" />
                                    {t(document.key)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}

interface InsurerPanelProps {
    insurer: (typeof INSURERS)[number]
    locale: Locale
}

/**
 * One insurer at a time, picked by the URL (`/life-insurance/seb`) so that the server renders the selected one and
 * the link can be shared; every insurer lists every coverage any of them offers so that the gaps show too.
 */
export async function LifeInsurancePageContent({ insurerId, locale }: LifeInsurancePageContentProps) {
    const t = await getTranslations({ locale, namespace: 'lifeInsurance' })
    const selected = findInsurer(insurerId)
    return (
        <PageContainer className="max-w-5xl">
            <PageHeader title={t('title')} description={t('description')} />
            <p className="text-sm text-muted-foreground">
                {t('retrieved', { date: formatLongDate(locale, RETRIEVED_ON) })}
            </p>
            <nav aria-label={t('insurers')} className="flex w-fit items-center gap-1 rounded-lg bg-muted p-[3px]">
                {INSURERS.map((insurer) => (
                    <Link
                        key={insurer.id}
                        href={`/life-insurance/${insurer.id}`}
                        aria-current={insurer.id === insurerId ? 'page' : undefined}
                        className={cn(
                            'rounded-md px-4 py-1 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                            insurer.id === insurerId
                                ? 'bg-background text-foreground shadow-sm dark:bg-input/30'
                                : 'text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {t(`${insurer.id}.name`)}
                    </Link>
                ))}
            </nav>
            {selected && <InsurerPanel insurer={selected} locale={locale} />}
        </PageContainer>
    )
}

interface LifeInsurancePageContentProps {
    /** The insurer in the URL; the page has already answered 404 for an unknown one. */
    insurerId: InsurerId
    /** Cached content cannot read the language cookie, so the page passes the language in. */
    locale: Locale
}
