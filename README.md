# 🌙 A Little World for Pandi

A complete, premium, 12-chapter interactive birthday website built with React + Vite.
Every chapter is its own screen with its own atmosphere, animations and interactions.
No page reloads when moving between chapters.

---

## What's inside

| # | Chapter | Highlight |
|---|---------|-----------|
| 01 | The Little Surprise | Cinematic night sky + hidden clickable star |
| 02 | Happy Birthday, Pandi | Animated cake, blow out the candles, make a wish |
| 03 | Little Memories of You | Scrapbook polaroids + fullscreen lightbox with swipe/zoom |
| 04 | A Few Moments Along the Way | Editable animated timeline (starts empty — no invented memories) |
| 05 | A Secret Envelope | Wax seal breaks, letter slides out, replay |
| 06 | A Letter for You | The complete personal letter on cream paper |
| 07 | Open When... | Four independently opening letters |
| 08 | Catch a Little Star | Eight stars, constellation lines, discovery counter |
| 09 | A Garden of Good Wishes | Six clickable flowers + full-garden bloom finale |
| 10 | A Jar Full of Little Wishes | Nine notes, no repeats until all are seen |
| 11 | A Postcard from Your Future | Thailand dream postcard with flip reveal |
| 12 | A Thousand Wishes & The Quiet Ending | Two scenes, cinematic wishes, quiet night, replay |

A persistent floating music player is available on all 12 pages. It **never autoplays**.

---

## 1. Install Node.js

1. Go to <https://nodejs.org/>
2. Download the **LTS** version (Node 18 or newer).
3. Run the installer and click **Next** until it finishes.
4. Check it worked by opening a terminal and running:

```bash
node --version
npm --version
```

You should see version numbers, not an error.

---

## 2. Install dependencies

Open a terminal in this project folder (`pandi-birthday`) and run:

```bash
npm install
```

This creates a `node_modules` folder. You only need to do this once.

---

## 3. Run locally

```bash
npm run dev
```

Open the address it prints (usually <http://localhost:5173>) in your browser.

---

## 4. Build the project

```bash
npm run build
```

A production-ready `dist/` folder is created.

---

## 5. Preview the build

```bash
npm run preview
```

Open the printed address (usually <http://localhost:4173>).

---

## 6. Replace photos

Put your photos in `public/images/memories/` using **exactly** these filenames:

```
memory-01.jpg
memory-02.jpg
memory-03.jpg
memory-04.jpg
memory-05.jpg
memory-06.jpg
memory-07.jpg
memory-08.jpg
memory-09.jpg
memory-10.jpg
memory-11.jpg
memory-12.jpg
```

- Replace `memory-01.jpg` with a different photo but keep the same filename → the new photo
  appears automatically after a refresh or redeploy. No source code changes needed.
- JPG works best. PNG/WEBP also work — just keep the filename ending correct.
- Missing photos are **hidden automatically**. No broken-image icons, no empty gaps.
- The layout re-centres around whichever photos exist.

Thailand postcard photos (optional) go in `public/images/thailand/`:

```
thailand-01.jpg
thailand-02.jpg
thailand-03.jpg
```

If they're missing, the postcard uses its own illustrated Bangkok / islands / Chiang Mai scenery.

`public/images/decorations/` and `public/images/birthday/` are free folders for any extras you
may want later. Nothing depends on them right now.

> Static hosting cannot scan a folder by itself. This project uses a **fixed manifest**
> (`src/data/memories.js`) plus automatic image-existence checks, which works on every
> static host without a backend.

---

## 7. Replace the music

Put your song here:

```
public/music/birthday-music.mp3
```

You can replace the file at any time — no code changes needed.

- Music **never plays automatically**. It starts only when the visitor presses play.
- The player supports play/pause, mute, volume, expand/collapse and a spinning disc.
- Playback continues while moving between chapters.
- If the file is missing, the player shows a calm disabled state instead of an error.

---

## 8. Edit captions

Open `src/data/memories.js`. Each entry looks like this:

```js
{
  src: '/images/memories/memory-01.jpg',
  caption: 'A little moment worth keeping ♡',
  title: 'Little Moment',
  date: '',
  description: '',
}
```

Change `caption`, `title`, `date` or `description`. All captions, order and optional dates
are controlled from this single file.

---

## 9. Edit the letter

Open `src/data/messages.js`. The full letter lives in `letterParagraphs`:

```js
export const letterParagraphs = [
  'Hey Pandi,',
  'Happy Birthday!',
  // ... one string per paragraph
];
```

Each string becomes one animated paragraph. Keep each paragraph as a single line of text
(a very long line is fine). Other text in the same file controls the welcome lines,
birthday wish, secret note, postcard and final signature.

---

## 10. Add memories to the timeline

Open `src/data/timeline.js` and add entries:

```js
export const timelineEntries = [
  {
    date: 'March 2024',
    title: 'A day I still remember',
    description: 'Write what happened here — only if you want to.',
    photo: '/images/memories/my-day.jpg', // optional — delete this line if no photo
  },
];
```

The timeline starts empty on purpose — no personal memories are invented for you.
Missing timeline photos are hidden gracefully too.

---

## 11. Deploy to Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. Go to <https://vercel.com/> and sign in with the same account.
3. Click **Add New → Project** and import the repository.
4. Vercel detects Vite automatically. Leave the settings as they are.
5. Click **Deploy**.

Your site will be live at a `vercel.app` URL. No extra configuration needed.

---

## 12. Deploy to Cloudflare Pages

1. Push the project to GitHub/GitLab.
2. Go to <https://dash.cloudflare.com/> → **Workers & Pages** → **Create** → **Pages**.
3. Connect your repository.
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or newer (set under environment variables as `NODE_VERSION=18` if needed)
5. Click **Save and Deploy**.

---

## 13. Deploy to GitHub Pages

Everything is already set up — no code changes needed.

1. Create a GitHub repository and push this folder to its `main` branch.
2. In the repository, go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Done. Every push to `main` builds and deploys the site automatically. The URL will be
   `https://your-username.github.io/your-repository-name/`.

The included `.github/workflows/deploy.yml` installs dependencies, builds the site, and
publishes the `dist` folder. It also detects the repository name and sets `VITE_BASE`
automatically, so images, music, and CSS work at the GitHub Pages sub-path. If the repo is
named `your-username.github.io`, it uses the root path instead.

You can watch progress under the repository's **Actions** tab.

> Vercel and Cloudflare Pages do not need `VITE_BASE`.

---

## Controls

- **Scroll down** to explore a chapter. When you reach the end and keep scrolling, the next chapter arrives with a moonlit page-turn animation. There are no Next / Previous chapter buttons.
- **Scroll up** at the very top of a chapter to go back to the previous one.
- On a phone, **swipe up at the end of a chapter** (or swipe left / right) to continue. Swipes on cards, letters, photos and buttons are left alone so their own interactions still work.
- **Arrow keys** ← / → also move between chapters.
- A thin line just under the chapter progress shows how far into the current chapter you are.
- **Escape** closes the photo lightbox.
- In the photo lightbox: ← / → change photo, click the photo to zoom, swipe on mobile.

---

## Accessibility & performance notes

- `prefers-reduced-motion` is respected throughout.
- Buttons have accessible labels and visible focus rings.
- All photos use lazy loading with automatic missing-file detection.
- Animations are CSS-driven and GPU-friendly; no heavy animation libraries.
- Layout is mobile-first with no horizontal overflow.

---

Made with care, just for you. ♡
