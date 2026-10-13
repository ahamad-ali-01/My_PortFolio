import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const app = express()
const port = Number(process.env.PORT || 4000)
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(s => s.trim()).filter(Boolean)

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({
  origin(origin, callback) {
    // Permit server-to-server and local health checks with no browser Origin.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Origin not allowed by CORS'))
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json({ limit: '12kb', strict: true }))
app.use('/api/contact', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many messages were sent from this connection. Please try again later.' }
}))

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional().default('') // Honeypot: should remain empty.
}).strict()

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.post('/api/contact', async (req, res) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ message: 'Please check your name, email and message, then try again.' })
  }
  const { name, email, subject, message, website } = parsed.data
  // Silently accept honeypot submissions to avoid helping basic bots tune their requests.
  if (website) return res.status(200).json({ message: 'Message received.' })

  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'CONTACT_TO', 'CONTACT_FROM']
  const missing = required.filter(key => !process.env[key])
  if (missing.length) {
    console.error('Contact email configuration is incomplete:', missing.join(', '))
    return res.status(503).json({ message: 'Contact email is not configured yet. Please email ahamad2711@gmail.com directly.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000
    })
    await transporter.sendMail({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      replyTo: { name, address: email },
      subject: `[Portfolio contact] ${subject || `Message from ${name}`}`.slice(0, 180),
      text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || '(not provided)'}\n\nMessage:\n${message}\n`,
      html: `<h2>New portfolio message</h2><p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Subject:</b> ${escapeHtml(subject || '(not provided)')}</p><p><b>Message:</b></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`
    })
    return res.status(200).json({ message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Contact email delivery failed:', error?.message || 'Unknown mail error')
    return res.status(502).json({ message: 'We could not deliver your message right now. Please try again or email directly.' })
  }
})

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char])
}

app.use((err, _req, res, _next) => {
  if (err?.type === 'entity.too.large') return res.status(413).json({ message: 'Request is too large.' })
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ message: 'Invalid JSON request.' })
  if (err?.message === 'Origin not allowed by CORS') return res.status(403).json({ message: 'Request origin is not allowed.' })
  console.error('Unhandled server error:', err?.message || err)
  return res.status(500).json({ message: 'An unexpected error occurred.' })
})

app.listen(port, () => console.log(`Portfolio API listening on port ${port}`))
