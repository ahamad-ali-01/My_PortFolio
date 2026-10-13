# Ahamad Ali Ansari — Portfolio

A responsive, dark editorial-style portfolio built with React + Vite and an Express API. The contact form sends an email notification through SMTP; it does not expose SMTP credentials to the browser.

## Included

- Responsive layout for desktop, tablet and mobile
- Project, experience timeline, skills, education, research and contact sections based on the supplied resumes
- Contact form with server-side validation, escaped email content and a honeypot
- Helmet security headers, strict CORS allowlist, request body limit and rate limiting
- SMTP secrets kept on the backend in environment variables
- Accessible labels, form status messages and reduced-motion support

## Requirements

- Node.js 20 or newer
- An SMTP account/provider. For Gmail, enable 2-Step Verification and create an **App Password**; do not use your normal account password.

## Run locally

1. Install dependencies from the project root:

   ```bash
   npm install
   ```

2. Configure the API:

   ```bash
   cp server/.env.example server/.env
   ```

   On Windows PowerShell, use `Copy-Item server/.env.example server/.env`.

   Open `server/.env` and set `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO` and `CONTACT_FROM`. For Gmail SMTP, use `smtp.gmail.com`, port `465`, `SMTP_SECURE=true`; `SMTP_PASS` should be the 16-character Google App Password. The sender address in `CONTACT_FROM` should match the authenticated sender or a verified alias.

3. Start both apps:

   ```bash
   npm run dev
   ```

   Frontend: http://localhost:5173  
   API health check: http://localhost:4000/api/health

4. Submit the contact form. A successful submission should result in an email to `CONTACT_TO`. Check spam and SMTP provider logs if delivery is delayed.

## Production deployment

Deploy the `client` and `server` as separate services (or configure a platform to serve both). The static frontend can be hosted on Vercel/Netlify; the Express API needs a Node-capable host such as Render, Railway or a VPS.

- Set `VITE_API_URL` in the frontend build environment to the public API URL, then rebuild.
- Set `CLIENT_ORIGIN` on the API to the exact deployed frontend origin, e.g. `https://your-domain.com` (comma-separated if you have more than one).
- Set all SMTP and contact variables on the API host's secret/environment settings. Do not add secrets to Vite variables: `VITE_*` values are public.
- Configure HTTPS and a custom domain if available.
- Test `/api/health`, a valid message, invalid email, empty message and rate limiting after deployment.

## Security notes

The starter includes useful baseline controls, not a guarantee of complete production security. For higher traffic, consider a managed transactional email provider (e.g. Resend, Postmark, Amazon SES), provider-side SPF/DKIM/DMARC, CAPTCHA/Turnstile, structured logging and monitoring. Configure rate limiting behind a proxy carefully if deploying behind one; only enable Express `trust proxy` for a known, correctly configured proxy. Do not log message bodies or credentials.

## Customize before publishing

- Verify your LinkedIn, LeetCode and GeeksforGeeks URLs in `client/src/main.jsx`; the generic social links are placeholders until you replace them with your exact profile URLs.
- Update the InterviewPrep project URL to its real repository URL.
- Add a downloadable resume link if you want to make your CV public.
- The project descriptions are based on your resume and should be checked against what is implemented in each repository.
