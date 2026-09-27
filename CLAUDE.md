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
- activities/ = one subfolder per embedded H5P/Lumi quiz, each an
  extracted `.h5p` (see below)
- vendor/h5p-standalone/ = self-hosted H5P player runtime (see below)
- update-quiz.sh = extracts/refreshes a quiz's activities/<name> folder
  from a `.h5p` file (see below)

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
- Every page has a `.site-logo` link (to index.html) as the first
  element in `<body>`, absolutely positioned top-left against the page
  so it sits in the same spot with or without a header. Pages with the
  green header use the white `logo-stae-w.svg`; pages without one (the
  home page) use the black `logo-stae-b.svg`. `.chapter-header` has
  side padding so the centered title never runs under the logo
- Favicon: `favicon-stae.svg`, linked in every page's `<head>`
- Chapter navigation (Previous/Heim/Next) and the footer link are plain
  text in forest green, Arial, sitting directly on the page background
  (`.text-button`), not filled pill buttons — underline on hover applies
  only to the label text (`.nav-label`), not to arrows (`.nav-arrow`)
- Primary call-to-action buttons (home page chapter buttons, the
  in-modal "Örpróf" quiz button) use the filled green pill style instead

## H5P / Lumi activity embeds

Videos can optionally link to a self-quiz authored in Lumi Desktop.
Linking is per-video, not per-chapter. Lumi's HTML export is broken on
Windows for content with videos/quizzes (upstream bug, both the
all-in-one and split-file HTML formats fail) — so quizzes are shipped as
extracted `.h5p` files, played with the vendored **h5p-standalone**
runtime (`vendor/h5p-standalone/`, MIT licensed, self-hosted, no CDN, no
build step — just static JS/CSS/font files from its npm `dist`).

**Adding or updating a quiz (the whole recipe):**

1. Get the `.h5p` file from Lumi (File → Export → the `.h5p`/SCORM
   route works fine; it's only the HTML export that's broken).
2. Run `./update-quiz.sh <path-to-h5p-file> <name>` (`<name>` = short,
   descriptive, e.g. `kafli1-vextir`). This extracts the zip into
   `activities/<name>` and strips the editor-only libraries not needed
   for playback. Safe to re-run against an existing `<name>` — e.g. after
   editing the quiz in Lumi and re-exporting, run it again with the same
   name and the folder's contents are replaced. Nothing else needs to
   change: not `data-activity`, not any JS/CSS, since the site reads
   whatever is currently in that folder.
3. For a brand new quiz (not a re-export of an existing one), add
   `data-activity="activities/<name>"` to that video's `.video-card` div,
   alongside `data-video-id`.

**How it renders:** the video modal has a `<div id="activity-player">`
inside `.activity-container`. Clicking the "Örpróf" button (shown
whenever the opened video's card has `data-activity`) calls
`showActivityView()` in script.js, which pauses the YouTube video (via
`postMessage`, hence `enablejsapi=1` on its embed URL in `openVideo()`),
clears that div, and creates `new H5PPlayer(activityPlayer, {
h5pJsonPath: <the data-activity path>, frameJs:
'vendor/h5p-standalone/frame.bundle.js', frameCss:
'vendor/h5p-standalone/styles/h5p.css' })` — h5p-standalone builds its
own iframe inside that div and handles its own resizing internally, so
there's no separate resizer script to maintain. `showVideoView()` (the
"← Til baka í myndband" link) just clears the div's contents again.
Swapping is in place in the same modal, never a new tab/page/overlay —
see `openVideo()`/`closeVideo()` for how the video/activity views reset.

`H5PPlayer` is `window.H5PStandalone.H5P` captured once at the top of the
script.js activity section — **do not** reference `window.H5PStandalone`
directly inside `showActivityView()`. h5p-standalone's own frame script
removes/overwrites that global shortly after the first activity loads on
a page, so looking it up again on a second activation throws; capturing
the class reference once at load time (before that happens) is what
makes opening a quiz, going back to the video, and reopening it — any
number of times, without a page reload — actually work.

**Other pieces:**
- The "+ Örpróf" badge is a real `<span class="quiz-badge">` element,
  appended by script.js next to any `.video-card-title` whose card has
  `data-activity` — genuine DOM text (not CSS `content` or an image), so
  browser translation features pick it up. No per-video markup beyond
  the `data-activity` attribute.
- While the quiz view is showing, the modal gets an `activity-mode`
  class; the backdrop-click-to-close handler checks for this and does
  nothing in that state, so an accidental outside click can't discard
  quiz progress. Only the explicit × or the back-link exit a quiz.
- `.nojekyll` at the repo root disables Jekyll on GitHub Pages, since
  Jekyll otherwise ignores `_`-prefixed files/folders (H5P library
  folder names like `H5P.QuestionSet-1.20` are fine, but some libraries
  or editor assets use leading underscores).

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