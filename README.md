# Creative Technologist Personal Site

This project is a Next.js 14 (App Router) site for a creative technologist portfolio, built with Tailwind CSS, shadcn-style UI primitives, and a custom local CMS.

## Features

*   **Responsive Design**: Immersive, "wow-factor" dark mode aesthetic with particle effects.
*   **Local CMS**: Built-in admin dashboard (`/admin`) to manage portfolio content without coding.
*   **Dynamic Experiments**: JSON-backed data storage with a custom layout builder for project case studies.
*   **Experience Timeline**: Detail-rich timeline component for career history.
*   **Contact Integration**: Ready for SendGrid/SMTP email integration.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Manage Content**:
    *   Open [http://localhost:3000/admin](http://localhost:3000/admin) to add/edit experiments.
    *   Upload images directly through the CMS.
    *   Save changes to update the local JSON database.

## Project Structure

*   `app/`: Next.js App Router pages and API routes.
*   `components/`: Reusable UI components (Hero, ServiceCards, etc.).
*   `data/`: JSON storage for content (CMS backend).
*   `public/uploads/`: Destination for CMS-uploaded media.
*   `lib/`: Utility functions and type definitions.

## Deployment

Since the CMS relies on the local filesystem (`data/experiments.json` and `public/uploads`), you should **commit your changes** before deploying.

Recommended host: **Vercel** or **Netlify**.
