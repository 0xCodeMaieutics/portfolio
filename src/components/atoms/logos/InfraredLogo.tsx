import infraredLogo from '../../../assets/images/logos/infrared-96.png'

type Props = { className?: string; 'aria-hidden'?: boolean }

/**
 * Infrared mark: a pink-to-amber gradient tile with a black X pattern on a black circle.
 * Raster because of the gradient: a 96px, 128-color PNG (~3 KB) that Vite inlines.
 */
export default function InfraredLogo({ className, ...rest }: Props) {
    return (
        <img
            src={infraredLogo}
            alt={''}
            width={96}
            height={96}
            decoding={'async'}
            draggable={false}
            className={className}
            {...rest}
        />
    )
}
