import { getTranslations } from '@scaffold/i18n/server'
import { LayersIcon } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { APP_NAME } from '@/lib/brand'
import { LocaleToggle } from './locale-toggle'
import { MainNav } from './main-nav'
import { ThemeToggle } from './theme-toggle'

/** Sticky top bar: brand and the section navigation on the left, language and theme toggles plus any page-specific actions on the right. */
export async function AppHeader({ children }: AppHeaderProps) {
    const t = await getTranslations('global')
    return (
        <header className="sticky top-0 z-10 h-(--header-height) border-b bg-background/80 backdrop-blur">
            {/* One row from `sm` up. On a phone the controls do not fit next to the nav, so they wrap to a second line
                (the nav's flex-basis leaves no room for them on the first); the taller header is accounted for in
                `--header-height`. DOM order is the visual order at every width, so focus never jumps between lines. */}
            <div className="mx-auto flex h-full max-w-[1600px] flex-wrap content-center items-center gap-x-2 gap-y-2.5 px-4 sm:flex-nowrap">
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-3 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:mr-2"
                >
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <LayersIcon className="size-5" />
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="whitespace-nowrap text-sm font-semibold leading-tight tracking-tight sm:text-base">
                            {APP_NAME}
                        </h1>
                        <p className="hidden text-xs text-muted-foreground lg:block">{t('tagline')}</p>
                    </div>
                </Link>
                <div className="scrollbar-thin min-w-0 grow basis-[calc(100%-4rem)] overflow-x-auto sm:basis-0">
                    <MainNav />
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-2">
                    <LocaleToggle />
                    <ThemeToggle />
                    {children}
                </div>
            </div>
        </header>
    )
}

interface AppHeaderProps {
    /** Right-hand extras next to the theme toggle (user menu, page actions). */
    children?: ReactNode
}
