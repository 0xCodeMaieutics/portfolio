import { FiArrowUpRight } from 'react-icons/fi'
import { useParallaxContext } from '../../../context/parallaxContext'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { WorkEntry, workEntries } from '../../../data/work'

const monthFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
})

const parseMonth = (value: string) => {
    const [year, month] = value.split('-').map(Number)
    return new Date(year, month - 1, 1)
}

/** LinkedIn-style duration: counts the start and end months, e.g. "1 yr 2 mos". */
function formatDuration(start: Date, end: Date) {
    const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1
    const years = Math.floor(months / 12)
    const rest = months % 12
    const parts = []
    if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
    if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
    return parts.join(' ')
}

/** Short, stable, commit-like hash so each entry reads like a `git log` line. */
function shortHash(seed: string) {
    let h = 2166136261
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
    return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

function WorkItem({
    entry,
    index,
    revealed,
}: {
    entry: WorkEntry
    index: number
    revealed: boolean
}) {
    const start = parseMonth(entry.start)
    const end = entry.end ? parseMonth(entry.end) : new Date()
    const current = !entry.end

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
            {/* Commit node on the timeline. */}
            <span
                aria-hidden
                className={
                    'absolute left-0 top-1.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-cream sm:left-[3px]'
                }
            >
                <span
                    className={
                        current
                            ? 'h-3 w-3 rounded-full bg-[#2F8A3A] shadow-[0_0_0_4px_rgba(47,138,58,0.18)] motion-safe:animate-pulse'
                            : 'h-3 w-3 rounded-full border-2 border-ink/40 bg-cream'
                    }
                />
            </span>

            <div
                aria-hidden
                className={
                    'flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px] sm:text-sm'
                }
            >
                <span className={'text-[#9A6B12]'}>
                    {shortHash(entry.company + entry.start)}
                </span>
                {current && (
                    <span className={'text-ink/60'}>
                        (
                        <span className={'font-semibold text-[#1D7F86]'}>
                            HEAD
                        </span>{' '}
                        -&gt;{' '}
                        <span className={'font-semibold text-[#2F8A3A]'}>
                            main
                        </span>
                        )
                    </span>
                )}
            </div>

            <h3 className={'mt-2 text-3xl font-bold leading-tight sm:text-4xl'}>
                {entry.role}
            </h3>
            <p className={'mt-1 text-xl text-ink/80 sm:text-2xl'}>
                {entry.logo && (
                    <entry.logo
                        aria-hidden
                        className={
                            'mr-2.5 inline-block h-7 w-7 select-none align-[-0.3em] sm:h-8 sm:w-8'
                        }
                    />
                )}
                {entry.url ? (
                    <a
                        href={entry.url}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        className={
                            'group inline-flex items-center gap-0.5 rounded font-semibold text-ink underline decoration-peach decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-ink'
                        }
                    >
                        {entry.company}
                        <FiArrowUpRight
                            aria-hidden
                            className={
                                'h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none'
                            }
                        />
                        <span className={'sr-only'}> (opens in a new tab)</span>
                    </a>
                ) : (
                    <span className={'font-semibold text-ink'}>
                        {entry.company}
                    </span>
                )}
                <span aria-hidden className={'mx-2 text-ink/30'}>
                    ·
                </span>
                {entry.employmentType}
            </p>

            <p className={'mt-3 font-mono text-sm text-ink/70 sm:text-[15px]'}>
                <time dateTime={entry.start}>{monthFormat.format(start)}</time>
                {' – '}
                {current ? (
                    'Present'
                ) : (
                    <time dateTime={entry.end}>{monthFormat.format(end)}</time>
                )}
                <span aria-hidden className={'mx-2 text-ink/30'}>
                    ·
                </span>
                {formatDuration(start, end)}
            </p>

            {entry.description && (
                <p
                    className={
                        'mt-4 max-w-[60ch] text-lg leading-relaxed text-ink/80'
                    }
                >
                    {entry.description}
                </p>
            )}

            <ul className={'mt-4 flex flex-wrap gap-2'} aria-label={'Details'}>
                {[entry.location, entry.workplace].map((tag) => (
                    <li
                        key={tag}
                        className={
                            'rounded-full bg-peach/50 px-3 py-1 text-sm text-ink/80'
                        }
                    >
                        {tag}
                    </li>
                ))}
            </ul>

            {entry.skills && (
                <ul
                    className={'mt-3 flex flex-wrap gap-x-4 gap-y-1'}
                    aria-label={'Skills'}
                >
                    {entry.skills.map((skill) => (
                        <li
                            key={skill}
                            className={'font-mono text-[13px] text-ink/60'}
                        >
                            <span aria-hidden className={'text-[#9A6B12]'}>
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
 * Work history styled as a `git log`: each role is a commit on a vertical
 * timeline, the current one marked `HEAD -> main`. It echoes the terminal
 * above without being a second terminal window.
 */
export default function WorkSection() {
    const { scrollTop } = useParallaxContext()
    const prefersReducedMotion = useMediaQuery(
        '(prefers-reduced-motion: reduce)'
    )
    // Reveal once the section's top is well into the viewport
    // (it starts entering at one viewport height of scroll).
    const revealed =
        prefersReducedMotion || scrollTop >= window.innerHeight * 1.35

    return (
        <section
            aria-labelledby={'work-heading'}
            className={
                'mx-auto w-full max-w-[1040px] px-6 pb-16 pt-28 sm:px-10 sm:pt-36'
            }
        >
            <p
                aria-hidden
                className={'font-mono text-sm text-ink/60 sm:text-base'}
            >
                <span className={'text-[#2F8A3A]'}>~/work</span>{' '}
                <span className={'text-ink/40'}>$</span> git log --career
            </p>
            <h2 id={'work-heading'} className={'mt-2'}>
                Work
            </h2>

            <ol className={'relative mt-10 sm:mt-14'}>
                {/* Timeline rail through the commit nodes. */}
                <span
                    aria-hidden
                    className={
                        'absolute bottom-0 left-[10px] top-3 w-0.5 rounded-full bg-gradient-to-b from-peach to-peach/0 sm:left-[13px]'
                    }
                />
                {workEntries.map((entry, index) => (
                    <WorkItem
                        key={entry.company + entry.start}
                        entry={entry}
                        index={index}
                        revealed={revealed}
                    />
                ))}
            </ol>
        </section>
    )
}
