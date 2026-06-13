# andrahartlieb.com — Project Reference

## What this is
Andra Hartlieb's personal landing page. Single-file HTML/CSS/JS site hosted on Netlify.
Live URL: https://andrahartlieb.com
Netlify project: stefanescu-andra (account: officeandra.stefanescu@gmail.com)

## Local development
```
node server.js
```
Then open http://localhost:3000
Password for edit mode: andra2025 (edit mode only works on localhost, not on the live site)

## Publishing
```
netlify deploy --prod --dir=.
```
Always test locally first. Do NOT publish until visually confirmed on localhost.

## File structure
```
stefanescu/
  index.html        ← entire site (HTML + CSS + JS in one file)
  favicon.svg       ← orange A on black, referenced via JS injection
  server.js         ← local dev server (Node.js, no dependencies)
  webinar-july.html ← webinar landing page for July 16 2026
  portrait-hero.jpg         ← hero photo
  portrait-guide.jpg        ← flipchart/drawing photo
  testimonial-tamar.jpg.png
  testimonial-romy.jpg
  testimonial-johanna.jpeg
  testimonial-tobias.jpg
  testimonial-alexander.webp
  logo-*.png/svg            ← client logos
  workshop*.jpg             ← workshop photos
```

## Critical quirk — broken HTML head
The file was saved from a browser (with Grammarly injected), so the real `<head>` is almost empty. The browser creates an implicit empty head before reaching our content. This means:
- `<link rel="icon">` in the body is IGNORED by browsers
- The favicon is injected via a `<script>` tag at the top of the body that does `document.head.appendChild(link)`
- Meta tags in the body DO work (browsers are lenient with title/meta)
- Do NOT try to restructure the HTML — it will break things

## Favicon
Defined in favicon.svg (path-based letter A, no fonts). Injected into the real DOM head via this script at the top of `<body>`:
```html
<script>
  (function(){
    var l=document.createElement('link');
    l.rel='icon'; l.type='image/svg+xml'; l.href='/favicon.svg';
    document.head.appendChild(l);
  })();
</script>
```

## Design system
```
Colors:
  --orange:      #f56121   (primary accent)
  --orange-pale: #fff3ec   (backgrounds)
  --orange-mid:  #ffd5b8   (highlights)
  --black:       #1a1a1a
  --white:       #ffffff
  --off-white:   #f9f8f6
  --gray:        #f2f1ef
  --muted:       #6a6a6a

Fonts:
  Body:     Georgia, serif
  Headings: Sriracha (Google Fonts) — h1, h2, h3, h4

Style:
  Neo-brutalist: 2-3px solid black borders, box-shadow: 3-4px solid #1a1a1a
  Buttons: border-radius: 100px, orange background
  Cards: border: 2px solid #1a1a1a, box-shadow: 4px 4px 0 #1a1a1a
```

## Page sections (in order)
1. Nav — logo + "Book a Call" button
2. Hero — headline, subtitle, CTA buttons, portrait photo
3. "What Actually Changes" — 3 shift cards (black background)
4. "The SCARF Method" — brain-based framework explanation
5. Guide section — Andra's bio + photo
6. Testimonials — Tamar, Johanna, Romy (cards) + Tobias (pull quote)
7. Workshop photos
8. Client logos
9. FAQ / "Is this for you?"
10. Final CTA
11. Cookie banner (fixed bottom)

## Calendly link
All 6 booking buttons use: https://calendly.com/andrastefanescu/discoverycall

## Testimonial photos
- Tamar: uses custom wrapper div (not .testimonial-photo class) with overflow:hidden + negative margins to crop face correctly
- Johanna, Romy: standard .testimonial-photo img
- Tobias: pull quote style, no card

## NLP / copy rules (apply to ALL text changes)
- Never use: "I help", must, should, need to, have to, push, force, struggle, problem, fail, difficult
- Use instead: notice, discover, allow, invite, choose, what becomes possible, what shifts when
- No SCARF threats (especially Status) — avoid "I help you" framing
- Milton Model presuppositions throughout
- Every caption/headline: feel first → sound/rhythm → picture → logic

## Key meta tags
```html
<title>Andra Hartlieb — Lead Any Room With Confidence</title>
<meta name="description" content="Brain-based coaching for facilitators and agile coaches who want to lead any room — with calm, clarity, and confidence.">
<meta property="og:title" content="Andra Hartlieb — Lead Any Room With Confidence">
<meta property="og:description" content="Brain-based coaching for facilitators and agile coaches who want to lead any room — with calm, clarity, and confidence.">
```

## Edit button
- Visible ONLY on localhost (hostname check in JS)
- Password: andra2025
- Saves via POST /save to server.js
- Do NOT show on andrahartlieb.com (the JS wraps edit mode in `if (window.location.hostname === 'localhost')`)

## Webinar page (webinar-july.html)
Separate standalone file. Same design system. Topic: "The #1 Reason People Resist Change". Date: July 16, 2026. Registration link: currently placeholder (#register) — update when Calendly link is ready.

## Common tasks

### Change a text section
Read index.html, find the section by a unique nearby string, use Edit tool.

### Add a testimonial
Find the testimonials section. Add a new `.testimonial-card` div following the same pattern as existing cards. Add photo to the folder.

### Change the Calendly link
Search for `calendly.com/andrastefanescu/discoverycall` — replace all 6 occurrences.

### Add a new section
Insert between existing sections. Follow the existing CSS variable/class conventions. Test on mobile (check @media max-width: 768px styles).

### Update webinar date or topic
Edit webinar-july.html directly — it's standalone, same CSS conventions.
