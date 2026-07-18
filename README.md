# Academic website

This is a GitHub Pages/Jekyll site with in-page tabs. The visible text is stored in Markdown files, while the layout and tab behavior remain in `index.html` and `assets/main.js`.

## Updating the text

Edit only these files for normal content changes:

- `_includes/content/home.md` — introduction, biography, position, office, and email
- `_includes/content/research.md` — research areas
- `_includes/content/contact.md` — contact details and profile links

You may use ordinary Markdown for paragraphs, bold text, and links. Some HTML wrappers are retained to preserve the visual layout; edit the text inside them without changing the class names.


## Adding your photograph

Replace the placeholder file below with your own photograph while keeping the same filename:

```text
assets/profile.jpg
```

A square or nearly square image works best. The site crops it to a circle automatically. You can adjust the crop position in `assets/style.css` by changing `object-position` in `.profile-photo img`.

## Updating the CV

Place the current PDF at the repository root and name it:

```text
cv.pdf
```

## Publishing

Copy all files in this folder into the root of `AbhiHegade.github.io`, commit, and push to the default publishing branch. GitHub Pages will process the Markdown through Jekyll automatically.

The site contains:

- search-friendly title and description metadata;
- `Person`/`ProfilePage` structured data;
- `robots.txt`;
- `sitemap.xml`;
- exact name variants used in academic records.

## Optional local preview

With Ruby and Bundler installed:

```bash
bundle exec jekyll serve
```

A local preview is optional; GitHub Pages can build the repository directly.

## Previewing locally in Firefox

`index.html` is Jekyll source and should not be opened directly with a `file://` URL. Liquid includes such as `{% include ... %}` are processed only by GitHub Pages or Jekyll.

For a local browser-ready preview, run:

```bash
python3 build_preview.py
```

Then open:

```text
preview/index.html
```

The `preview/` directory is generated output. Continue editing the Markdown files in `_includes/content/`, not the generated preview HTML.
