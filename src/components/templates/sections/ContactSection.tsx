import {
    FormEvent,
    KeyboardEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'
import {
    FiAlertCircle,
    FiArrowRight,
    FiArrowUpRight,
    FiCheck,
} from 'react-icons/fi'
import { MdEmail, MdEvent } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { useParallaxContext } from '../../../context/parallaxContext'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

const EMAIL = 'meet@giosha.dev'
const CALL_URL = 'https://calendly.com/meet-giosha/30min'
const MESSAGE_MAX = 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Field = 'name' | 'email' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const emptyValues: Values = { name: '', email: '', message: '' }
const fieldOrder: Field[] = ['name', 'email', 'message']

/** Same rules as api/contact.ts, so the server rarely has to say no. */
function validate({ name, email, message }: Values): Errors {
    const errors: Errors = {}
    if (!name.trim()) errors.name = 'Please tell me your name.'
    if (!email.trim()) errors.email = 'I need an email to reply to.'
    else if (!EMAIL_RE.test(email.trim()))
        errors.email = 'That email looks incomplete, e.g. you@company.com.'
    if (message.trim().length < 10)
        errors.message = 'Please write a few more words (10+ characters).'
    return errors
}

const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iPhone|iPad/.test(navigator.platform)

/** Reveal once, when the element first scrolls into view. */
function useRevealOnce<T extends Element>() {
    const ref = useRef<T>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const node = ref.current
        if (!node || visible) return
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.15 }
        )
        observer.observe(node)
        return () => observer.disconnect()
    }, [visible])
    return [ref, visible] as const
}

const controlClass =
    'block w-full rounded-xl bg-white px-4 py-3 text-lg text-black ring-1 ring-inset ring-black/20 transition-shadow duration-150 placeholder:text-black/40 hover:ring-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:opacity-60'
const invalidClass =
    'ring-2 ring-danger hover:ring-danger focus-visible:ring-danger'

function FieldShell({
    id,
    label,
    error,
    aside,
    children,
}: {
    id: Field
    label: string
    error?: string
    aside?: ReactNode
    children: ReactNode
}) {
    return (
        <div>
            <div className={'mb-2 flex items-baseline justify-between gap-4'}>
                <label htmlFor={id} className={'font-semibold'}>
                    {label}
                </label>
                {aside}
            </div>
            {children}
            {error && (
                <p
                    id={`${id}-error`}
                    className={
                        'mt-2 flex items-start gap-1.5 text-[15px] text-danger'
                    }
                >
                    <FiAlertCircle
                        aria-hidden
                        className={'mt-[0.2em] h-4 w-4 shrink-0'}
                    />
                    {error}
                </p>
            )}
        </div>
    )
}

function DirectLink({
    href,
    icon,
    children,
    external,
}: {
    href: string
    icon: ReactNode
    children: ReactNode
    external?: boolean
}) {
    return (
        <a
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            className={
                'group inline-flex min-h-[44px] items-center gap-3 rounded-full'
            }
        >
            <span
                aria-hidden
                className={
                    'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-white transition duration-150 ease-out group-hover:scale-110 group-hover:bg-primary group-active:scale-90 motion-reduce:transform-none'
                }
            >
                {icon}
            </span>
            <span
                className={
                    'text-lg font-semibold underline decoration-black/20 decoration-2 underline-offset-4 transition-colors duration-200 group-hover:text-primary group-hover:decoration-primary'
                }
            >
                {children}
            </span>
            {external && (
                <>
                    <FiArrowUpRight
                        aria-hidden
                        className={
                            '-ml-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:transform-none'
                        }
                    />
                    <span className={'sr-only'}> (opens in a new tab)</span>
                </>
            )}
        </a>
    )
}

function Spinner() {
    return (
        <span
            aria-hidden
            className={
                'h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none'
            }
        />
    )
}

/**
 * Contact form at the end of the page. It follows the work section's
 * pattern (shell prompt, big heading, content) instead of a third terminal
 * window: plain, roomy fields, the black-to-primary hover of the nav icons,
 * and terminal-style mono only for small metadata.
 */
export default function ContactSection() {
    const { parallax } = useParallaxContext()
    const prefersReducedMotion = useMediaQuery(
        '(prefers-reduced-motion: reduce)'
    )
    const [sectionRef, inView] = useRevealOnce<HTMLElement>()
    const revealed = prefersReducedMotion || inView

    const [values, setValues] = useState<Values>(emptyValues)
    const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
    const [submitted, setSubmitted] = useState(false)
    const [status, setStatus] = useState<Status>('idle')
    const [serverError, setServerError] = useState('')
    const [honeypot, setHoneypot] = useState('')
    const startedAt = useRef<number>()
    const formRef = useRef<HTMLFormElement>(null)
    const successRef = useRef<HTMLHeadingElement>(null)

    const errors = validate(values)
    // Errors appear on blur, then update live while the field is corrected.
    const visibleError = (field: Field) =>
        submitted || touched[field] ? errors[field] : undefined

    useEffect(() => {
        if (status === 'sent') successRef.current?.focus()
    }, [status])

    const update = (field: Field) => (value: string) => {
        startedAt.current ??= Date.now()
        setValues((v) => ({ ...v, [field]: value }))
        if (status === 'error') setStatus('idle')
    }

    const fieldProps = (field: Field) => {
        const error = visibleError(field)
        return {
            id: field,
            name: field,
            value: values[field],
            disabled: status === 'sending',
            onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? `${field}-error` : undefined,
            className: twMerge(controlClass, error && invalidClass),
        }
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (status === 'sending') return
        setSubmitted(true)

        const firstInvalid = fieldOrder.find((field) => errors[field])
        if (firstInvalid) {
            document.getElementById(firstInvalid)?.focus()
            return
        }

        setStatus('sending')
        setServerError('')
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    company: honeypot,
                    startedAt: startedAt.current,
                }),
            })
            if (!response.ok) {
                const body = (await response.json().catch(() => ({}))) as {
                    error?: string
                }
                throw new Error(body.error || 'Something went wrong.')
            }
            setStatus('sent')
        } catch (error) {
            setServerError(
                error instanceof Error && error.message !== 'Failed to fetch'
                    ? error.message
                    : 'You seem to be offline.'
            )
            setStatus('error')
        }
    }

    function onKeyDown(event: KeyboardEvent<HTMLFormElement>) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            formRef.current?.requestSubmit()
        }
    }

    function reset() {
        setValues(emptyValues)
        setTouched({})
        setSubmitted(false)
        setStatus('idle')
        startedAt.current = undefined
    }

    const firstName = values.name.trim().split(/\s+/)[0]
    const messageLength = values.message.length

    return (
        <>
            <section
                ref={sectionRef}
                id={'contact'}
                aria-labelledby={'contact-heading'}
                className={twMerge(
                    'mx-auto w-full max-w-[1040px] px-6 pb-24 pt-24 transition duration-700 ease-out motion-reduce:transition-none sm:px-10 sm:pt-32',
                    revealed
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-6 opacity-0'
                )}
            >
                <p
                    aria-hidden
                    className={'font-mono text-sm text-black/50 sm:text-base'}
                >
                    <span className={'text-primary'}>~/contact</span>{' '}
                    <span className={'text-black/40'}>$</span> mail gio
                </p>
                <h2 id={'contact-heading'} className={'mt-2'}>
                    Let's talk
                </h2>

                <div
                    className={
                        'mt-10 grid gap-12 sm:mt-14 lg:grid-cols-12 lg:gap-16'
                    }
                >
                    <div className={'lg:col-span-5'}>
                        <p
                            className={
                                'max-w-[42ch] text-xl leading-relaxed text-black/70 sm:text-2xl'
                            }
                        >
                            Got a project, a role, or just a question? Drop me a
                            line. It lands straight in my inbox and I usually
                            reply within two days.
                        </p>

                        <p
                            className={
                                'mt-10 font-mono text-[13px] text-black/50 sm:text-sm'
                            }
                        >
                            <span aria-hidden className={'text-primary'}>
                                #
                            </span>
                            or-skip-the-form
                        </p>
                        <ul className={'mt-3 space-y-2'}>
                            <li>
                                <DirectLink
                                    href={`mailto:${EMAIL}`}
                                    icon={
                                        <MdEmail
                                            className={'h-[18px] w-[18px]'}
                                        />
                                    }
                                >
                                    {EMAIL}
                                </DirectLink>
                            </li>
                            <li>
                                <DirectLink
                                    href={CALL_URL}
                                    external
                                    icon={
                                        <MdEvent
                                            className={'h-[18px] w-[18px]'}
                                        />
                                    }
                                >
                                    Book a 30-min call
                                </DirectLink>
                            </li>
                        </ul>
                    </div>

                    <div className={'lg:col-span-7'}>
                        {status === 'sent' ? (
                            <div
                                className={
                                    'rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/10 sm:p-10'
                                }
                            >
                                <span
                                    aria-hidden
                                    className={
                                        'grid h-12 w-12 place-items-center rounded-full bg-primary text-white ring-8 ring-primary/20'
                                    }
                                >
                                    <FiCheck className={'h-6 w-6'} />
                                </span>
                                <h3
                                    ref={successRef}
                                    tabIndex={-1}
                                    className={
                                        'mt-6 text-3xl font-bold leading-tight focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-4xl'
                                    }
                                >
                                    Thanks{firstName ? `, ${firstName}` : ''}.
                                </h3>
                                <p
                                    className={
                                        'mt-3 text-lg leading-relaxed text-black/70'
                                    }
                                >
                                    Your message is in my inbox. I'll reply to{' '}
                                    <span
                                        className={'font-semibold text-black'}
                                    >
                                        {values.email.trim()}
                                    </span>{' '}
                                    soon.
                                </p>
                                <p
                                    aria-hidden
                                    className={
                                        'mt-6 font-mono text-[13px] text-black/50 sm:text-sm'
                                    }
                                >
                                    <span className={'text-primary'}>✓</span> 1
                                    message delivered
                                </p>
                                <button
                                    type={'button'}
                                    onClick={reset}
                                    className={
                                        'mt-8 min-h-[44px] rounded-full font-semibold underline decoration-black/20 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-primary hover:decoration-primary'
                                    }
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form
                                ref={formRef}
                                noValidate
                                onSubmit={(event) => void onSubmit(event)}
                                onKeyDown={onKeyDown}
                                aria-label={'Contact form'}
                                className={'space-y-6'}
                            >
                                <div className={'grid gap-6 sm:grid-cols-2'}>
                                    <FieldShell
                                        id={'name'}
                                        label={'Name'}
                                        error={visibleError('name')}
                                    >
                                        <input
                                            {...fieldProps('name')}
                                            type={'text'}
                                            autoComplete={'name'}
                                            maxLength={100}
                                            placeholder={'Ada Lovelace'}
                                            onChange={(e) =>
                                                update('name')(e.target.value)
                                            }
                                        />
                                    </FieldShell>
                                    <FieldShell
                                        id={'email'}
                                        label={'Email'}
                                        error={visibleError('email')}
                                    >
                                        <input
                                            {...fieldProps('email')}
                                            type={'email'}
                                            inputMode={'email'}
                                            autoComplete={'email'}
                                            autoCapitalize={'off'}
                                            spellCheck={false}
                                            maxLength={254}
                                            placeholder={'ada@company.com'}
                                            onChange={(e) =>
                                                update('email')(e.target.value)
                                            }
                                        />
                                    </FieldShell>
                                </div>

                                <FieldShell
                                    id={'message'}
                                    label={'Message'}
                                    error={visibleError('message')}
                                    aside={
                                        <span
                                            aria-hidden
                                            className={twMerge(
                                                'font-mono text-[13px] tabular-nums text-black/40',
                                                messageLength >
                                                    MESSAGE_MAX * 0.9 &&
                                                    'text-black/70'
                                            )}
                                        >
                                            {messageLength}/{MESSAGE_MAX}
                                        </span>
                                    }
                                >
                                    <textarea
                                        {...fieldProps('message')}
                                        rows={6}
                                        maxLength={MESSAGE_MAX}
                                        placeholder={
                                            'What are you building, and how can I help?'
                                        }
                                        onChange={(e) =>
                                            update('message')(e.target.value)
                                        }
                                        className={twMerge(
                                            fieldProps('message').className,
                                            'min-h-[160px] resize-y leading-relaxed'
                                        )}
                                    />
                                </FieldShell>

                                {/* Honeypot: off-screen for people, tempting for bots. */}
                                <div
                                    aria-hidden
                                    className={
                                        'pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0'
                                    }
                                >
                                    <label htmlFor={'company'}>Company</label>
                                    <input
                                        id={'company'}
                                        name={'company'}
                                        type={'text'}
                                        tabIndex={-1}
                                        autoComplete={'off'}
                                        value={honeypot}
                                        onChange={(e) =>
                                            setHoneypot(e.target.value)
                                        }
                                    />
                                </div>

                                {status === 'error' && (
                                    <div
                                        role={'alert'}
                                        className={
                                            'flex items-start gap-3 rounded-xl bg-danger/5 p-4 text-[15px] ring-1 ring-inset ring-danger/30'
                                        }
                                    >
                                        <FiAlertCircle
                                            aria-hidden
                                            className={
                                                'mt-[0.2em] h-4 w-4 shrink-0 text-danger'
                                            }
                                        />
                                        <p>
                                            <span className={'font-semibold'}>
                                                {serverError}
                                            </span>{' '}
                                            Your message is still here. Try
                                            again, or email me at{' '}
                                            <a
                                                href={`mailto:${EMAIL}`}
                                                className={
                                                    'font-semibold underline decoration-black/20 decoration-2 underline-offset-4 hover:text-primary hover:decoration-primary'
                                                }
                                            >
                                                {EMAIL}
                                            </a>
                                            .
                                        </p>
                                    </div>
                                )}

                                <div
                                    className={
                                        'flex flex-wrap items-center gap-x-5 gap-y-3'
                                    }
                                >
                                    <button
                                        type={'submit'}
                                        disabled={status === 'sending'}
                                        className={
                                            'group inline-flex h-12 items-center gap-2 rounded-full bg-black px-7 text-lg font-semibold text-white transition duration-150 ease-out hover:bg-primary active:scale-[0.97] disabled:cursor-progress disabled:bg-black/70 motion-reduce:transform-none'
                                        }
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <Spinner />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                Send message
                                                <FiArrowRight
                                                    aria-hidden
                                                    className={
                                                        'h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none'
                                                    }
                                                />
                                            </>
                                        )}
                                    </button>
                                    <span
                                        aria-hidden
                                        className={
                                            'hidden items-center gap-1.5 font-mono text-[13px] text-black/50 sm:inline-flex'
                                        }
                                    >
                                        or
                                        <kbd
                                            className={
                                                'rounded-md border border-black/10 bg-white px-1.5 py-0.5 text-[11px]'
                                            }
                                        >
                                            {isMac ? '⌘' : 'Ctrl'} ↵
                                        </kbd>
                                    </span>
                                </div>
                                <p role={'status'} className={'sr-only'}>
                                    {status === 'sending'
                                        ? 'Sending message…'
                                        : ''}
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <footer
                className={
                    'mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-4 border-t border-black/10 px-6 py-6 font-mono text-[13px] text-black/50 sm:px-10'
                }
            >
                <span>© {new Date().getFullYear()} Giorgi Sharashenidze</span>
                <button
                    type={'button'}
                    onClick={() => parallax.current?.scrollTo(0)}
                    aria-label={'Back to top'}
                    className={
                        'min-h-[44px] rounded transition-colors duration-200 hover:text-primary'
                    }
                >
                    cd ~ ↑
                </button>
            </footer>
        </>
    )
}
