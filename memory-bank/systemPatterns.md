---
description: Architectural and design patterns used in the project
---

- **Architecture**
  - **Next.js 14 App Router** with server components for data-fetching pages and client components only where interactivity is needed (e.g., forms, calendar embed).
  - **Firestore via Firebase Admin SDK** for all server-side data (experiments, articles metadata, contact submissions, availability tokens).
  - **MDX content** loaded from `content/` using `gray-matter` and `next-mdx-remote/rsc` for experiment/article bodies.

- **UI & Styling**
  - **Tailwind CSS** for all layout and typography, emphasizing dark backgrounds, fine-grain borders, and tight tracking to mirror the reference aesthetic.
  - **shadcn-style primitives** (`Button`, `Card`, `Badge`) implemented locally under `components/ui/` with small, rounded, pill-like controls.
  - **Layout shell** with `Header` + `Footer` and a shared `Container` using a `page-shell` utility class for consistent max-width.

- **Data Access Patterns**
  - **Helper functions in `lib/firestore.ts`** for each use-case: featured experiments, latest articles, all experiments, experiment by slug, related experiments, availability token lookup, and contact submission creation.
  - **Revalidation windows** on pages (`revalidate` set on Home and Experiments pages) to balance freshness with performance.

- **Content Conventions**
  - **Experiments & articles**: Slugs must match both Firestore `slug` field and MDX filename (`content/experiments/[slug].mdx`), with front matter reserved for extended metadata if needed.
  - **Availability tokens**: Stored in `availabilityTokens` with `token`, `isActive`, and `expiresAt` used for gating.





