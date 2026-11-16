import { FaArrowDown } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import { animated } from '@react-spring/web'
import { ButtonProps } from '../../types/generic'
import { useParallaxContext } from '../../../context/parallaxContext'
import { useOpacityDelay } from '../../../hooks/spring/useOpacityDelay'

type Props = Omit<ButtonProps, 'className'> & {
    Icon: IconType
}

const maxScrollTop = 200

export default function IconBouncingButton({ Icon, ...rest }: Props) {
    const { scrollTop } = useParallaxContext()
    const [fadeInProps] = useOpacityDelay(1400)
    const hidden = scrollTop >= maxScrollTop

    return (
        <animated.div style={fadeInProps}>
            <button
                type={'button'}
                tabIndex={hidden ? -1 : undefined}
                aria-hidden={hidden || undefined}
                {...rest}
                className={twMerge(
                    'grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-peach text-ink transition-[opacity,background-color,box-shadow] duration-300 ease-out hover:bg-[#E8B9A7] motion-safe:animate-scroll-cue',
                    hidden && 'pointer-events-none opacity-0'
                )}
            >
                <Icon aria-hidden className={'text-2xl'} />
            </button>
        </animated.div>
    )
}

const ArrowDownBouncingButton = ({
    ...rest
}: Omit<ButtonProps, 'className'>) => {
    return <IconBouncingButton {...rest} Icon={FaArrowDown} />
}

IconBouncingButton.ArrowDown = ArrowDownBouncingButton
