import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import BannerSection from '../templates/sections/BannerSection'
import AboutMeTerminalSection from '../templates/sections/AboutMeTerminal'
import { useParallaxContext } from '../../context/parallaxContext'
import WorkSection from '../templates/sections/WorkSection'
import { useResyncStickyLayers } from '../../hooks/useResyncStickyLayers'

/**
 * Same color the page shows through the Parallax container
 * (peach at 20% over cream), so the sheet blends in once it settles.
 */
const pageBackground =
    'linear-gradient(rgba(239,203,189,0.2), rgba(239,203,189,0.2)), #FCF5F1'

/**
 * The banner stays pinned for the whole first page while the about-me
 * section slides up over it as an opaque sheet, the way a card stack works.
 *
 * - The sheet is opaque, so the banner can't show through it. The banner
 *   fades out completely before the sheet's edge reaches its text (see
 *   BannerSection), so the edge never slices visible text.
 * - Both layers pin over the same range on every screen size. ParallaxLayer
 *   reads `sticky` only once at mount, so a media-query-based value got stuck
 *   when the viewport changed (rotation or resize).
 * - Both are sticky layers, so they render as siblings in reading order
 *   (banner, then about me). `useResyncStickyLayers` fixes the library's
 *   stale sticky offsets after a viewport height change.
 * - Explicit z-indexes set the stacking order. WebKit can misorder sticky,
 *   will-change layers when it relies on DOM order alone.
 */
export default function ParallaxReactSpring() {
    const { parallax, pages } = useParallaxContext()
    useResyncStickyLayers(parallax)

    return (
        <Parallax
            ref={parallax}
            pages={pages}
            className={'left-0 top-0 bg-[#EFCBBD]/20'}
        >
            <ParallaxLayer sticky={{ start: 0, end: 1 }} style={{ zIndex: 0 }}>
                <BannerSection />
            </ParallaxLayer>

            <ParallaxLayer
                // start === end: arrives over the banner, then scrolls away
                // normally so the work section can follow it.
                sticky={{ start: 1, end: 1 }}
                style={{ zIndex: 10, background: pageBackground }}
                className={'flex items-center justify-center'}
            >
                <AboutMeTerminalSection />
            </ParallaxLayer>

            {/* Sticky (with start === end) only to keep DOM/reading order:
                regular layers render before sticky ones. */}
            <ParallaxLayer
                sticky={{ start: 2, end: 2 }}
                style={{ zIndex: 20, background: pageBackground }}
            >
                <WorkSection />
            </ParallaxLayer>
        </Parallax>
    )
}
