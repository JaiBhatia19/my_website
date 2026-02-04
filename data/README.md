# Site data

- **`profile.json`** – Drives the site copy: hero, about, experience, skills, projects, footer. Keep this in sync with your **resume** when you update it so the site and PDF tell the same story.
- **`resume.pdf`** in `public/` is the canonical resume (latest accomplishments). The `/resume` route serves this file.
- **`projects.json`** – Can be generated/updated by `pnpm run build-content` (GitHub scrape) or edited by hand.
- **`linkedin-posts.md`** / **`linkedin-posts.json`** – Manual or scraped LinkedIn content for the Live Activity section.

When you update **resume.pdf**, update **profile.json** (experience, headline, summary, skills, certifications) so the site stays consistent.
