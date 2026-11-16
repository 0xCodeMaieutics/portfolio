import { SVGProps } from 'react'

/**
 * Asavita mark: a white "V" with a leaf on a black circle.
 *
 * Hand-traced from the provided PNG (straight stroke measured from pixels,
 * leaf edges fitted as cubic Béziers); matches the PNG in all but ~1% of
 * pixels (anti-aliased edges). The PNG's thin white outer ring is left out so
 * it doesn't show as a halo on the cream background; the viewBox is cropped
 * to the black circle.
 */
export default function AsavitaLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'7.5 6.5 434 434'}
            fill={'none'}
            {...props}
        >
            <circle cx={224.5} cy={223.5} r={217} fill={'#000'} />
            <path d={'M87 131h54l106 230h-55z'} fill={'#fff'} />
            <path
                d={
                    'M334 116C266.6 192.6 241.7 272.1 246 361C313.1 288.7 334.8 216.5 334 116Z'
                }
                fill={'#fff'}
            />
        </svg>
    )
}
