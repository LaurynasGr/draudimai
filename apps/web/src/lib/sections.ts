import { HeartPulseIcon, HouseIcon, type LucideIcon } from 'lucide-react'

interface Section {
    /** The label's key under `nav`, and the card's key under `home.sections`. */
    key: string
    href: string
    icon: LucideIcon
    /** Only shown to a signed-in visitor. Hiding the link protects nothing: the page's Convex functions do that. */
    private?: boolean
}

/** The insurance types, all public so far: the header's nav items and the home page's cards. */
export const SECTIONS = [
    { key: 'lifeInsurance', href: '/life-insurance', icon: HeartPulseIcon },
    { key: 'homeInsurance', href: '/home-insurance', icon: HouseIcon },
] as const satisfies Section[]

export function isSectionVisible(section: Section, signedIn: boolean) {
    return !section.private || signedIn
}
