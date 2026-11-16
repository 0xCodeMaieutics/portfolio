import netcoreLogo from '../../../assets/images/logos/netcore-96.png'

type Props = { className?: string; 'aria-hidden'?: boolean }

/**
 * Netcore mark: a navy ribbon "N" on a white square.
 * A 96px, 16-color PNG (~0.6 KB) cropped from the wide logo export; Vite inlines it.
 */
export default function NetcoreLogo({ className, ...rest }: Props) {
    return (
        <img
            src={netcoreLogo}
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
