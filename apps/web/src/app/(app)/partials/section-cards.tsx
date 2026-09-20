'use client'

import { useTranslations } from '@scaffold/i18n'
import { Card, CardDescription, CardHeader, CardTitle } from '@scaffold/ui/components/card'
import { useConvexAuth } from 'convex/react'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { isSectionVisible, SECTIONS } from '@/lib/sections'

/** A card per section, the same list as the header's nav; private ones wait for the session to be confirmed. */
export function SectionCards() {
    const t = useTranslations('home')
    const { isAuthenticated } = useConvexAuth()
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {SECTIONS.filter((section) => isSectionVisible(section, isAuthenticated)).map(
                ({ key, href, icon: Icon }) => (
                    <Link
                        key={key}
                        href={href}
                        className="group rounded-xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:bg-muted/40">
                            <CardHeader>
                                <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </div>
                                <CardTitle>
                                    <h3 className="flex items-center gap-1.5">
                                        {t(`sections.${key}.title`)}
                                        <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                                    </h3>
                                </CardTitle>
                                <CardDescription>{t(`sections.${key}.description`)}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ),
            )}
        </div>
    )
}
