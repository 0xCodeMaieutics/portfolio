import { SVGProps } from 'react'

/**
 * GDapps Studio mark: two white chevrons on a green rounded tile.
 *
 * Optimized from the original export (~9 KB → ~0.6 KB):
 * - 61 same-colored stripe paths clipped by a rounded-square mask covered the
 *   whole square, so they're replaced by one rounded <rect>.
 * - Two 1-unit #4ADE80 accent lines (masked inside the chevrons) are dropped:
 *   at icon size they render at ~0.1px and aren't visible.
 * - The chevron paths are kept as-is, with coordinates rounded.
 */
export default function GDappsLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'0 0 342.2 342.4'}
            fill={'none'}
            {...props}
        >
            <rect width={342.2} height={342.4} rx={63.76} fill={'#00AF6D'} />
            <path
                d={'M181.7 205H121.7L65 143.3l56.7-61.8h60l-57 61.8z'}
                fill={'#fff'}
            />
            <path
                d={'M168.7 140.1h60l56.7 61.7-56.7 61.8h-60l57-61.8z'}
                fill={'#fff'}
            />
        </svg>
    )
}
