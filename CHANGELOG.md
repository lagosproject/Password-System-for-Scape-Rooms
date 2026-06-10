# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-06-10

### Fixed
- Background image selected in setup now correctly renders full-screen behind the game modal (z-index layering issue resolved — `#bg-custom` promoted from `z-index: -1` to `0` to render above the body canvas paint).

### Changed
- Language switcher and audio toggle moved from fixed global overlay into the Setup configuration panel, so they are only visible on the config screen.
- Favicon updated from the default Vite icon to the app's own lock SVG, styled with neon-cyan (`#00f0ff`) and a glow filter matching the cyberpunk theme.

## [1.0.0] - 2026-06-09

### Added
- Complete migration of legacy Unity C# escape room app to a lightweight, responsive web application.
- Developed Setup screen with inputs for password, timer limit, attempts limit, and custom win/lose messages.
- Added custom background image selector supporting user uploads with local cache persistence (`localStorage`).
- Added responsive HTML/CSS theme styled as a cyber-hacker console with glassmorphism panels, scanlines, and animated grid effects.
- Implemented real-time synthesizer in `audio.js` using browser's **Web Audio API** to generate key clicks, buzzer failures, success cues, and warning beeps.
- Integrated a global viewport click listener to start the countdown sequence from the Wait Screen.
- Bundled application into a single standalone HTML package (`dist/index.html`) using `vite-plugin-singlefile` for easy offline delivery.
- Set up automatic GitHub Pages deployments workflow via GitHub Actions.
