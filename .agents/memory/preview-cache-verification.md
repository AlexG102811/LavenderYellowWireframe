---
name: Preview cache verification
description: A Replit preview can show stale styles even when the current app and stylesheet are served successfully.
---

When a preview screenshot conflicts with the latest source or local HTTP checks, retry the preview at the same path with a harmless query-string cache buster before changing the app further.

**Why:** During QuizWave preview setup on October 26, 2026, the app and CSS both returned HTTP 200, but a screenshot at `/` showed the old unstyled state; a screenshot at `/?phase2-preview-check=1` showed the current styled app.

**How to apply:** Use this as a diagnosis step only; still verify the actual entry point and inspect source to distinguish stale rendering from missing features.
