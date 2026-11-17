import { ComponentType } from 'react'
import AsavitaLogo from '../components/atoms/logos/AsavitaLogo'
import GDappsLogo from '../components/atoms/logos/GDappsLogo'
import BioLogo from '../components/atoms/logos/BioLogo'
import InfraredLogo from '../components/atoms/logos/InfraredLogo'
import FantiumLogo from '../components/atoms/logos/FantiumLogo'
import MtxLogo from '../components/atoms/logos/MtxLogo'
import NetcoreLogo from '../components/atoms/logos/NetcoreLogo'
import MietzLogo from '../components/atoms/logos/MietzLogo'
import PlandLogo from '../components/atoms/logos/PlandLogo'
import Made2GrowLogo from '../components/atoms/logos/Made2GrowLogo'

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
    location?: string
    workplace?: string
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
        url: 'https://app.bio.xyz/',
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
    {
        role: 'Senior Frontend Developer',
        company: 'Infrared Finance',
        logo: InfraredLogo,
        url: 'https://infrared.finance/',
        employmentType: 'Full-time',
        start: '2023-11',
        end: '2024-09',
        location: 'Dubai, United Arab Emirates',
        workplace: 'Remote',
    },
    {
        role: 'Front-End Developer',
        company: 'Netcore',
        logo: NetcoreLogo,
        url: 'https://www.netcore.network/',
        employmentType: 'Freelance',
        start: '2023-08',
        end: '2023-10',
        location: 'Berlin, Germany',
        workplace: 'Remote',
        skills: ['React.js', 'Frontend Development'],
    },
    {
        role: 'Freelance Software Engineer',
        company: 'FANtium',
        logo: FantiumLogo,
        url: 'https://fantium.com/',
        employmentType: 'Part-time',
        start: '2022-12',
        end: '2023-11',
        workplace: 'Remote',
        description:
            'Build your portfolio of athletes you believe in. Participate in their future earnings and become part of their team.',
        skills: ['TypeScript', 'Code Review'],
    },
    {
        role: 'Software Engineer',
        company: 'Mietz',
        logo: MietzLogo,
        url: 'https://mietz.com/',
        employmentType: 'Full-time',
        start: '2022-05',
        end: '2023-03',
        description:
            'Mietz makes renting out homes fast and efficient through digital process optimization.',
        skills: ['TypeScript', 'Amazon RDS'],
    },
    {
        role: 'Freelance Software Engineer',
        company: 'MTX Labs',
        logo: MtxLogo,
        url: 'https://mtx.studio/',
        employmentType: 'Part-time',
        start: '2022-03',
        end: '2023-11',
        workplace: 'Remote',
        description: 'Design, build & scale products in Web3.',
        skills: ['TypeScript', 'CI/CD'],
    },
    {
        role: 'Frontend Angular Developer',
        company: 'Pland',
        logo: PlandLogo,
        url: 'https://pland.app/',
        employmentType: 'Freelance',
        start: '2021-11',
        end: '2022-01',
        location: 'Berlin, Germany',
        skills: ['TypeScript', 'AngularJS'],
    },
    {
        role: 'Full-stack Developer',
        company: 'made2GROW GmbH',
        logo: Made2GrowLogo,
        url: 'https://www.made2grow.de/',
        employmentType: 'Work Study',
        start: '2020-06',
        end: '2021-06',
        location: 'Berlin, Germany',
        skills: ['Flutter', 'AppDevelopment'],
    },
]
