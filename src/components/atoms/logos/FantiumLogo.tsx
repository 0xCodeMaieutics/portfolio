import { SVGProps } from 'react'

/**
 * FANtium mark: a dark "F" on a lime square.
 * Traced from the 200px avatar as three rectangles in one path (~0.3 KB).
 */
export default function FantiumLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'0 0 200 200'}
            fill={'none'}
            {...props}
        >
            <rect width={200} height={200} fill={'#BCFE1E'} />
            <path d={'M60 73h97v18H84v9h60v17H84v18H60z'} fill={'#212121'} />
        </svg>
    )
}
