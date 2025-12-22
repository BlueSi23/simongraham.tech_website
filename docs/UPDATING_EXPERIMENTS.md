# Portfolio CMS Manual

This website features a built-in **Local CMS (Content Management System)** that allows you to manage your Experiments portfolio without writing code.

## 1. Accessing the CMS
1.  Ensure your development server is running (`npm run dev`).
2.  Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)** in your browser.

> **Note:** Since this is a local CMS, changes are saved to the file system (`data/experiments.json`). You must **commit these changes to Git** to deploy them to production.

---

## 2. Managing Experiments

### Creating a New Experiment
1.  Click the **+ New Experiment** button at the top of the sidebar.
2.  A new entry will appear in the list with default placeholder data.

### Editing Basic Info
Select an experiment from the sidebar to edit its details:
-   **Title**: The name of the project.
-   **Category**: Grouping label (e.g., "Generative Art", "Spatial Computing").
-   **Short Description**: Shown on the grid card.
-   **Thumbnail**: The main cover image. You can:
    -   Paste an image URL.
    -   Click **Choose File** to upload an image from your computer (saved to `public/uploads`).

### Deleting an Experiment
1.  Select the experiment you want to remove.
2.  Click the **Delete** button (trash icon) in the top-right header.
3.  Confirm the action in the browser popup.
4.  **Warning:** This cannot be undone.

---

## 3. Page Layout Builder
Instead of a simple text field, each experiment has a custom **Layout Builder** that determines what appears in the detailed popup window.

### Adding Blocks
*   **Add Text**: Inserts a scrollable text area. Supports line breaks.
*   **Add Image**: Inserts a full-width image block. You can upload files directly here.

### Organizing Content
*   **Reorder**: Use the **Up/Down arrows** on each block to change their sequence.
*   **Remove**: Click the **Trash icon** on a block to delete it.

The content you build here will be rendered sequentially in the experiment detail overlay on the main site.

---

## 4. Saving Changes
*   Click the green **Save Changes** button in the top-right corner to persist your edits.
*   The button will show "Saving..." and then alert you when successful.
*   **Hot Reloading:** The main website (`/experiments`) will update immediately upon refresh.

---

## 5. Technical Details
*   **Data Source:** `data/experiments.json`
*   **Images:** Uploaded to `public/uploads/`
*   **Admin Page:** `app/admin/page.tsx`
*   **API Routes:**
    *   `app/api/experiments/route.ts` (Read/Write JSON)
    *   `app/api/upload/route.ts` (Handle file uploads)
