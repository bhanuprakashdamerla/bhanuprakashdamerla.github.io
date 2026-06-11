# Bhanu Prakash — Portfolio

A macOS-inspired portfolio website, live at **[bhanuprakashdamerla.github.io](https://bhanuprakashdamerla.github.io/)**.

The site recreates the macOS desktop experience in the browser — a menu bar, a dock, and draggable app windows (Finder, Safari, Terminal, Photos, Contact, and file viewers) that open like native apps.

## Tech Stack

- [React 19](https://react.dev/) with [Vite](https://vite.dev/) for the build tooling
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [GSAP](https://gsap.com/) for window and UI animations
- [Zustand](https://zustand-demo.pmnd.rs/) (with Immer) for window state management
- [Bun](https://bun.sh/) as the package manager and script runner
- [Biome](https://biomejs.dev/) for linting and formatting

## Getting Started

```bash
# Install dependencies
bun install

# Start the dev server
bun run dev

# Lint and check formatting (add :fix to auto-fix)
bun run lint

# Format all files
bun run format

# Production build (outputs to dist/)
bun run build

# Preview the production build
bun run preview
```

## Project Structure

```
src/
├── components/   # Desktop UI — Navbar, Dock, Welcome screen, window controls
├── windows/      # App windows — Finder, Safari, Terminal, Photos, Contact, file viewers
├── hoc/          # WindowWrapper HOC providing drag, focus, and open/close behavior
├── store/        # Zustand store for window state
└── constants/    # Site content and configuration
```

## Deployment

Every push to `main` triggers a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that builds the site with Bun and deploys it to GitHub Pages.
