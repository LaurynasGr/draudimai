import { getLocale, getTranslations } from '@scaffold/i18n/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pageTitle } from '@/lib/brand'
import { LifeInsurancePageContent } from '../content'
import { findInsurer } from '../insurers'

export async function generateMetadata({ params }: PageProps<'/life-insurance/[insurer]'>): Promise<Metadata> {
    const insurer = findInsurer((await params).insurer)
    if (!insurer) return {}
    const t = await getTranslations('lifeInsurance')
    return { title: pageTitle(t('insurerMetadataTitle', { insurer: t(`${insurer.id}.name`) })) }
}

/** Nothing to load yet, so there is no Suspense boundary; add one with the first query (see the home page). */
export default async function LifeInsurerPage({ params }: PageProps<'/life-insurance/[insurer]'>) {
    const insurer = findInsurer((await params).insurer)
    if (!insurer) notFound()
    const locale = await getLocale()
    return <LifeInsurancePageContent insurerId={insurer.id} locale={locale} />
}
