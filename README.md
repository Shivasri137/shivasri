# Shiva Sri — AI/ML Engineer & Builder

A responsive Next.js portfolio featuring Shiva Sri's supplied portrait, an adaptive dark/light theme, project search and category filters, project detail modals, command navigation, responsive layouts, and reduced-motion support.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

Import this repository in Vercel. Use the Next.js framework preset and deploy. No paid AI API or environment secret is needed for the portfolio UI.

## Profile links

- GitHub: https://github.com/Shivasri137
- LinkedIn: https://www.linkedin.com/in/shivasrijonnala/
- Contact: hello.shivasri@gmail.com

## Interactions

- Toggle between dark and light themes.
- Press Ctrl+K / Cmd+K for quick navigation.
- Filter and search project cards.
- Select a project to open its detail modal.
- Responsive mobile navigation and reduced-motion support.

## Before publishing

Review current project statuses and links. Add verified demos, screenshots, technical writeups, and reproducible evaluation evidence when available. The resume PDF is intentionally not included in this public repository.

## Stack

Next.js, React, TypeScript, CSS, and Lucide icons. Animations are CSS-based. No external AI API is needed for portfolio functionality.

## Contact form email delivery

The contact form uses `POST /api/contact`. To deliver submissions through Resend, configure these environment variables in the deployment platform (for Vercel: Project → Settings → Environment Variables):

- `RESEND_API_KEY` — required Resend API key.
- `CONTACT_TO` — optional recipient address; defaults to `hello.shivasri@gmail.com`.
- `CONTACT_FROM` — optional sender identity that has been verified in Resend; defaults to Resend's onboarding sender.

Never commit API keys. If `RESEND_API_KEY` is not set, the form responds with a configuration status and the front end falls back to opening the visitor's email application.

## Case-study visuals

Project details include high-level architecture and workflow diagrams. These diagrams summarise the available project descriptions; they are not claims that each stage is already implemented exactly as drawn. Add actual screenshots and measured evaluation results when available.
