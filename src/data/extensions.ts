import { ComponentType } from 'react'
import GithubExtensionLogo from '../components/atoms/logos/GithubExtensionLogo'

export type ExtensionEntry = {
    name: string
    /** App icon as a self-contained square tile, shown before the name. */
    icon?: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
    /** Source repository, opened in a new tab. */
    url: string
    kind: string
    /** ISO year-month the project started, e.g. "2026-10". */
    start: string
    /** Browsers the extension runs in. */
    platforms?: string[]
    description?: string
    skills?: string[]
}

/** Newest first. */
export const extensionEntries: ExtensionEntry[] = [
    {
        name: 'Github Extension',
        icon: GithubExtensionLogo,
        url: 'https://github.com/0xCodeMaieutics/github-extension',
        kind: 'Browser extension',
        start: '2026-10',
        platforms: ['Chrome', 'Edge', 'Brave', 'Arc'],
        description:
            'Speeds up GitHub pull request reviews: open any changed file in VS Code, Zed or T3 Code at the first changed line, and request a review on Slack without leaving the PR.',
        skills: ['TypeScript', 'WXT', 'Slack API'],
    },
]
