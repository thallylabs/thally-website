# CLAUDE.md

## Copy style

- Never use em dashes in user-facing copy, metadata, blog content, public documentation, or marketing assets.
- Rewrite the sentence with a period, comma, colon, semicolon, or parentheses instead of substituting another dash.
- Before finishing copy changes, run `rg -n -P --glob '*.{ts,tsx,md,mdx,txt,json,html}' '\x{2014}|&mdash;|&#8212;' src public README.md` and resolve every match.
