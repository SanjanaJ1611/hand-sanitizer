# Preparation of Hand Sanitizer — Engineering Chemistry Project

An interactive, animated one-page website built with plain HTML, CSS, and JavaScript (no frameworks, no backend). Ready to deploy on GitHub Pages.

## Folder Structure

```
Hand-Sanitizer-Website/
│
├── index.html              → All page sections (Home, Materials, Flowchart, Procedure, Gallery, Applications, Pros & Cons, Team, Footer)
├── style.css                → All styling, colors, animations, responsive layout
├── script.js                 → Loading screen, typing effect, scroll reveal, lightbox, slideshow, nav behavior
├── README.md                  → This file
│
└── assets/
    ├── images/               → General project images (materials, diagrams)
    ├── team/                  → Team member photos
    ├── icons/                 → Any custom icons (Font Awesome is loaded via CDN, so this is optional)
    └── background/            → Background/hero images if you replace the CSS animated background
```

## Where To Place Your Images

The site currently uses styled placeholder boxes (with icons and "Add ..." text) everywhere an image is needed, so it works immediately with no images at all. When you're ready to add your own:

1. Drop your files into the matching `assets/` subfolder, e.g. `assets/team/member1.jpg`, `assets/images/ethanol.jpg`, `assets/images/flowchart.png`.
2. Open `index.html` and find the placeholder `<div>` you want to replace (search for text like `Insert Flowchart Here`, `Add Material Name`, `Insert Experiment Photo`).
3. Replace the placeholder `<i class="...">` icon block with an `<img>` tag, for example:

   ```html
   <!-- Before -->
   <div class="material-img"><i class="fa-solid fa-flask-vial"></i></div>

   <!-- After -->
   <div class="material-img"><img src="assets/images/ethanol.jpg" alt="Ethanol"></div>
   ```

4. For team photos, replace:

   ```html
   <div class="team-photo"><i class="fa-solid fa-user"></i></div>
   ```
   with
   ```html
   <div class="team-photo"><img src="assets/team/member1.jpg" alt="Member Name"></div>
   ```
   (Add this small CSS rule once in `style.css` if you add real photos, so they crop nicely into the circle: `.team-photo img, .team-photo.large img { width:100%; height:100%; object-fit:cover; border-radius:50%; }`)

## How To Edit Content

All text lives directly in `index.html` as plain readable text — there is no database or CMS. Every placeholder is clearly labeled, for example:

- `Add Material Name`, `Add Description`
- `Add Procedure`
- `Add Applications`, `Add Advantages`, `Add Disadvantages`
- `Add Name`, `Add Roll Number`, `Add Contribution`
- `Add College Name`, `Add Year`

Just open `index.html` in any text editor (VS Code recommended), use Find & Replace, and swap the placeholder text for your real content. Colors, fonts, spacing, and animation timing can all be tuned in `style.css` under the `:root` section at the top (CSS variables for the color theme).

## How To Upload To GitHub

You mentioned you've already created the repository — here's the rest of the flow:

### Option A — Using the GitHub website (no terminal needed)
1. Open your repository on GitHub.
2. Click **Add file → Upload files**.
3. Drag in `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder (drag the whole folder — GitHub will keep the folder structure).
4. Scroll down, add a commit message like `Initial website upload`, and click **Commit changes**.

### Option B — Using Git from your computer
```bash
# 1. Clone your empty repo (skip if you already have it locally)
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME

# 2. Copy index.html, style.css, script.js, README.md, and the assets/ folder into this folder

# 3. Stage, commit, and push
git add .
git commit -m "Initial website upload"
git push origin main
```

## How To Enable GitHub Pages

1. On GitHub, open your repository.
2. Go to **Settings → Pages** (left sidebar, under "Code and automation").
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
5. Wait 1–2 minutes. GitHub will show a link like:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
6. Open that link — your site is live.

Any time you push new changes to the same branch, GitHub Pages automatically redeploys within a minute or two.

## Notes

- Fonts (Poppins, JetBrains Mono) and Font Awesome icons load from public CDNs, so an internet connection is needed the first time a visitor loads the page — no local font/icon files to manage.
- The site respects `prefers-reduced-motion` for visitors who have reduced motion turned on in their OS settings.
- Everything is a single page (`index.html`) with anchor-linked sections (`#materials`, `#procedure`, etc.), so the nav bar scrolls smoothly instead of loading new pages.
