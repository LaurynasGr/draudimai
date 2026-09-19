import { getTranslations } from '@scaffold/i18n/server'
import { Button } from '@scaffold/ui/components/button'
import Link from 'next/link'
import { NotFoundContent } from '@/components/not-found-content/not-found-content'

/**
 * For `notFound()` thrown by a page in here (an unknown insurer): Next keeps `(app)/layout` mounted around it, so
 * unlike the root `not-found.tsx` (unmatched URLs) this one must not render the shell again.
 */
export default async function AppNotFound() {
    const t = await getTranslations('global.notFound')
    return (
        <NotFoundContent>
            <Button asChild variant="outline">
                <Link href="/">{t('backHome')}</Link>
            </Button>
        </NotFoundContent>
    )
}
