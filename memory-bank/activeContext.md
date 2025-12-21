---
description: Current focus, recent changes, and next steps
---

- **Current Focus**
  - Implement core user-facing flows: Home, Experiments grid/detail, Contact form/API, and gated Availability page.

- **Recently Implemented**
  - **Layout & Shell**: `layout.tsx`, `Header`, `Footer`, and `Container` with dark theme.
  - **UI Primitives**: `Button`, `Card`, `Badge` for consistent styling.
  - **Home Sections**: `Hero`, `ServiceCards`, `FeaturedExperiments`, `LatestArticles`, `ExperienceSnapshot` wired into `app/page.tsx`.
  - **Experiments**: Grid page with filter bar and detail page rendering MDX plus related experiments.
  - **Articles**: List page with Firestore-backed cards and detail page rendering MDX plus related articles.
  - **Contact Flow**: `ContactForm` component and `/api/contact` route persisting to Firestore and sending SendGrid email when configured.
  - **Availability**: Token-gated `app/availability/[token]/page.tsx` with `CalendarEmbed` iframe.

- **Immediate Next Steps**
  - Add MDX example files for experiments and ensure file slugs align with Firestore documents.
  - Add MDX example files for articles and ensure slugs align between Firestore and filenames.
  - Add Tailwind and Next.js config files if project is to be run end-to-end from this repo (or merge with an existing Next.js scaffold).


