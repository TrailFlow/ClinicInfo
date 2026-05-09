# ClinicInfo

A production-ready static medical blog built with Next.js App Router, Tailwind CSS, static data, ISR, dynamic SEO metadata, and optimized image rendering.

## Design system

- Fonts: Inter (body) and Bricolage Grotesque (headings) via Next.js font loader.
- CSS tokens and layout utilities live in [app/globals.css](app/globals.css).
- Category metadata and labels are centralized in [lib/categories.js](lib/categories.js).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

The app is ready for Vercel deployment. Blog records live in `lib/data.js`, making the project easy to connect to a CMS later.

## Email (optional)

Copy `.env.example` to `.env.local` and set:

```
GMAIL_USER=your@gmail.com
GMAIL_PASS=your-app-password
CONTACT_RECEIVER=trailflow.in@gmail.com
```

Then restart the dev server to enable contact and newsletter emails.
