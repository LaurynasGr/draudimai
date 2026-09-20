import { getTranslations } from '@scaffold/i18n/server'
import { Button } from '@scaffold/ui/components/button'
import Link from 'next/link'
import { NotFoundContent } from '@/components/not-found-content/not-found-content'
import AppLayout from './(app)/layout'

/**
 * The root not-found boundary, so it renders the app shell itself: Next mounts it in place of the root
 * layout's children, i.e. without `(app)/layout`.
 */
export default async function NotFound() {
    const t = await getTranslations('global.notFound')
    return (
        <AppLayout>
            <NotFoundContent>
                <Button asChild variant="outline">
                    <Link href="/">{t('backHome')}</Link>
                </Button>
            </NotFoundContent>
        </AppLayout>
    )
}
