# Work Forge

**Work Forge** is Field Instrument 064: a single-file HTML/CSS/JS web app for turning procedures into shop travelers, work packets, printable labels, QR sheets, asset stickers, cable labels, and tool tags.

It combines three related ideas into one cohesive workflow:

1. **Procedure Composer**: reusable controlled work instructions with prerequisites, tools, materials, warnings, verification, evidence requirements, hold points, and rough-step conversion.
2. **Shop Traveler**: job-specific packets for fabrication, repair, assembly, inspection, maintenance, and calibration work.
3. **Label Forge**: printable labels and QR-linked tags that connect physical objects back to the work record.

## Current version

`v2.0.1 MVP`

This hotfix restores startup and button functionality after the v2.0 MVP build exposed initialization-order bugs.

## How to run

Open `index.html` in a browser.

No build step, server, package manager, or external dependency is required.

## MVP capabilities

- Light and dark mode
- Visible version number
- Sample project data
- Local autosave using browser localStorage
- JSON project export
- JSON project import
- Project metadata
- Job traveler builder
- Procedure composer
- Rough-step-to-controlled-step converter
- Step-level warnings, verification, evidence, and hold points
- Traveler execution with done state, result, initials, notes, and evidence text
- Traveler completion percentage
- Search and filters for major sections
- Asset records
- Parts and tools records
- Label designer
- Label generation from jobs, procedures, assets, tools, and parts
- Printable traveler packet
- Printable label sheet
- Reports tab with status and asset-history views
- Completed work archive
- Restore archived jobs
- Clear local storage control

## Suggested workflow

1. Create or load a procedure.
2. Use the rough-step composer to turn plain notes into controlled steps.
3. Add warnings, verification, evidence requirements, and hold points.
4. Create a job traveler from the procedure.
5. Select the asset, due date, and assignee.
6. Work through the traveler steps and capture actual notes or evidence.
7. Generate labels or QR sheets from the job packet.
8. Print the traveler packet or label sheet.
9. Complete and archive the work record.
10. Export the project JSON for backup or sharing.

## Data model

A Work Forge project JSON file contains:

- `projectInfo`
- `procedures`
- `jobs`
- `assets`
- `items`
- `labels`
- `archive`

The v2 schema keeps the app portable and easy to back up while preserving the relationship between procedures, job travelers, assets, parts, tools, labels, and archive records.

## Design direction

Work Forge is intended to feel like a practical field/shop instrument: part controlled procedure system, part manila job packet, part label printer, and part lightweight work history archive.

Future versions should preserve the single workflow and avoid splitting procedures, travelers, and labels into disconnected tools.
