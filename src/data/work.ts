import { ComponentType } from 'react'
import AsavitaLogo from '../components/atoms/logos/AsavitaLogo'
import GDappsLogo from '../components/atoms/logos/GDappsLogo'
import BioLogo from '../components/atoms/logos/BioLogo'

export type WorkEntry = {
    role: string
    company: string
    /** Company mark as a self-contained square tile, shown before the company name. */
    logo?: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
    /** Company website, opened in a new tab. */
    url?: string
    employmentType: string
    /** ISO year-month, e.g. "2025-10". */
    start: string
    /** ISO year-month, or undefined while the role is ongoing. */
    end?: string
    location: string
    workplace: string
    description?: string
    skills?: string[]
}

/** Newest first. Source: LinkedIn experience section. */
export const workEntries: WorkEntry[] = [
    {
        role: 'Software Engineer',
        company: 'Asavita',
        logo: AsavitaLogo,
        url: 'https://asavita.de/',
        employmentType: 'Part-time',
        start: '2025-10',
        location: 'Berlin, Germany',
        workplace: 'Remote',
    },
    {
        role: 'Full-stack Developer',
        company: 'BIO',
        logo: BioLogo,
        employmentType: 'Full-time',
        start: '2025-01',
        end: '2025-06',
        location: 'Berlin, Germany',
        workplace: 'Remote',
        skills: ['Next.js', 'Strapi'],
    },
    {
        role: 'Founder',
        company: 'GDapps Studio',
        logo: GDappsLogo,
        url: 'https://gdapps.studio/',
        employmentType: 'Full-time',
        start: '2024-09',
        end: '2025-08',
        location: 'Berlin, Germany',
        workplace: 'Remote',
        description:
            'We build scalable, modern Web3 front-end interfaces using Next.js, Wagmi, and RainbowKit, focusing on performance.',
        skills: ['UI/UX implementation', 'Smart Contracts Integrations'],
    },
]
