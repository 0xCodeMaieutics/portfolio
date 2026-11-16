import { SVGProps } from 'react'

/**
 * Mietz mark: two black peaks on a white square.
 * Path taken from the `#mietz-logo` sprite on mietz.com (the icon only,
 * without the wordmark), centered on a white tile like the other logos.
 */
export default function MietzLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'-6 -0.5 41 41'}
            fill={'none'}
            {...props}
        >
            <rect x={-6} y={-0.5} width={41} height={41} fill={'#fff'} />
            <path
                fillRule={'evenodd'}
                clipRule={'evenodd'}
                d={
                    'M.09 21.411c-.173.305-.066.494.063.58.162.106.43.063.547-.1l4.279-5.643c.407-.362.944-.23.97.52v11.747c0 .055.193.545.531 0l12.172-16.29c.245-.284 1.18-.517 1.306.549-.12.58 0 16.009 0 16.009s.137.703.654.087l8.34-11.205s1.105-1.319 0-2.11l-8.34-4.273s-1.728-.995-2.769.345l-5.351 6.995-6.322-3.14c-1.126-.587-1.773.302-1.773.302L.09 21.41z'
                }
                fill={'#000'}
            />
        </svg>
    )
}
