import { RefObject, useEffect } from 'react'
import { IParallax } from '@react-spring/parallax'

/**
 * @react-spring/parallax only repositions a sticky layer when it switches
 * between pinned and unpinned. After a viewport height change (for example
 * mobile Safari's toolbar collapsing), an unpinned sticky layer keeps its old
 * pixel offset: it overshoots and then jumps when it pins.
 *
 * On resize, flip each layer's cached `isSticky` so the library's next
 * `update()` recomputes every sticky layer against the new height. The
 * timing matches the library's own resize handler: next frame plus 150ms.
 */
export function useResyncStickyLayers(parallax: RefObject<IParallax>) {
    useEffect(() => {
        const resync = () => {
            const instance = parallax.current
            if (!instance) return
            instance.layers.forEach((layer) => {
                if (layer.sticky) layer.isSticky = !layer.isSticky
            })
            instance.update()
        }

        let timeout: ReturnType<typeof setTimeout>
        const onResize = () => {
            requestAnimationFrame(resync)
            clearTimeout(timeout)
            timeout = setTimeout(resync, 150)
        }

        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
            clearTimeout(timeout)
        }
    }, [parallax])
}
