import { SVGProps } from 'react'

/**
 * made2GROW mark: an "m2G" wordmark over three overlapping circles
 * (pale yellow, yellow, green) on a white square, redrawn from the
 * LinkedIn company tile.
 */
export default function Made2GrowLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns={'http://www.w3.org/2000/svg'} viewBox={'0 0 96 96'} fill={'none'} {...props}>
            <rect width={96} height={96} fill={'#fff'} />
            <circle cx={30} cy={48} r={20} fill={'#F6EDB0'} opacity={0.9} />
            <circle cx={50} cy={50} r={20} fill={'#E4E24A'} opacity={0.85} />
            <circle cx={68} cy={46} r={20} fill={'#A3C383'} opacity={0.85} />
            <text
                x={48}
                y={56}
                textAnchor={'middle'}
                fontFamily={'Helvetica, Arial, sans-serif'}
                fontSize={26}
                fill={'#1a1a1a'}
            >
                m2<tspan fontWeight={700}>G</tspan>
            </text>
        </svg>
    )
}
