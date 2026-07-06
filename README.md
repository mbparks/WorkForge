# Work Forge

**Work Forge** is Field Instrument 064: a single-file HTML/CSS/JS web app for turning procedures into shop travelers, work packets, printable labels, QR sheets, asset stickers, cable labels, and tool tags.

It combines three related ideas into one workflow:

1. **Procedure Composer**: reusable controlled work instructions with prerequisites, tools, materials, warnings, verification, and evidence requirements.
2. **Shop Traveler**: job-specific packets for fabrication, repair, assembly, inspection, maintenance, and calibration work.
3. **Label Forge**: printable labels and QR-linked tags that connect the physical object back to the work record.

## Current version

`v1.0`

The app displays the version number in the left header so you can confirm the current build is running.

## How to run

Open `index.html` in a browser.

No build step, server, package manager, or external dependency is required.

## Included in v1.0

- Light and dark mode
- Sample project data
- Local autosave using browser localStorage
- JSON project export
- JSON project import
- Job traveler builder
- Procedure composer
- Asset list
- Parts and tools list
- Label designer
- In-browser QR SVG generation
- Printable traveler packet
- Printable label sheet
- Completed work archive
- Clear local storage control

## Suggested workflow

1. Create or load a procedure.
2. Create a job traveler from the procedure.
3. Select the asset, parts, tools, due date, priority, and assignee.
4. Work through the traveler steps.
5. Generate labels or QR sheets.
6. Print the traveler packet.
7. Complete and archive the work record.
8. Export the project JSON for backup or sharing.

## Data model

A Work Forge project JSON file contains:

- `procedures`
- `jobs`
- `assets`
- `items`
- `labels`
- `archive`

This keeps the app portable and easy to back up.

## Design direction

Work Forge is intended to feel like a practical field/shop instrument: part controlled procedure system, part manila job packet, part label printer, and part lightweight work history archive.

Future versions should preserve the single-app workflow and avoid splitting procedures, travelers, and labels into disconnected tools.
