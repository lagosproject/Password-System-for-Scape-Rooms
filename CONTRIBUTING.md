# Contributing Guidelines

Thank you for your interest in contributing to the Escape Room Password System! 

We welcome bug fixes, documentation improvements, and feature updates. To ensure a smooth process, please follow the guidelines below.

---

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Password-System-for-Scape-Rooms.git
   cd Password-System-for-Scape-Rooms
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Development Workflow

### Branching Strategy
- Base all your changes on the `main` branch.
- Use descriptive branch names:
  - New features: `feature/your-feature-name`
  - Bug fixes: `bugfix/your-bugfix-name`
  - Documentation: `docs/your-doc-name`

### Coding Standards
- Write clean, semantic HTML5 elements.
- Style UI using Vanilla CSS and variables defined in `src/style.css`.
- Ensure new methods in JS are modular and include basic JSDoc comments.
- Synthesize all audio signals inside `src/audio.js` using the Web Audio API rather than loading static file resources.

### Local Testing
1. Run the local dev server:
   ```bash
   npm run dev
   ```
2. Verify visual layouts in Chrome, Firefox, and Safari if possible.
3. Test layout sizing constraints by resizing your window to various aspect ratios.

---

## Submitting a Pull Request (PR)

1. Build the production package locally to ensure there are no compilation errors:
   ```bash
   npm run build
   ```
2. Check that the output file `dist/index.html` has compiled and works offline.
3. Commit your changes and push them to your fork:
   ```bash
   git commit -m "feat: describe your additions in one sentence"
   git push origin branch-name
   ```
4. Open a Pull Request from your fork's branch to our `main` branch on GitHub.
5. Fill out the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) completely (e.g. checking for leaked secrets, ensuring responsive layout, etc.).

Once submitted, the automated CI/CD pipeline will build your code and run syntax checks. A project maintainer will review your pull request shortly!
