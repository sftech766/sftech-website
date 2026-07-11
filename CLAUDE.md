# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- If the server is already running, do not start a second instance.

## Screenshot Cleanup
- Before taking any screenshot, delete all files in `temporary screenshots/`: `rm -f "temporary screenshots/"*.png`

## Screenshot Workflow
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000/PAGE.html label WIDTH HEIGHT`
- Desktop: `node screenshot.mjs http://localhost:3000/index.html home-desktop 1440 900`
- Mobile: `node screenshot.mjs http://localhost:3000/index.html home-mobile 390 844`
- Screenshots save to `./temporary screenshots/screenshot-N-label.png` (auto-incremented, never overwritten).
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool.
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, contrast, image sizing.

## Output Defaults
- One `index.html`-style file per page, all styles inline/shared `<style>` block, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Mobile-first responsive

## Brand Assets
- Always check `brand_assets/` before designing. Use the exact color hexes and font names defined in `brand_assets/brand_guidelines_brand_voice.md` — do not invent brand colors.
- Use real logo assets from `brand_assets/assets/` once finalized. Do not use placeholders where real assets exist.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Use the SFTech brand tokens only.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Pair the display serif (headlines) with Inter (body). Apply tight tracking on large headings, generous line-height (~1.7) on body.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content beyond what's in the approved plan/copy
- Do not stop after one screenshot pass — at least 2 comparison/fix rounds
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not name any non-public team member in client-facing content — use the agreed alias for that role only (see private project notes for who maps to which alias)
