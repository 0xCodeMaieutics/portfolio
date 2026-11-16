import bioLogo from '../../../assets/images/logos/bio-96.png'

type Props = { className?: string; 'aria-hidden'?: boolean }

/**
 * BIO mark: a light-green blob on a dark-green circle.
 * Raster because the organic shape doesn't trace cleanly: a 96px, 64-color
 * PNG (~1.7 KB, sharp up to 32px at 3x) that Vite inlines, so no request.
 */
export default function BioLogo({ className, ...rest }: Props) {
    return (
        <img
            src={bioLogo}
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
