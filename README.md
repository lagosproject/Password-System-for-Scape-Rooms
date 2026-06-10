<p align="center">
  <img src="https://raw.githubusercontent.com/lagosproject/Password-System-for-Scape-Rooms/main/public/favicon.svg" alt="Lock Icon" width="80" height="80" />
</p>

# Escape Room Password System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build & Deploy](https://github.com/lagosproject/Password-System-for-Scape-Rooms/actions/workflows/deploy.yml/badge.svg)](https://github.com/lagosproject/Password-System-for-Scape-Rooms/actions)

A modern, highly-aesthetic cyber-hacker console designed specifically for escape rooms to act as an interactive password decryptor and countdown timer. 

This project was successfully migrated from a legacy Unity build to a modern, lightweight web application built with **Vanilla HTML5, CSS3, and JavaScript** compiled with **Vite**.

---

## Table of Contents
- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development](#local-development)
- [Building for Production](#building-for-production)
  - [Single-File Standalone Bundle (Recommended)](#single-file-standalone-bundle-recommended)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Operator Setup Guide](#operator-setup-guide)
- [Security Policy](#security-policy)
- [License](#license)

---

## About the Project
In escape rooms, players often need to interact with a terminal to input a code and bypass a digital lock under a strict time limit. 

This application provides a full-screen, responsive hacker terminal interface that guides players through this sequence. It features a setup interface for operators, a standby "Wait" screen, an intense active decrypting screen, and custom Win/Lose feedback states.

---

## Key Features
- **Modern Cyber Aesthetic:** Built with custom glassmorphic styling, neon glows, CRT scanlines, and animated grid backgrounds.
- **Synthesized Sound Effects:** Uses the browser's native **Web Audio API** to synthesize keypad clicks, success chimes, failure buzzers, low-time warning beeps, and victory/defeat soundscapes dynamically. No audio files or internet access required.
- **Multi-Box Focus Navigation:** Input boxes auto-advance when a correct character is entered. Incorrect keys shake the corresponding box, register a failure, and clear automatically.
- **Operator Customization:**
  - Dynamic password length (up to 8 characters).
  - Configurable countdown timer (minutes) and attempt limits.
  - Upload custom background images (cached locally in the browser).
  - Custom win and lose message declarations.
- **Offline Reliability:** Compiles everything into a single standalone HTML file that runs 100% offline without local server dependencies.

---

## Tech Stack
- **Core:** HTML5, Vanilla CSS3 (Custom properties & grid systems), Vanilla ES6 JavaScript.
- **Bundler:** [Vite](https://vite.dev/) (v8)
- **Plugin:** `vite-plugin-singlefile` (inlines all CSS, JS, and graphics inside `index.html`).

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (packaged with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/lagosproject/Password-System-for-Scape-Rooms.git
   cd Password-System-for-Scape-Rooms
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```

### Local Development
To run the hot-reloading development server locally:
```bash
npm run dev
```
Open **`http://localhost:5173`** (or the port specified in terminal) in your browser.

---

## Building for Production

### Single-File Standalone Bundle (Recommended)
Escape room operators often need to deploy systems to offline, isolated computers. You can compile the entire application into a single standalone HTML file by running:
```bash
npm run build
```
This will compile and output the file at:
📂 **`dist/index.html`** (approx. `30 kB`)

**Why this is ideal:**
- You can distribute this single file via a USB stick.
- Double-clicking it opens it instantly in any modern web browser (Chrome, Edge, Firefox, Safari).
- Runs 100% offline with zero installations, servers, or environment configurations required.

---

## Deployment (GitHub Pages)

This repository includes a GitHub Actions CI/CD workflow that automatically deploys changes to GitHub Pages.

When you push code to the `main` branch:
1. GitHub Actions will check out the code and build the production bundle.
2. The compiled assets will be deployed to your GitHub Pages domain (`https://<username>.github.io/<repository-name>`).

You can configure deployment settings under the **Settings > Pages** menu of your GitHub repository.

---

## Operator Setup Guide

1. **Initial Boot:** On load, the system boots into the **Decryptor Configuration panel**.
2. **Settings Configuration:**
   - **Background Image:** Upload any local image (`.png`, `.jpg`, `.jpeg`). It will be scaled and filtered to fit the hacker theme. It is saved in the browser's `localStorage` for future boots.
   - **Decryption Key:** Enter the target passcode players must guess (1 to 8 characters).
   - **Countdown Time:** Enter the timer duration in minutes.
   - **Max Attempts:** Enter the security tries players are allowed.
   - **Success/Fail Message:** Customize the texts displayed on victory or defeat overlays.
3. **Save and Lock:** Click **Initialize Decryptor**. The settings are stored in the browser's local cache.
4. **Arming:** The screen will transition to the **Wait Screen** ("DECRYPTOR ARMED - CLICK ANYWHERE TO BEGIN").
5. **Gameplay:** Clicking anywhere starts the countdown timer and displays the code boxes.
6. **Reset:** If the game finishes (Win or Lose), the operator can click the **Reset System** button on the final screen to return to the configuration panel.

---

## Security Policy
Please review our [SECURITY.md](SECURITY.md) guidelines to report vulnerabilities responsibly.

---

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

---

## What's New in v2.0

**v2.0** marks the first fully polished web release of the Hacker Decryptor Console, after the complete migration from the original Unity desktop app.

### 🐛 Bug Fixes
- **Background image now works correctly.** The custom image uploaded by the operator now renders full-screen *behind* the game modal on all screens. The issue was a CSS `z-index` stacking conflict where the custom layer (`#bg-custom`) was being painted below the browser's canvas background. Fixed by promoting the layer from `z-index: -1` to `z-index: 0`.

### ✨ Improvements
- **Language & audio controls scoped to setup screen.** The language switcher (🇬🇧 🇪🇸 🇫🇷) and audio mute toggle are now embedded directly in the configuration panel footer — they no longer float over the game or result screens.
- **Custom lock favicon.** Replaced the default Vite bolt icon with the app's own lock SVG path, styled in neon-cyan (`#00f0ff`) with a glow filter to match the cyberpunk aesthetic.

### 🚀 Deployment
- Automatic GitHub Pages deployment via GitHub Actions on every push to `main`.
- Live demo: **[lagosproject.github.io/Password-System-for-Scape-Rooms](https://lagosproject.github.io/Password-System-for-Scape-Rooms)**
