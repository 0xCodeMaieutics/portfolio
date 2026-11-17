import { Resend } from 'resend'

/**
 * POST /api/contact — Vercel function that forwards the contact form to
 * Resend. It has to live on the server: the Resend API key must never ship
 * to the browser, and Resend's API does not accept browser (CORS) requests.
 *
 * Env:
 * - RESEND_API_KEY      required
 * - CONTACT_TO_EMAIL    inbox that receives messages
 * - CONTACT_FROM_EMAIL  sender on a domain verified in Resend,
 *                       e.g. "Portfolio <contact@giosha.dev>"
 */

const LIMITS = { name: 100, email: 254, message: 5000 } as const
/** Humans don't fill three fields in under this; bots do. */
const MIN_FILL_MS = 2500
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Payload = {
    name?: unknown
    email?: unknown
    message?: unknown
    /** Honeypot: hidden from people, filled in by bots. */
    company?: unknown
    startedAt?: unknown
}

const json = (status: number, body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    })

const clean = (value: unknown, max: number) =>
    typeof value === 'string' ? value.trim().slice(0, max) : ''

const escapeHtml = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (ch) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[ch] as string
    )

export async function POST(request: Request) {
    let payload: Payload
    try {
        payload = await request.json()
    } catch {
        return json(400, { error: 'Invalid request.' })
    }

    // Bots: pretend it worked so they don't retry with a smarter payload.
    const startedAt = Number(payload.startedAt)
    const tooFast =
        Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS
    if (clean(payload.company, 200) || tooFast) return json(200, { ok: true })

    const name = clean(payload.name, LIMITS.name)
    const email = clean(payload.email, LIMITS.email)
    const message = clean(payload.message, LIMITS.message)

    const fields: Record<string, string> = {}
    if (!name) fields.name = 'Please tell me your name.'
    if (!EMAIL_RE.test(email)) fields.email = 'Please enter a valid email.'
    if (message.length < 10) fields.message = 'Please write a few more words.'
    if (Object.keys(fields).length)
        return json(422, { error: 'Please check the form.', fields })

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    if (!apiKey || !to) {
        console.error('contact: RESEND_API_KEY or CONTACT_TO_EMAIL missing')
        return json(500, { error: 'Mail is not configured.' })
    }

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
        from:
            process.env.CONTACT_FROM_EMAIL ??
            'Portfolio <onboarding@resend.dev>',
        to,
        replyTo: email,
        subject: `New message from ${name.replace(/[\r\n]+/g, ' ')}`,
        text: `${message}\n\n— ${name} <${email}>`,
        html: `<p style="white-space:pre-wrap;font:16px/1.5 system-ui,sans-serif">${escapeHtml(
            message
        )}</p><p style="color:#666;font:14px system-ui,sans-serif">— ${escapeHtml(
            name
        )} &lt;${escapeHtml(email)}&gt;</p>`,
    })

    if (error) {
        console.error('contact: resend failed', error)
        return json(502, { error: 'Could not send the message.' })
    }

    return json(200, { ok: true })
}
