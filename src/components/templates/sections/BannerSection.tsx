import { animated, useSpring } from '@react-spring/web'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import helloLottie from '../../../assets/hello_lottie.json'
import IconBouncingButton from '../../molecules/buttons/IconBouncing'

import { useParallaxContext } from '../../../context/parallaxContext'
import { useLayoutEffect, useRef, useState } from 'react'
import { calculateOpacityAndScale } from '../../../utils/scrollUtils'
import gio176Avif from '../../../assets/images/gio-176.avif'
import gio352Avif from '../../../assets/images/gio-352.avif'
import gio176Webp from '../../../assets/images/gio-176.webp'
import gio352Webp from '../../../assets/images/gio-352.webp'
import gio352Jpg from '../../../assets/images/gio-352.jpg'

const avatarSizes = '(min-width: 640px) 176px, 112px'

/** Minimum fade distance, so short screens don't snap the banner away. */
const minFadeDistance = 120
/** Gap kept between the faded-out text and the arriving sheet. */
const fadeMargin = 24

/**
 * Scroll distance at which the about-me sheet's top edge (it rises from the
 * bottom, at viewport height minus scroll) reaches the bottom of the
 * headline text. Measured from layout, so it's right at any screen height.
 */
function useSheetArrival(textRef: React.RefObject<HTMLElement>) {
    const measure = () => {
        const el = textRef.current
        const textBottom = el ? el.offsetTop + el.offsetHeight : 0
        return Math.max(
            window.innerHeight - textBottom - fadeMargin,
            minFadeDistance
        )
    }
    const [arrival, setArrival] = useState(() => window.innerHeight)

    useLayoutEffect(() => {
        const update = () => setArrival(measure())
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return arrival
}

const fromTransform = { transform: 'translateY(50px)' }
const toTransform = { transform: 'translateY(0)' }

export default function BannerSection() {
    const handWaveLottieRef = useRef<LottieRefCurrentProps>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const sheetArrival = useSheetArrival(textRef)

    const { parallax, scrollTop } = useParallaxContext()
    const [helloPropsTransform] = useSpring(() => ({
        delay: 800,
        config: {
            mass: 1,
            tension: 200,
            friction: 15,
        },
        from: fromTransform,
        to: toTransform,
    }))

    const [helloPropsOpacity] = useSpring(() => ({
        delay: 600,
        from: { opacity: 0 },
        to: { opacity: 1 },
        onRest: () => {
            handWaveLottieRef.current?.play()
        },
    }))

    const [avatarProps] = useSpring(() => ({
        config: { mass: 1, tension: 200, friction: 18 },
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: { opacity: 1, transform: 'scale(1)' },
    }))

    const [handWaveLottieOpacityProps] = useSpring(() => ({
        delay: 200,
        from: { opacity: 0 },
        to: { opacity: 1 },
    }))

    const [handWaveLottieProps] = useSpring(() => ({
        delay: 400,
        config: {
            mass: 1,
            tension: 200,
            friction: 15,
        },
        from: fromTransform,
        to: toTransform,
    }))

    const handWaveStyle = {
        ...handWaveLottieOpacityProps,
        ...handWaveLottieProps,
    }

    const helloStyle = { ...helloPropsOpacity, ...helloPropsTransform }

    const fromOpacity = 1
    const toOpacity = 0

    const fromScale = 1
    const toScale = 0.7

    // Fully faded out before the sheet reaches the text, so the sheet never
    // slices through (or shows through) visible text.
    const fromScroll = 0
    const toScroll = sheetArrival

    const { opacity, scale } = calculateOpacityAndScale(
        fromScale,
        fromOpacity,
        toScale,
        toOpacity,
        toScroll,
        fromScroll,
        scrollTop
    )

    return (
        <section
            style={{
                opacity,
                transform: `scale(${scale})`,
            }}
            className={
                'flex flex-col justify-start items-center gap-y-14 pt-28 sm:gap-y-20 sm:pt-36'
            }
        >
            <div
                ref={textRef}
                className={
                    'not-selectable flex flex-col items-center space-y-8 text-center sm:space-y-12'
                }
            >
                <animated.picture style={avatarProps} className={'block'}>
                    <source
                        type={'image/avif'}
                        srcSet={`${gio176Avif} 176w, ${gio352Avif} 352w`}
                        sizes={avatarSizes}
                    />
                    <source
                        type={'image/webp'}
                        srcSet={`${gio176Webp} 176w, ${gio352Webp} 352w`}
                        sizes={avatarSizes}
                    />
                    <img
                        src={gio352Jpg}
                        alt={'Portrait of Gio smiling'}
                        width={176}
                        height={176}
                        // React 18 types lack fetchPriority; the lowercase attribute passes through
                        {...{ fetchpriority: 'high' }}
                        decoding={'async'}
                        draggable={false}
                        className={
                            'h-28 w-28 rounded-full bg-[#222] object-cover shadow-lg ring-4 ring-white/70 sm:h-44 sm:w-44'
                        }
                    />
                </animated.picture>
                <div className={'space-y-8 sm:space-y-12'}>
                    <h1>
                        <animated.span
                            style={helloStyle}
                            className={'inline-block'}
                        >
                            Hello
                        </animated.span>
                        <animated.span
                            aria-hidden
                            style={handWaveStyle}
                            className={
                                'ml-1 sm:ml-5 relative align-middle inline-block w-[90px] h-[90px] sm:w-[120px] sm:h-[120px]'
                            }
                        >
                            <Lottie
                                lottieRef={handWaveLottieRef}
                                autoplay={false}
                                style={{
                                    transform: 'translate(-50%, -50%)',
                                }}
                                className={
                                    'relative w-[150%] left-[50%] top-[30%]'
                                }
                                animationData={helloLottie}
                            />
                        </animated.span>
                        <animated.span style={helloStyle} className={'block'}>
                            I'm Gio
                        </animated.span>
                    </h1>
                    <animated.p
                        style={helloStyle}
                        className={
                            'text-3xl font-light text-ink/80 sm:text-5xl'
                        }
                    >
                        Your favorite developer
                    </animated.p>
                </div>
            </div>
            <IconBouncingButton.ArrowDown
                aria-label={'Scroll to about me'}
                // Only start the scroll animation. The container's onscroll listener
                // keeps scrollTop in sync; setting it to the end value here made the
                // banner and header jump to their final state for a frame (flicker).
                onClick={() => parallax.current?.scrollTo(1)}
            />
        </section>
    )
}
