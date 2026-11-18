import { ComponentType } from 'react'
import GDappsLogo from '../components/atoms/logos/GDappsLogo'
import GithubExtensionLogo from '../components/atoms/logos/GithubExtensionLogo'
import SqlConsoleLogo from '../components/atoms/logos/SqlConsoleLogo'

export type ToolEntry = {
    name: string
    /** App icon as a self-contained square tile, shown before the name. */
    icon?: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
    /** Source repository or live site, opened in a new tab. */
    url: string
    kind: string
    /** ISO year-month the project started, e.g. "2026-10". */
    start: string
    /** Browsers, databases or other platforms the tool works with. */
    platforms?: string[]
    description?: string
    skills?: string[]
}

/** Newest first. */
export const toolEntries: ToolEntry[] = [
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
    {
        name: 'SQL Console',
        icon: SqlConsoleLogo,
        url: 'https://github.com/0xCodeMaieutics/sql-console',
        kind: 'Local web app',
        start: '2026-10',
        platforms: ['PostgreSQL', 'SQLite'],
        description:
            'Inspects the databases on your machine: find local PostgreSQL instances, open SQLite files, browse and filter tables, and run raw SQL with a saved query history.',
        skills: ['TypeScript', 'React', 'Hono'],
    },
    {
        name: 'On Chain Payment',
        icon: GDappsLogo,
        url: 'https://onchain-payment.gdapps.studio/',
        kind: 'Web app',
        start: '2025-04',
        platforms: ['Ethereum', 'Solana'],
        description:
            'Creates shareable crypto payment requests: choose the recipient wallet, amount, network and currency, then send the link so anyone can pay from their own wallet.',
        skills: ['Next.js', 'Wagmi', 'RainbowKit', 'Solana Wallet Adapter'],
    },
    {
        name: 'Merkle Tree Generator',
        icon: GDappsLogo,
        url: 'https://merkletreegenerator.gdapps.studio',
        kind: 'Web app',
        start: '2025-04',
        platforms: ['EVM', 'Solana'],
        description:
            'Generates Merkle trees for NFT and token sale whitelists, and creates the proof.json your smart contract or program needs to verify them.',
        skills: ['Next.js', 'OpenZeppelin Merkle Tree', 'Solana Web3.js'],
    },
]
