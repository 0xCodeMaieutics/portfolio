import { useEffect, useState } from 'react'

type Step = {
    text: string
    charDelay: number
    pauseAfter: number
    /** Show the whole step at once instead of typing it (e.g. command output). */
    instant?: boolean
}

/**
 * Types each step's text in order, one character at a time
 * (or all at once for steps marked `instant`).
 * Returns how many characters of each step are visible.
 */
export function useTypewriter(steps: Step[], start: boolean, instant: boolean) {
    const [progress, setProgress] = useState<number[]>(() => steps.map(() => 0))

    useEffect(() => {
        if (!start) return

        if (instant) {
            setProgress(steps.map((s) => s.text.length))
            return
        }

        let timeout: ReturnType<typeof setTimeout>
        let stepIndex = 0
        let charIndex = 0

        const tick = () => {
            const step = steps[stepIndex]
            if (!step) return

            charIndex = step.instant ? step.text.length : charIndex + 1
            const current = charIndex
            const index = stepIndex
            setProgress((p) => p.map((v, i) => (i === index ? current : v)))

            if (charIndex >= step.text.length) {
                stepIndex += 1
                charIndex = 0
                timeout = setTimeout(tick, step.pauseAfter)
            } else {
                timeout = setTimeout(tick, step.charDelay)
            }
        }

        timeout = setTimeout(tick, 400)
        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [start, instant])

    const done = progress.every((v, i) => v >= steps[i].text.length)

    return { progress, done }
}
