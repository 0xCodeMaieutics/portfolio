import { ReactNode } from 'react'
import { FaMemory, FaMicrochip, FaNetworkWired } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

export type Segment = { text: string; className?: string }

type TerminalProps = {
    title: string
    shortcut?: string
    children: ReactNode
    className?: string
}

export default function Terminal({
    title,
    shortcut,
    children,
    className,
}: TerminalProps) {
    return (
        <div
            className={twMerge(
                'flex flex-col overflow-hidden rounded-xl bg-term-bg text-left shadow-[0_30px_60px_-15px_rgba(34,34,34,0.45)] ring-1 ring-black/70',
                className
            )}
        >
            <div
                className={
                    'relative flex h-8 shrink-0 sm:h-10 items-center border-b border-black bg-gradient-to-b from-[#3A3A3D] to-term-chrome px-3'
                }
            >
                <div className={'flex gap-2'}>
                    <span
                        className={
                            'h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#FF5F57]'
                        }
                    />
                    <span
                        className={
                            'h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#FEBC2E]'
                        }
                    />
                    <span
                        className={
                            'h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#28C840]'
                        }
                    />
                </div>
                <span
                    className={
                        'absolute inset-x-0 mx-auto w-fit font-sans text-xs text-term-muted sm:text-sm'
                    }
                >
                    {title}
                </span>
                {shortcut && (
                    <span
                        className={
                            'ml-auto font-sans text-[11px] text-term-muted'
                        }
                    >
                        {shortcut}
                    </span>
                )}
            </div>
            <div
                className={
                    'flex flex-1 flex-col font-mono text-[13px] leading-relaxed text-term-text sm:text-[15px] lg:text-[17px]'
                }
            >
                {children}
            </div>
        </div>
    )
}

export function TerminalCursor({ blinking }: { blinking: boolean }) {
    return (
        <span className={'relative'}>
            <span
                className={twMerge(
                    'absolute left-0 top-1/2 h-[1.25em] w-[0.6em] -translate-y-1/2 bg-term-text',
                    blinking && 'motion-safe:animate-cursor-blink'
                )}
            />
        </span>
    )
}

/**
 * Renders the first `count` characters of `segments`. The rest is kept in the
 * layout but invisible so the terminal never reflows while typing.
 */
export function TypedSegments({
    segments,
    count,
    cursor,
}: {
    segments: Segment[]
    count: number
    cursor?: ReactNode
}) {
    let remaining = count
    const visible: ReactNode[] = []
    const hidden: ReactNode[] = []

    segments.forEach(({ text, className }, i) => {
        const shown = text.slice(0, Math.max(0, remaining))
        const rest = text.slice(shown.length)
        remaining -= text.length
        if (shown)
            visible.push(
                <span key={`v${i}`} className={className}>
                    {shown}
                </span>
            )
        if (rest)
            hidden.push(
                <span key={`h${i}`} className={className}>
                    {rest}
                </span>
            )
    })

    return (
        <>
            {visible}
            {cursor}
            <span className={'invisible'}>{hidden}</span>
        </>
    )
}

function Sparkline({ points, color }: { points: string; color: string }) {
    return (
        <svg
            viewBox={'0 0 100 16'}
            preserveAspectRatio={'none'}
            className={'h-4 min-w-0 flex-1'}
        >
            <polyline
                points={points}
                fill={'none'}
                stroke={color}
                strokeWidth={1}
                vectorEffect={'non-scaling-stroke'}
            />
        </svg>
    )
}

export function TerminalStatusBar() {
    return (
        <div
            className={
                'hidden items-center gap-4 px-5 pb-3 pt-2 text-[11px] sm:flex md:text-xs'
            }
        >
            <span
                className={'flex shrink-0 items-center gap-1.5 text-[#E8A0A8]'}
            >
                <FaMemory /> 33GB
            </span>
            <Sparkline
                color={'#E8A0A8'}
                points={'0,12 40,12 70,12 72,14 74,12 100,12'}
            />
            <span
                className={'flex shrink-0 items-center gap-1.5 text-[#7FD6C2]'}
            >
                <FaMicrochip /> 17%
            </span>
            <Sparkline
                color={'#7FD6C2'}
                points={
                    '0,13 8,12 12,9 16,12 24,11 32,12 40,10 48,12 56,11 64,12 72,10 80,12 90,11 100,12'
                }
            />
            <span
                className={'flex shrink-0 items-center gap-1.5 text-[#E8A0A8]'}
            >
                <FaNetworkWired /> 1.0 kB ↓
            </span>
            <Sparkline
                color={'#7C8CF8'}
                points={'0,14 20,14 26,4 30,14 36,8 40,14 60,12 64,14 100,14'}
            />
            <span className={'shrink-0 text-[#E8A0A8]'}>1.0 kB ↑</span>
        </div>
    )
}
