# Changelog

Entries types:

- `ADDED` for new features.
- `CHANGED` for changes in existing functionality.
- `DEPRECATED` for soon-to-be removed features.
- `REMOVED` for now removed features.
- `FIXED` for any bug fixes.
- `SECURITY` to invite users to upgrade in case of vulnerabilities.
- `UPSTREAM` to indicate code is pulled in from Mirador main repository.

# [ Unreleased ]

- ADDED : Draft annotations: `annotations.draftMarker` setting (`{ property, value }`) and a `draft` entry in `theme.palette.annotations`, drawn as a dashed orange outline unless hovered or selected

# [ 4.2.1 ]

- FIXED : Update dependencies to fix vulnerabilities
- UPSTREAM merge unpublished work
- 
# [ 4.2.0 ]

- UPSTREAM update to 4.2.3 upstream

# [ 4.1.3 ]

- FIXED : `VideoViewer`, `AnnotationsOverlayVideo` and `WorkspaceElastic` crashed with "Element type is invalid" when loading a video manifest under Vite dev-mode dependency pre-bundling (esbuild), which double-wraps the CJS default export of `@celluloid/react-player` and `react-resize-observer` as `{ default: { default: Component } }` instead of unwrapping it in one step. Added `src/lib/unwrapDefault.js` to robustly peel through however many `default` layers a given bundler leaves behind.

# [ 4.1.0 ]

- UPSTREAM update to 4.1 upstream 
- FIXED : Use upstream package number to follow Mirador versioning

# [ 1.2.13 ]

- SECURITY : Update dependencies to fix vulnerabilities
- UPSTREAM update 72cb8ad8d91840575f0c91cf97662ef165ffd39e

# [ 1.2.12 ]

- SECURITY : Update dependencies to fix vulnerabilities

# [ 1.2.11 ]

- FIXED : Update UI for MMU compatibility

# [ 1.2.9 ] 

- UPSTREAM update ff5ec95743f5ad7fe5f081055bc11b78a3d24f6c
- SECURITY : Update dependencies to fix vulnerabilities
