# Work Forge

**Work Forge** is Field Instrument 064: a browser-based shop control and work-traveler system for procedures, production travelers, QR labels, assets, parts, tools, kitting, closeout packages, reporting, and local project backup.

Current version: **v4.6.2 Cleanup + Built-in Fresh Start**

Work Forge runs as static HTML, CSS, and JavaScript. There is no build step, no package manager, no server-side database, and no external runtime dependency. All project data is stored in the browser using `localStorage` and can be exported/imported as JSON.

## What Work Forge does

Work Forge helps a small shop, maintenance team, maker space, lab, or fabrication group manage the flow of work from controlled procedure to completed work record.

The core workflow is:

1. Create or import procedures.
2. Create travelers from procedures or from the Control Board.
3. Move travelers through lifecycle states.
4. Kit required parts and tools.
5. Issue inventory to the traveler.
6. Execute the work steps.
7. Capture evidence, measurements, and closeout notes.
8. Print traveler packets, labels, pull sheets, and closeout packages.
9. Complete, archive, report, and export project data.

## Current app stack

The current app is split into direct-loaded layers. When deploying or uploading to a host, upload **all** of these files together.

```text
index.html
style.css
qr.js
app.js
assets.js
kitting.js
reports.js
testing.js
reliability.js
production.js
inventory.js
closeout.js
people.js
dataio.js
polish.js
board-dnd.js
cleanup.js
freshstart.js
```

`index.html` must be updated along with the JavaScript files. It contains the cache-busting script references. If `index.html` is old, the browser can load a partial old stack even if the newer `.js` files are present.

The expected current direct loader is:

```html
<script src="qr.js?v=4.6.2"></script>
<script src="app.js?v=4.6.2"></script>
<script src="assets.js?v=4.6.2"></script>
<script src="kitting.js?v=4.6.2"></script>
<script src="reports.js?v=4.6.2"></script>
<script src="testing.js?v=4.6.2"></script>
<script src="reliability.js?v=4.6.2"></script>
<script src="production.js?v=4.6.2"></script>
<script src="inventory.js?v=4.6.2"></script>
<script src="closeout.js?v=4.6.2"></script>
<script src="people.js?v=4.6.2"></script>
<script src="dataio.js?v=4.6.2"></script>
<script src="polish.js?v=4.6.2"></script>
<script src="board-dnd.js?v=4.6.2"></script>
<script src="cleanup.js?v=4.6.2"></script>
```

## How to run locally

Open `index.html` in a modern browser.

No install is required.

## How to deploy on shared hosting

Upload the full file set to the target directory on the web host.

Important deployment checklist:

1. Upload `index.html`.
2. Upload every `.js` file listed above.
3. Upload `style.css`.
4. Hard refresh the browser.
5. Use a cache-busting URL after deployment, for example:

```text
?refresh=462
```

If the left sidebar and Settings page show different versions, the browser or host is serving a mixed stack. Re-upload `index.html` and hard refresh again.

## Fresh Start for real use

When you are done testing sample data and are ready to use Work Forge for real work:

1. Open **Settings**.
2. Click **Start Fresh / Clear Sample Data**.

Or use:

```text
Fresh Start -> Start Fresh / Clear Sample Data
```

Fresh Start clears the current browser workspace records:

- jobs
- procedures
- assets
- parts/tools
- labels
- label queue
- actions
- signoffs
- archive
- log
- PM templates
- inventory moves
- people

It preserves app preferences such as dark mode and collapsed navigation. It also stores a local safety copy before clearing and offers to download a JSON backup first.

There is also a **Create Minimal Real-Use Starter** option that creates a blank real-use workspace with one empty controlled procedure and one placeholder person, but no sample jobs.

## Major pages

### Control Board

The Control Board is the main production-control screen. Traveler cards are grouped by state and can be dragged between lanes.

Lifecycle states:

- Draft
- Ready for Kitting
- Waiting on Parts
- Kitted
- Ready to Start
- In Progress
- Hold
- Waiting on Signoff
- Complete

Drag-and-drop moves still run gate checks. For example, Work Forge can warn when a traveler is moved forward without a ready kit, completed steps, closed corrective actions, or required signoffs.

### Schedule

The Schedule page shows travelers by due date, state, asset, kit status, and assignee.

### Workload and People

The People and Workload pages track assignees, reviewer backlog, open actions, overdue work, and load score by person.

### Procedures

Procedures are controlled work instructions that can be revised, cloned, released, and used to create traveler snapshots.

### PM Templates

Recurring maintenance templates can generate travelers from procedures on a schedule such as daily, weekly, monthly, quarterly, or annual.

### Jobs

The Jobs page is the traveler detail view. It includes assignment, status, steps, required parts/tools, kit state, inventory issue controls, closeout status, and packet actions.

### Kitting and Pull Sheets

Kitting compares required parts/tools against inventory/tool records and creates readiness summaries and printable pull sheets.

### Inventory Control

Inventory Control supports issuing parts to travelers, returning parts, movement history, low-stock detection, and usage by part or asset.

### Closeout

Closeout captures:

- as-found condition
- as-left condition
- completion summary
- labor notes
- evidence references
- measurements
- final reviewer
- parts-used summary

Closeout readiness is checked before completion.

### Reports and Visual Dashboard

Reports include operational summaries, aging, backlog, kitting gaps, asset history, procedure usage, closeout readiness, inventory movement, workload, and completed archive views.

### Data Exchange

Data Exchange supports:

- full project backup
- procedures-only export
- archive-only export
- backup preview before import
- validation report
- merge import
- replace import
- local safety-copy restore

### Mobile / Print

Mobile and print polish includes:

- collapsible navigation
- persistent dark mode
- mobile table wrapping
- larger touch targets
- print current page
- print selected packet
- print-specific layout cleanup

### Test Harness

The Test Harness validates the loaded app stack, page rendering, major action functions, data integrity, QR rendering, drag-and-drop board support, Fresh Start support, and current schema/version.

## Data and privacy

Work Forge stores data in browser `localStorage` under the app key. The app does not send data to a server. To move data between machines or browsers, use **Export JSON** and **Import JSON** or the **Data Exchange** page.

Clearing browser storage or using Clear Local Storage removes the local project data from that browser.

## Backup guidance

Export a full JSON backup before major changes, before clearing sample data, and before moving between deployments.

Recommended files to keep:

```text
workforge-full-backup.json
workforge-before-fresh-start.json
workforge-procedures.json
workforge-archive.json
```

## Version history summary

- **v3.2.x**: split-file architecture, real local QR rendering, diagnostics, dark-mode fixes
- **v3.3**: assets, parts, tools, labels, kitting basics
- **v3.4**: pull sheets and kitting readiness
- **v3.5**: visual dashboard and expanded reports
- **v3.6**: full test harness
- **v3.7**: reliability layer, CSV escaping, module registry, safe views
- **v4.0**: production control, lifecycle states, schedule, PM templates, production packets
- **v4.1**: inventory consumption and movement ledger
- **v4.2**: evidence and closeout packages
- **v4.3**: people, assignment, workload, reviewer backlog
- **v4.4**: import/export merge tools and safety-copy restore
- **v4.5**: mobile and print polish
- **v4.5.1**: drag-and-drop Work Control Board
- **v4.6**: cleanup, streamlined navigation, normalized data, cleaner dashboard/settings
- **v4.6.1**: Fresh Start workspace
- **v4.6.2**: Fresh Start folded directly into cleanup and direct-loaded full current stack

## Troubleshooting

### The sidebar version and Settings version do not match

The browser is loading a mixed stack. Upload the latest `index.html`, all `.js` files, and `style.css`, then hard refresh with a query string such as:

```text
?refresh=462
```

### Fresh Start is missing

Make sure `index.html` directly loads `cleanup.js?v=4.6.2`. Fresh Start is built directly into the cleanup layer in v4.6.2.

### Buttons do nothing

Open **Test Harness** and run the checks. If the harness itself does not load, confirm all script files exist on the host and that `index.html` references the same version query strings.

### Data disappeared

Check whether browser storage was cleared or whether a different browser/profile/domain is being used. If available, restore from a JSON backup or the local safety copy through Data Exchange.

## Design intent

Work Forge should feel like a practical shop instrument: part controlled procedure system, part work traveler, part label printer, part kitting board, part closeout binder, and part lightweight production-control dashboard. The app should remain portable, printable, understandable, and useful without requiring server infrastructure.
