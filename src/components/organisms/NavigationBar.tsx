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
    },
    {
        title: 'Linkedin',
        href: 'https://www.linkedin.com/in/giorgi-sharashenidze-3bb9311a0/',
        Icon: SiLinkedin,
        external: true,
    },
    {
        title: 'Mail',
        href: 'mailto:meet@giosha.dev',
        Icon: MdEmail,
        external: false,
    },
    {
        title: 'Book a call',
        href: 'https://calendly.com/meet-giosha/30min',
        Icon: MdEvent,
        external: true,
    },
    {
        title: 'Whatsapp',
        href: 'https://wa.me/+4917681376567',
        Icon: SiWhatsapp,
        external: true,
    },
    {
        title: 'Telegram',
        href: 'https://t.me/xCodeMaieutics',
        Icon: SiTelegram,
        external: true,
    },
    {
        title: 'Youtube',
        href: 'https://www.youtube.com/channel/UCyTmDbHBLWrjdE3WChgCpaw',
        Icon: SiYoutube,
        external: true,
    },
]

const backgroundDropFilterBlurredStyle = (
    changeNavBarBackgroundStyle: boolean
) => ({
    background: changeNavBarBackgroundStyle
        ? 'rgba(255,255,255,0.75)'
        : 'transparent',
    backdropFilter: changeNavBarBackgroundStyle ? 'blur(12px)' : 'blur(0)',
    WebkitBackdropFilter: changeNavBarBackgroundStyle
        ? 'blur(12px)'
        : 'blur(0)',
    borderBottom: changeNavBarBackgroundStyle
        ? '1px solid rgba(0,0,0,0.1)'
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
