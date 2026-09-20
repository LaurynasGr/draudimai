'use client'

import { useTranslations } from '@scaffold/i18n'
import { cn } from '@scaffold/ui/lib/utils'
import { useConvexAuth } from 'convex/react'
import { HeartPulseIcon, HouseIcon, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
    /** The label's key under `nav`. */
    key: string
    href: string
    icon: LucideIcon
    /** Only shown to a signed-in visitor. Hiding the link protects nothing: the page's Convex functions do that. */
    private?: boolean
}

/** The insurance types, all public so far. The brand in the header links home. */
const ITEMS = [
    { key: 'lifeInsurance', href: '/life-insurance', icon: HeartPulseIcon },
    { key: 'homeInsurance', href: '/home-insurance', icon: HouseIcon },
] as const satisfies NavItem[]

function isVisible(item: NavItem, signedIn: boolean) {
    return !item.private || signedIn
}

function isActive(item: (typeof ITEMS)[number], pathname: string) {
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
            {ITEMS.filter((item) => isVisible(item, isAuthenticated)).map((item) => {
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
