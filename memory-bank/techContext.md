---
description: Technologies, setup, and constraints
---

- **Core Stack**
  - **Next.js 14 (App Router)** with React 18 and TypeScript.
  - **Tailwind CSS** for utility-first styling and responsive layout.
  - **Custom shadcn-style components** (`Button`, `Card`, `Badge`) instead of pulling from the full generator to keep footprint minimal.

- **Backend & Data**
  - **Firebase Admin SDK** in `lib/firestore.ts` for server-side Firestore access.
  - **Firestore collections**: `experiments`, `articles`, `contactSubmissions`, `availabilityTokens`.
  - **Contact email** via **SendGrid** in `app/api/contact/route.ts`.

- **Content**
  - **MDX** for experiment/article bodies under `content/experiments` and `content/articles`.
  - **Front matter** parsed with `gray-matter`; metadata may be mirrored in Firestore for querying.

- **Environment Requirements**
  - Firebase: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`.
  - SendGrid: `SENDGRID_API_KEY`, `CONTACT_RECIPIENT_EMAIL`, `CONTACT_FROM_EMAIL` (optional, falls back to recipient).





