import { useEffect, useRef, useState } from 'react'

/** Reveal once, when the element first scrolls into view. */
export function useRevealOnce<T extends Element>() {
    const ref = useRef<T>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const node = ref.current
        if (!node || visible) return
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.15 }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [visible])
    return [ref, visible] as const
}
