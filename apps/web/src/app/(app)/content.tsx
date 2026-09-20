'use cache'

import type { api } from '@scaffold/core'
import type { Locale } from '@scaffold/i18n'
import { getTranslations } from '@scaffold/i18n/server'
import { PageContainer } from '@scaffold/ui/layouts/page-container'
import { PageHeader } from '@scaffold/ui/layouts/page-header'
import type { Preloaded } from 'convex/react'
import { SectionCards } from './partials/section-cards'
import { SignedInAs } from './partials/signed-in-as'

/** The whole page for a given viewer, or its skeleton state for `null`; cached per distinct props. */
export async function HomePageContent({ preloadedViewer, locale }: HomePageContentProps) {
    const t = await getTranslations({ locale, namespace: 'home' })
    return (
        <PageContainer className="max-w-5xl">
            <PageHeader title={t('title')} description={t('description')} />
            <SectionCards />
            <SignedInAs preloadedViewer={preloadedViewer} />
        </PageContainer>
    )
}

interface HomePageContentProps {
    /** null while the viewer is still loading. */
    preloadedViewer: Preloaded<typeof api.users.viewer> | null
    /** Cached content cannot read the language cookie, so the page passes the language in. */
    locale: Locale
}
