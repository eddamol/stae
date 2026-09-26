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
- about.html = "Um þessa síðu" info page
- style.css = shared visual styling
- script.js = video/activity player, chapter navigation, footer
- .nojekyll = disables Jekyll processing on GitHub Pages (needed for
  H5P export bundles, see below)
- activities/ = one subfolder per embedded H5P/Lumi activity (see below)

Video content belongs in the chapter HTML files rather than
in JavaScript data structures.

Each chapter page has a `<section id="chapter-page" data-chapter="N">`
and an empty `<nav id="chapter-nav">`. script.js fills that nav with
Previous/Heim/Next buttons based on the page's `data-chapter` value and
the `TOTAL_CHAPTERS` constant defined at the top of script.js. To add a
new chapter: create kafliN.html following the existing pattern (header,
`data-chapter`, empty nav, video grid, footer), and bump `TOTAL_CHAPTERS`
in script.js so the neighboring chapter picks up the new "next"/"previous"
link automatically.

Every page also has an empty `<footer id="site-footer">`, filled in by
script.js with a link to about.html.

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
- Chapter navigation (Previous/Heim/Next) and the footer link are plain
  text in forest green, Arial, sitting directly on the page background
  (`.text-button`), not filled pill buttons — underline on hover applies
  only to the label text (`.nav-label`), not to arrows (`.nav-arrow`)
- Primary call-to-action buttons (home page chapter buttons, the
  in-modal "Örpróf" quiz button) use the filled green pill style instead

## H5P / Lumi activity embeds

Videos can optionally link to a self-quiz authored in Lumi Desktop and
exported as a standalone HTML bundle (not a `.h5p` package, since there
is no backend/server to run those on). Linking is per-video, not
per-chapter:

- A video that has a quiz gets a `data-activity="activities/<name>/index.html"`
  attribute on its `.video-card` div, alongside `data-video-id`. Absent
  on videos without a quiz. Each activity's exported bundle lives in its
  own subfolder under `activities/`, since exports usually contain their
  own `index.html`.
- `.video-card[data-activity]::after` (pure CSS) shows a "+ Örpróf"
  badge on that thumbnail — no per-video markup beyond the attribute.
- The video modal shows an "Örpróf" button under the video whenever the
  clicked card had `data-activity`. Clicking it swaps the modal's
  content in place from the video iframe to the quiz iframe (never a
  second overlay, never a new tab/page) — see `showActivityView()` /
  `showVideoView()` in script.js. A "← Til baka í myndband" link swaps
  back.
- While the quiz view is showing, the modal gets an `activity-mode`
  class; the backdrop-click-to-close handler checks for this and does
  nothing in that state, so an accidental outside click can't discard
  quiz progress. Only the explicit × or the back-link exit a quiz.
- `.nojekyll` at the repo root disables Jekyll on GitHub Pages, since
  Jekyll otherwise ignores `_`-prefixed files/folders that H5P exports
  commonly include.
- Not yet done: the real H5P resizer script (for activities whose
  height varies, unlike the fixed-aspect-ratio video) should be added
  once a real Lumi export exists to test against — its content should
  come from that export or the H5P project directly, not be guessed.
  Until then, `.activity-container iframe` uses a `min-height` fallback.

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