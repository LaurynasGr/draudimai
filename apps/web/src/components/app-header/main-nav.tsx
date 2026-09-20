'use client'

import { useTranslations } from '@scaffold/i18n'
import { cn } from '@scaffold/ui/lib/utils'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isSectionVisible, SECTIONS } from '@/lib/sections'

function isActive(item: (typeof SECTIONS)[number], pathname: string) {
    return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

/**
 * Section switcher in the header, on the login page too; the current section is highlighted from the pathname and
 * private items wait for the session to be confirmed.
 */
export function MainNav() {
    const t = useTranslations('nav')
    const pathname = usePathname()
    const { isAuthenticated } = useConvexAuth()
    return (
        <nav aria-label={t('main')} className="flex items-center gap-1">
            {SECTIONS.filter((item) => isSectionVisible(item, isAuthenticated)).map((item) => {
                const Icon = item.icon
                const active = isActive(item, pathname)
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                            active
                                ? 'bg-muted text-foreground'
                                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                        )}
                    >
                        <Icon className="size-4" />
                        {t(item.key)}
                    </Link>
                )
            })}
        </nav>
    )
}
