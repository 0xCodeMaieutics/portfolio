import ContactIcon, { ContactLink } from '../molecules/icons/Contact'
import {
    SiGithub,
    SiLinkedin,
    SiTelegram,
    SiWhatsapp,
    SiYoutube,
} from 'react-icons/si'
import { MdEmail, MdEvent } from 'react-icons/md'
import { useOpacityDelay } from '../../hooks/spring/useOpacityDelay'
import { animated } from '@react-spring/web'
import { useParallaxContext } from '../../context/parallaxContext'

const contactLinks: ContactLink[] = [
    {
        title: 'Github',
        href: 'https://github.com/0xCodeMaieutics',
        Icon: SiGithub,
        external: true,
        styles: {
            tile: 'bg-[#181717]',
        },
    },
    {
        title: 'Linkedin',
        href: 'https://www.linkedin.com/in/giorgi-sharashenidze-3bb9311a0/',
        Icon: SiLinkedin,
        external: true,
        styles: {
            tile: 'bg-[#0A66C2]',
        },
    },
    {
        title: 'Mail',
        href: 'mailto:meet@giosha.dev',
        Icon: MdEmail,
        external: false,
        styles: {
            tile: 'bg-[#D93025]',
        },
    },
    {
        title: 'Book a call',
        href: 'https://calendly.com/meet-giosha/30min',
        Icon: MdEvent,
        external: true,
        styles: {
            tile: 'bg-[#006BFF]',
        },
    },
    {
        title: 'Whatsapp',
        href: 'https://wa.me/+4917681376567',
        Icon: SiWhatsapp,
        external: true,
        styles: {
            tile: 'bg-[#128C7E]',
        },
    },
    {
        title: 'Telegram',
        href: 'https://t.me/xCodeMaieutics',
        Icon: SiTelegram,
        external: true,
        styles: {
            tile: 'bg-[#0088CC]',
        },
    },
    {
        title: 'Youtube',
        href: 'https://www.youtube.com/channel/UCyTmDbHBLWrjdE3WChgCpaw',
        Icon: SiYoutube,
        external: true,
        styles: {
            tile: 'bg-[#E00000]',
        },
    },
]

const backgroundDropFilterBlurredStyle = (
    changeNavBarBackgroundStyle: boolean
) => ({
    background: changeNavBarBackgroundStyle
        ? 'rgba(252,245,241,0.75)'
        : 'transparent',
    backdropFilter: changeNavBarBackgroundStyle ? 'blur(12px)' : 'blur(0)',
    WebkitBackdropFilter: changeNavBarBackgroundStyle
        ? 'blur(12px)'
        : 'blur(0)',
    borderBottom: changeNavBarBackgroundStyle
        ? '1px solid rgba(239,203,189,0.8)'
        : '1px solid transparent',
    transition: 'background 0.2s ease-out, border-color 0.2s ease-out',
})

export default function NavigationBar() {
    const { headerTransition } = useParallaxContext()
    const [navigationBarProps] = useOpacityDelay(1000)

    return (
        <animated.header
            style={{
                zIndex: 999,
                ...backgroundDropFilterBlurredStyle(headerTransition),
                ...navigationBarProps,
            }}
            className={'fixed inset-x-0 top-0 px-5 py-3 sm:px-10 sm:py-4'}
        >
            <nav aria-label={'Contact'}>
                <div className={'flex items-center justify-center gap-x-1'}>
                    {contactLinks.map((link) => (
                        <ContactIcon key={link.title} link={link} />
                    ))}
                </div>
            </nav>
        </animated.header>
    )
}
