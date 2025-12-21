---
description: What works today and what remains
---

- **Working / Implemented**
  - Core layout (`layout.tsx`) with header, footer, and dark theme.
  - Home page composition with all required sections and Firestore-backed featured experiments + latest articles.
  - Experiments grid page with filter bar and detail page with MDX body + related experiments.
  - Contact form component with client-side validation posting to `/api/contact`.
  - Contact API route persisting to Firestore and optionally sending SendGrid emails.
  - Availability page validating tokens from Firestore and embedding a calendar via iframe.

- **Pending / To Do**
  - Articles listing and detail pages mirroring experiments MDX pattern.
  - Additional UI polish and typography fine-tuning based on live visual review.
  - End-to-end wiring in a real Next.js project scaffold (Next config, Tailwind config, tsconfig, etc.).





