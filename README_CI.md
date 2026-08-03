# CI/CD for Blog Writer App

This repository includes two GitHub Actions workflows:

- `.github/workflows/ci.yml` — runs linters: `html-validate`, `markdownlint`, and `eslint` on push/PR to `master`.
- `.github/workflows/pages-deploy.yml` — deploys the `docs/` folder to GitHub Pages on push to `master`.

Notes:
- Ensure GitHub Pages is enabled in the repository settings (Source: `master` branch, `/docs` folder).
- To enable automatic deployments, the repository must allow GitHub Actions and Pages.
