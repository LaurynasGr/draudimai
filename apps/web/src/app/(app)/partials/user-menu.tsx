'use client'

import { useAuthActions } from '@convex-dev/auth/react'
import type { api } from '@scaffold/core'
import { useOptionalPreloadedQuery } from '@scaffold/core/hooks'
import { useTranslations } from '@scaffold/i18n'
import { Button } from '@scaffold/ui/components/button'
import { Skeleton } from '@scaffold/ui/components/skeleton'
import type { Preloaded } from 'convex/react'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'

/**
 * Avatar, email and sign-out, or a sign-in link for an anonymous visitor (every page is public); a skeleton while the
 * viewer is still preloading (null).
 */
export function UserMenu({ preloadedViewer }: UserMenuProps) {
    const t = useTranslations('nav')
    const viewer = useOptionalPreloadedQuery(preloadedViewer)
    const { signOut } = useAuthActions()

    if (preloadedViewer === null) {
        return (
            <>
                <Skeleton className="size-7 rounded-full" />
                <Skeleton className="hidden h-3 w-36 lg:block" />
                <div className="size-8" />
            </>
        )
    }
    if (!viewer) {
        return (
            <Button asChild variant="ghost" size="sm">
                <Link href="/login">
                    <LogInIcon />
                    <span className="sr-only md:not-sr-only">{t('signIn')}</span>
                </Link>
            </Button>
        )
    }
    return (
        <>
            {viewer.image && (
                // biome-ignore lint/performance/noImgElement: avatars are tiny and already served resized by Google.
                <img
                    src={viewer.image}
                    alt={viewer.name ?? viewer.email ?? t('profile')}
                    // Google avatar URLs 403 when sent a referrer.
                    referrerPolicy="no-referrer"
                    className="size-7 rounded-full border"
                />
            )}
            <span className="hidden max-w-48 truncate text-xs text-muted-foreground lg:inline">
                {viewer.email ?? viewer.name ?? ''}
            </span>
            <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => signOut()}
                title={t('signOut')}
                aria-label={t('signOut')}
            >
                <LogOutIcon />
            </Button>
        </>
    )
}

interface UserMenuProps {
    /** null while the layout's Suspense fallback is showing. */
    preloadedViewer: Preloaded<typeof api.users.viewer> | null
}
