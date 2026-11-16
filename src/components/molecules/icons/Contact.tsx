import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

export type ContactLink = {
    title: string
    href: string
    /** Simple Icons glyph: all share one 24px grid, so they render at the same optical size. */
    Icon: IconType
    external: boolean
    /** Literal Tailwind classes so the JIT compiler can see them. */
    styles: {
        /** Solid brand color behind the white glyph. */
        tile: string
    }
}

function linkProps({ href, external }: ContactLink) {
    return external
        ? { href, target: '_blank', rel: 'noopener noreferrer' }
        : { href }
}

export default function ContactIcon({ link }: { link: ContactLink }) {
    const { Icon, title, styles } = link

    return (
        <a
            {...linkProps(link)}
            aria-label={title}
            title={title}
            className={'group grid h-11 w-11 place-items-center rounded-full'}
        >
            <span
                className={twMerge(
                    'grid h-9 w-9 place-items-center rounded-full shadow-sm ring-1 ring-black/5 transition-transform duration-150 ease-out group-hover:scale-110 group-focus-visible:scale-110 group-active:scale-90 motion-reduce:transform-none',
                    styles.tile
                )}
            >
                <Icon aria-hidden className={'h-[18px] w-[18px] text-white'} />
            </span>
        </a>
    )
}
