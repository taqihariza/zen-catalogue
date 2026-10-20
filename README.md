# Psychologist catalogue (zen starter)

A small static website: plain HTML, CSS and JavaScript. No frameworks, no build step.
Everything here is meant to be read and edited, so you learn how websites work.

## The files

| File | What it is | Try changing |
|---|---|---|
| `index.html` | Structure: hero, "what's on your mind", list, closing | the headline text |
| `style.css` | Look: colours, fonts, spacing | the colours at the top (`:root`) |
| `script.js` | Behaviour: loads the list, filters it | the lines in `MIND_LINES` |
| `psychologists.json` | The data: one block per psychologist | add a person |
| `images/` | Your photos (create this folder) | add `hero.jpg` |

## See it on your computer

Browsers block loading `psychologists.json` when you just double-click `index.html`.
So run a tiny local server from this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser. Edit a file, save, refresh.

## Put it on GitHub (free hosting with GitHub Pages)

1. Make a free account at github.com and click **New repository**. Name it e.g. `psychologist-catalogue`, keep it **Public** (needed for free Pages), do not add a README.
2. In this folder, in the terminal:
   ```
   git init
   git add .
   git commit -m "first version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/psychologist-catalogue.git
   git push -u origin main
   ```
3. On GitHub: **Settings -> Pages -> Source: Deploy from a branch -> main / (root) -> Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/psychologist-catalogue/`. Point your QR code there.
5. Every future change: edit, then `git add .`, `git commit -m "what you changed"`, `git push`.

## Adding a real psychologist

Copy one block in `psychologists.json`, change the details, save. Rules:
- Only list people who agreed, in writing (a chat message is fine, keep it).
- Check their practice licence yourself before setting `"licence_checked": true`.
- Use their own photo, with their permission. Never a stock photo of a "therapist".
- Each word in `concerns` should match a `concern` in `MIND_LINES` (`script.js`), or the line won't find them.

## Photos (free for commercial use)

Unsplash.com or Pexels.com. Save as `images/hero.jpg` (landscape, ideally under 500 KB;
squoosh.app compresses images for free). Keywords: "morning light window linen",
"soft shadow beige wall", "lavender field mist", "stone pebbles water ripple".
Avoid searching "therapy" or "mental health" (clichés).

## Ideas to learn next

1. Change the palette in `style.css` and watch the whole site change.
2. Add a new line to `MIND_LINES`.
3. Add a small "about" section in `index.html` and style it in `style.css`.
4. Add a privacy-friendly visitor counter (GoatCounter) to see how many people scan the QR code.
