# Project instructions

## Project

This is a simple static educational website for Icelandic mathematics
videos from Skali 3A.

The site is hosted using GitHub Pages.

## Technology

Use only:
- HTML
- CSS
- vanilla JavaScript

Do not introduce frameworks, build tools, package dependencies,
or unnecessary libraries unless explicitly requested.

## Structure

- index.html = home page
- kafli1.html = Chapter 1
- kafli2.html = Chapter 2
- kafli3.html = Chapter 3
- style.css = shared visual styling
- script.js = reusable video-player interaction and chapter navigation

Video content belongs in the chapter HTML files rather than
in JavaScript data structures.

Each chapter page has a `<section id="chapter-page" data-chapter="N">`
and an empty `<nav id="chapter-nav">`. script.js fills that nav with
Previous/Heim/Next buttons based on the page's `data-chapter` value and
the `TOTAL_CHAPTERS` constant defined at the top of script.js. To add a
new chapter: create kafliN.html following the existing pattern (header,
`data-chapter`, empty nav, video grid), and bump `TOTAL_CHAPTERS` in
script.js so the neighboring chapter picks up the new "next"/"previous"
link automatically.

## Design

Maintain the existing visual style unless explicitly asked to change it:

- Georgia for major headings
- Arial for body/UI text
- Forest green #235347
- Darker green #1b4138 for hover states
- Light gray page background
- Responsive video grid
- Chapter pages have a full-width green header bar (`.chapter-header`)
  with the site title in white, matching the home page title's font
  and size, so the title appears to "move up" into a header on
  navigation

## Planned: H5P / Lumi activity embeds

Not yet implemented. The site will eventually embed self-contained
H5P activities (self-quizzes with immediate feedback) authored in
Lumi Desktop, exported as standalone HTML bundles rather than `.h5p`
packages, since there is no backend/server to run those on. When this
work starts:

- Add an empty `.nojekyll` file at the repo root — GitHub Pages runs
  Jekyll by default, which ignores `_`-prefixed files/folders that
  H5P exports commonly include.
- Give each activity its own subfolder (e.g. `/activities/<name>/`)
  rather than extracting exports at the repo root, since exported
  bundles usually contain their own `index.html`.
- H5P content has variable height (unlike a fixed 16:9 video), so it
  needs its own responsive container plus the H5P resizer script
  (self-hosted vanilla JS, no CDN, no login/tracking).
- Decide whether activities reuse the existing video-modal pattern or
  get their own embed treatment, since the modal's
  backdrop-click-to-close behavior risks discarding quiz progress.

## Code style

Prefer simple, readable code over clever abstractions.

Do not introduce unnecessary complexity.

Before making substantial architectural changes, explain the
proposed approach and wait for confirmation.

## Git

Do not commit or push changes unless explicitly asked.

Before making changes, inspect the current state of the repository.

After making changes, explain what was changed and what should
be tested.