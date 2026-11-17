import { useRef } from 'react'
import { useParallaxContext } from '../../../context/parallaxContext'
import { calculateOpacityAndScale } from '../../../utils/scrollUtils'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useTypewriter } from '../../../hooks/useTypewriter'
import Terminal, {
    Segment,
    TerminalCursor,
    TerminalStatusBar,
    TypedSegments,
} from '../../organisms/Terminal'

const aboutMeText = `I'm a software engineer from Germany. I'm passionate about building stuff whether it be developer tools or applications. I'm eager to learn new things and will never be afraid of exploring new technologies.`

const cdSegments: Segment[] = [
    { text: 'cd', className: 'text-primary' },
    { text: ' ' },
    { text: 'development/portfolio/gio/' },
]
const commandSegments: Segment[] = [
    { text: 'cat', className: 'text-primary' },
    { text: ' about.txt' },
]
const outputSegments: Segment[] = [{ text: aboutMeText }]

const joinText = (segments: Segment[]) => segments.map((s) => s.text).join('')

const typingSteps = [
    { text: joinText(cdSegments), charDelay: 55, pauseAfter: 450 },
    {
        text: joinText(commandSegments),
        charDelay: 75,
        pauseAfter: 450,
    },
    // Output prints at once, like real `cat` output.
    { text: aboutMeText, charDelay: 0, pauseAfter: 0, instant: true },
]

function Prompt({ time }: { time: string }) {
    return (
        <>
            <span className={'text-black/50'}>{time}</span>{' '}
            <span className={'font-semibold'}>gio</span>{' '}
            <span className={'text-black/50'}>(</span>
            <span className={'text-primary'}>main</span>
            <span className={'text-black/50'}>)</span>{' '}
            <span className={'text-black/50'}>✗</span>{' '}
        </>
    )
}

export default function AboutMeTerminalSection() {
    const started = useRef<boolean>(false)
    const { scrollTop } = useParallaxContext()
    const prefersReducedMotion = useMediaQuery(
        '(prefers-reduced-motion: reduce)'
    )

    const fromScroll = window.innerHeight / 2
    const toScroll = window.innerHeight

    const { opacity, scale } = calculateOpacityAndScale(
        0.85,
        0.4,
        1,
        1,
        toScroll,
        fromScroll,
        scrollTop
    )

    if (!started.current && scrollTop >= fromScroll) started.current = true

    const {
        progress: [cdCount, commandCount, outputCount],
        done,
    } = useTypewriter(typingSteps, started.current, prefersReducedMotion)

    const cdDone = cdCount >= typingSteps[0].text.length
    const commandDone = commandCount >= typingSteps[1].text.length
    const cursorIn = !cdDone
        ? 'cd'
        : !commandDone
        ? 'command'
        : done
        ? 'prompt'
        : 'output'
    const idle = !started.current || done

    return (
        <section
            aria-labelledby={'about-heading'}
            className={'w-full px-3 sm:px-6'}
        >
            <h2 id={'about-heading'} className={'sr-only'}>
                About me
            </h2>
            <p className={'sr-only'}>{aboutMeText}</p>

            <div
                aria-hidden
                style={{ opacity, transform: `scale(${scale})` }}
                className={'mx-auto w-full max-w-[1040px]'}
            >
                <Terminal
                    title={'~/d/p/p/gio'}
                    shortcut={'⌥⌘1'}
                    className={
                        'min-h-[min(460px,72svh)] sm:min-h-[min(640px,75svh)]'
                    }
                >
                    <div
                        className={
                            'flex-1 whitespace-pre-wrap break-words p-4 sm:p-6 lg:p-7'
                        }
                    >
                        {/* Boot noise recedes so the commands lead. */}
                        <div className={'text-black/50'}>
                            <div>
                                Last login: Tue Jul 18 11:04:58 on ttys000
                            </div>
                            <div>Now using node v20.18.0 (npm v10.8.2)</div>
                            <div>
                                Welcome to fish, the friendly interactive shell
                            </div>
                            <div>
                                Type{' '}
                                <span className={'text-primary'}>help</span>{' '}
                                for instructions on how to use fish
                            </div>
                        </div>
                        <div>
                            <span className={'text-black/50'}>11:05</span>{' '}
                            <span>~</span>{' '}
                            <TypedSegments
                                segments={cdSegments}
                                count={cdCount}
                                cursor={
                                    cursorIn === 'cd' && (
                                        <TerminalCursor blinking={idle} />
                                    )
                                }
                            />
                        </div>
                        {/* Laid out from the start (invisible) so nothing shifts. */}
                        <div className={cdDone ? undefined : 'invisible'}>
                            <Prompt time={'11:06'} />
                            <TypedSegments
                                segments={commandSegments}
                                count={commandCount}
                                cursor={
                                    cursorIn === 'command' && (
                                        <TerminalCursor blinking={false} />
                                    )
                                }
                            />
                        </div>
                        {/* The file's contents are Gio's own words, so they
                            switch to the site's typeface, set off by the same
                            primary rail as the work timeline. */}
                        <div
                            className={
                                'mt-4 max-w-[58ch] border-l-2 border-primary pl-4 font-titillium text-lg leading-relaxed text-black/80 sm:mt-5 sm:pl-5 sm:text-xl lg:text-[28px]'
                            }
                        >
                            <TypedSegments
                                segments={outputSegments}
                                count={outputCount}
                                cursor={
                                    cursorIn === 'output' && (
                                        <TerminalCursor blinking={false} />
                                    )
                                }
                            />
                        </div>
                        <div
                            className={
                                done ? 'mt-4 sm:mt-5' : 'invisible mt-4 sm:mt-5'
                            }
                        >
                            <Prompt time={'11:06'} />
                            {cursorIn === 'prompt' && (
                                <TerminalCursor blinking />
                            )}
                        </div>
                    </div>
                    <TerminalStatusBar />
                </Terminal>
            </div>
        </section>
    )
}
