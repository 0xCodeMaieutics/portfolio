import { SVGProps } from 'react'

/**
 * Pland mark: a "P" of four blue facets on a white square.
 * Traced from the full logo (the "pland" wordmark is dropped) as four
 * polygons, centered on a white tile like the other logos.
 */
export default function PlandLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'-120 -30 480 480'}
            fill={'none'}
            {...props}
        >
            <rect x={-120} y={-30} width={480} height={480} fill={'#fff'} />
            <path d={'M0 84 120 154V410L0 338Z'} fill={'#1E40AF'} />
            <path d={'M0 84 120 10V154Z'} fill={'#2563EB'} />
            <path d={'M120 10 240 82V225L120 154Z'} fill={'#60A5FA'} />
            <path d={'M120 154 240 225 120 296Z'} fill={'#BFDBFE'} />
        </svg>
    )
}
