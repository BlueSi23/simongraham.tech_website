## Creative Technologist Personal Site

This project is a Next.js 14 (App Router) site for a creative technologist portfolio, built with Tailwind CSS, shadcn-style UI primitives, Firestore, MDX content, and SendGrid for contact notifications.

The repository was scaffolded manually to focus on the following core pieces first:

- Home page sections (hero, services, featured experiments, latest articles, experience snapshot)
- Experiments grid and detail pages (MDX + Firestore metadata)
- Contact form + `/api/contact` route
- Gated availability page backed by Firestore tokens

You will still need to:

- Add `next.config.(js|mjs)` and Tailwind/PostCSS config files (or run `npx create-next-app` and merge this structure)
- Configure Firebase Admin SDK environment variables
- Configure SendGrid API keys and sender/recipient emails
- Add MDX files under `content/` and any real images under `public/`


