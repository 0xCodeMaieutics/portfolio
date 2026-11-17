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

/**
 * A light terminal: white window, black hairline, and the primary color as
 * its only accent. Traffic lights stay as quiet neutral dots.
 */
export default function Terminal({
    title,
    shortcut,
    children,
    className,
}: TerminalProps) {
    return (
        <div
            className={twMerge(
                'group/terminal flex flex-col overflow-hidden rounded-2xl bg-white text-left shadow-xl ring-1 ring-black/10',
                className
            )}
        >
            <div
                className={
                    'relative flex h-9 shrink-0 items-center border-b border-black/10 bg-white px-4 sm:h-11'
                }
            >
                <div className={'flex gap-2'}>
                    {['close', 'minimize', 'zoom'].map((key) => (
                        <span
                            key={key}
                            className={'h-3 w-3 rounded-full bg-black/10'}
                        />
                    ))}
                </div>
                <span
                    className={
                        'absolute inset-x-0 mx-auto w-fit font-mono text-xs text-black/50 sm:text-[13px]'
                    }
                >
                    {title}
                </span>
                {shortcut && (
                    <kbd
                        className={
                            'ml-auto hidden rounded-md border border-black/10 bg-white px-1.5 py-0.5 font-mono text-[11px] text-black/50 sm:inline'
                        }
                    >
                        {shortcut}
                    </kbd>
                )}
            </div>
            <div
                className={
                    'flex flex-1 flex-col font-mono text-[13px] leading-relaxed text-black sm:text-[15px] lg:text-base'
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
                    'absolute left-0 top-1/2 h-[1.2em] w-[0.55em] -translate-y-1/2 rounded-[1px] bg-black/80',
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

function Sparkline({
    points,
    className,
}: {
    points: string
    className: string
}) {
    return (
        <svg
            viewBox={'0 0 100 16'}
            preserveAspectRatio={'none'}
            className={twMerge('h-4 min-w-0 flex-1', className)}
        >
            <polyline
                points={points}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={1.25}
                strokeLinejoin={'round'}
                vectorEffect={'non-scaling-stroke'}
            />
        </svg>
    )
}

/** btop-style footer in black, with primary icons. */
export function TerminalStatusBar() {
    return (
        <div
            className={
                'hidden items-center gap-4 border-t border-black/10 px-5 py-2.5 text-[11px] text-black/50 sm:flex md:text-xs'
            }
        >
            <span className={'flex shrink-0 items-center gap-1.5'}>
                <FaMemory className={'text-primary'} /> 33GB
            </span>
            <Sparkline
                className={'text-black/30'}
                points={'0,12 40,12 70,12 72,14 74,12 100,12'}
            />
            <span className={'flex shrink-0 items-center gap-1.5'}>
                <FaMicrochip className={'text-primary'} /> 17%
            </span>
            <Sparkline
                className={'text-black/30'}
                points={
                    '0,13 8,12 12,9 16,12 24,11 32,12 40,10 48,12 56,11 64,12 72,10 80,12 90,11 100,12'
                }
            />
            <span className={'flex shrink-0 items-center gap-1.5'}>
                <FaNetworkWired className={'text-primary'} /> 1.0 kB ↓
            </span>
            <Sparkline
                className={'text-black/30'}
                points={'0,14 20,14 26,4 30,14 36,8 40,14 60,12 64,14 100,14'}
            />
            <span className={'shrink-0'}>1.0 kB ↑</span>
        </div>
    )
}
