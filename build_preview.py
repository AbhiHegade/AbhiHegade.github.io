#!/usr/bin/env python3
"""Build a browser-ready preview without requiring Ruby/Jekyll.

Run: python3 build_preview.py
Then open preview/index.html in Firefox.
"""
from pathlib import Path
import re
import shutil
import mistune

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "preview"
CONTENT = ROOT / "_includes" / "content"

md = mistune.create_markdown(escape=False)

def render_source(path: Path) -> str:
    text = path.read_text(encoding="utf-8")
    # Convert the small Kramdown-only class syntax used in these files.
    text = re.sub(r'\n([^\n<][^\n]*)\n\{:\s*\.lede\s*\}', r'\n<p class="lede">\1</p>', text)
    return md(text)

source = (ROOT / "index.html").read_text(encoding="utf-8")
source = re.sub(r'^---\s*\nlayout:\s*null\s*\n---\s*\n', '', source)

for name in ("home", "research"):
    pattern = re.compile(
        r'\{% capture ' + name + r'_content %\}\{% include content/' + name + r'\.md %\}\{% endcapture %\}\s*\n\s*\{\{ ' + name + r'_content \| markdownify \}\}'
    )
    source = pattern.sub(render_source(CONTENT / f"{name}.md"), source)

source = source.replace("{{ site.url }}{{ site.baseurl }}/", "https://abhihegade.github.io/")
source = source.replace("{{ '/assets/style.css' | relative_url }}", "assets/style.css")
source = source.replace("{{ '/assets/main.js' | relative_url }}", "assets/main.js")
source = source.replace("{{ '/assets/profile.jpg' | relative_url }}", "assets/profile.jpg")
source = source.replace("{{ '/assets/CV.pdf' | relative_url }}", "assets/CV.pdf")

if OUT.exists():
    shutil.rmtree(OUT)
(OUT / "assets").mkdir(parents=True)
(OUT / "index.html").write_text(source, encoding="utf-8")
shutil.copy2(ROOT / "assets" / "style.css", OUT / "assets" / "style.css")
shutil.copy2(ROOT / "assets" / "main.js", OUT / "assets" / "main.js")
shutil.copy2(ROOT / "assets" / "profile.jpg", OUT / "assets" / "profile.jpg")
cv = ROOT / "assets" / "CV.pdf"
if cv.exists():
    shutil.copy2(cv, OUT / "assets" / "CV.pdf")
print(f"Built {OUT / 'index.html'}")
