import { SVGProps } from 'react'

/**
 * SQL Console app icon: a blue database cylinder with a terminal prompt on a
 * dark rounded tile.
 */
export default function SqlConsoleLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns={'http://www.w3.org/2000/svg'}
            viewBox={'0 0 64 64'}
            {...props}
        >
            <rect width={64} height={64} rx={14} fill={'#161a21'} />
            <path
                d={'M12 17v30c0 3.9 9 7 20 7s20-3.1 20-7V17z'}
                fill={'#4f8cff'}
            />
            <ellipse cx={32} cy={17} rx={20} ry={7} fill={'#9dbfff'} />
            <g
                fill={'none'}
                stroke={'#0f1115'}
                strokeWidth={5}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
            >
                <path d={'m21 31 8 7-8 7'} />
                <path d={'M34 45h9'} />
            </g>
        </svg>
    )
}
