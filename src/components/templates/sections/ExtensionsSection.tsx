import { FiArrowUpRight } from 'react-icons/fi'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useRevealOnce } from '../../../hooks/useRevealOnce'
import { ExtensionEntry, extensionEntries } from '../../../data/extensions'

const monthFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
})

const parseMonth = (value: string) => {
    const [year, month] = value.split('-').map(Number)
    return new Date(year, month - 1, 1)
}

/** "owner/name" from a GitHub URL, shown like a cloned repo path. */
const repoSlug = (url: string) => new URL(url).pathname.replace(/^\/|\/$/g, '')

function ExtensionItem({
    entry,
    index,
    revealed,
}: {
    entry: ExtensionEntry
    index: number
    revealed: boolean
}) {
    return (
        <li
            style={{ transitionDelay: revealed ? `${index * 120}ms` : '0ms' }}
            className={
                'relative pb-12 pl-10 transition duration-700 ease-out last:pb-0 motion-reduce:transition-none sm:pl-14 ' +
                (revealed
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0')
            }
        >
            {/* Node on the rail. */}
            <span
                aria-hidden
                className={
                    'absolute left-0 top-1.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-white sm:left-[3px]'
                }
            >
                <span
                    className={
                        'h-3 w-3 rounded-full border-2 border-black/40 bg-white'
                    }
                />
            </span>

            <p
                aria-hidden
                className={'font-mono text-[13px] text-black/50 sm:text-sm'}
            >
                {repoSlug(entry.url)}
            </p>

            <h3
                className={
                    'mt-2 flex items-center text-3xl font-bold leading-tight sm:text-4xl'
                }
            >
                {entry.icon && (
                    <entry.icon
                        aria-hidden
                        className={
                            'mr-3 h-9 w-9 shrink-0 select-none rounded-lg sm:h-10 sm:w-10'
                        }
                    />
                )}
                <a
                    href={entry.url}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    className={
                        'group inline-flex items-center gap-1 rounded underline decoration-black/20 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-primary hover:decoration-primary'
                    }
                >
                    {entry.name}
                    <FiArrowUpRight
                        aria-hidden
                        className={
                            'h-6 w-6 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none'
                        }
                    />
                    <span className={'sr-only'}> (opens in a new tab)</span>
                </a>
            </h3>

            <p
                className={
                    'mt-3 font-mono text-sm text-black/60 sm:text-[15px]'
                }
            >
                {entry.kind}
                <span aria-hidden className={'mx-2 text-black/30'}>
                    ·
                </span>
                Since{' '}
                <time dateTime={entry.start}>
                    {monthFormat.format(parseMonth(entry.start))}
                </time>
            </p>

            {entry.description && (
                <p
                    className={
                        'mt-4 max-w-[60ch] text-lg leading-relaxed text-black/70'
                    }
                >
                    {entry.description}
                </p>
            )}

            {entry.platforms && (
                <ul
                    className={'mt-4 flex flex-wrap gap-2'}
                    aria-label={'Runs in'}
                >
                    {entry.platforms.map((platform) => (
                        <li
                            key={platform}
                            className={
                                'rounded-full bg-black/5 px-3 py-1 text-sm text-black/70'
                            }
                        >
                            {platform}
                        </li>
                    ))}
                </ul>
            )}

            {entry.skills && (
                <ul
                    className={'mt-3 flex flex-wrap gap-x-4 gap-y-1'}
                    aria-label={'Built with'}
                >
                    {entry.skills.map((skill) => (
                        <li
                            key={skill}
                            className={'font-mono text-[13px] text-black/50'}
                        >
                            <span aria-hidden className={'text-primary'}>
                                #
                            </span>
                            {skill}
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )
}

/**
 * Side projects I've built, listed with the same rail-and-node layout as
 * the work history above.
 */
export default function ExtensionsSection() {
    const prefersReducedMotion = useMediaQuery(
        '(prefers-reduced-motion: reduce)'
    )
    const [sectionRef, inView] = useRevealOnce<HTMLElement>()
    const revealed = prefersReducedMotion || inView

    return (
        <section
            ref={sectionRef}
            aria-labelledby={'extensions-heading'}
            className={
                'mx-auto w-full max-w-[1040px] px-6 pb-16 pt-20 sm:px-10'
            }
        >
            <p
                aria-hidden
                className={'font-mono text-sm text-black/50 sm:text-base'}
            >
                <span className={'text-primary'}>~/extensions</span>{' '}
                <span className={'text-black/40'}>$</span> ls --built
            </p>
            <h2 id={'extensions-heading'} className={'mt-2'}>
                Extensions
            </h2>

            <ol className={'relative mt-10 sm:mt-14'}>
                <span
                    aria-hidden
                    className={
                        'absolute bottom-0 left-[10px] top-3 w-0.5 rounded-full bg-gradient-to-b from-black/20 to-black/0 sm:left-[13px]'
                    }
                />
                {extensionEntries.map((entry, index) => (
                    <ExtensionItem
                        key={entry.url}
                        entry={entry}
                        index={index}
                        revealed={revealed}
                    />
                ))}
            </ol>
        </section>
    )
}
