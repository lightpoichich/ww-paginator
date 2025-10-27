# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WW-Paginator** is a Vue 3 component for the Weweb visual development platform. It provides pagination functionality with two modes:
- **Collection-based**: Integrates with Weweb's collection system for data pagination
- **Custom**: Accepts manual configuration (total items, items per page, offset)

The component emits a 'change' event when users navigate between pages and automatically generates page navigation UI with smart ellipsis placement for large page ranges.

## Build & Development Commands

### Installation
```bash
npm install
```

### Local Development
```bash
npm run serve --port=[PORT]
```
Then go to Weweb editor, open the developer popup, and add `localhost:[PORT]` as a custom element.

### Build for Release
```bash
npm run build --name="ww-paginator" --type="element"
```

### Code Quality
```bash
npm run lint              # Check for linting errors
npm run lint -- --fix    # Auto-fix linting errors
npm run format           # Format code with Prettier
```

## Architecture & Key Concepts

### Main Component: `src/wwElement.vue`

The single Vue 3 component handles all functionality:

**Template Structure:**
- Navigation element with list-based button layout (previous, page numbers, next)
- Buttons conditionally hide during editing and when not applicable (e.g., prev button on first page)
- Uses Weweb's `wwObject`, `wwElement`, and `wwLayoutItemContext` framework components
- Previous button (`paginatorPrev`), page numbers (`paginatorText`), and next button (`paginatorNext`) are all customizable Weweb objects

**Key Computed Properties:**

1. **`paginationOptions`** (line 52-63)
   - Resolves pagination data from either custom mode or collection
   - Returns object with `{ limit, offset, total }`
   - Collection mode uses `wwLib.wwCollection.getPaginationOptions()`

2. **`nbPage`** (line 64-68)
   - Calculates total number of pages: `Math.ceil(total / limit)`
   - Returns sensible defaults if no pagination options available

3. **`currentPage`** (line 69-73)
   - Calculates current page index from offset: `Math.floor(offset / limit)`
   - 0-indexed

4. **`navigation`** (line 74-118)
   - Complex algorithm that generates page navigation items with ellipsis
   - Always shows page 1 and last page
   - Shows current page and adjacent pages (prev/next)
   - Inserts `...` ellipsis when there's a gap > 1 between shown pages
   - Each nav item has `{ label, index, states }` where states include 'active' for current/first/last

**Key Methods:**

1. **`goTo(index)`** (line 121-140)
   - Navigate to a specific page
   - Updates collection offset if in collection mode: `wwLib.wwCollection.setOffset()`
   - Emits 'change' event with context: `{ page, offset, limit, total }`
   - Page number in event is 1-indexed (unlike internal 0-indexed calculations)

2. **`prev()` & `next()`** (line 141-150)
   - Navigation helpers that call `goTo()` with appropriate index

**Watcher:**
- When `useCustomPagination` toggles to true, clears `collectionId` to avoid conflicts (line 40-42)

### Configuration: `ww-config.js`

Defines the element's appearance and properties in the Weweb editor:

**Editor Metadata:**
- Label: "Paginator" (EN), "Paginateur" (FR)
- Icon: 'dots-horizontal'

**Trigger Events:**
- `change` event with context object: `{ page, offset, limit, total }`

**Properties:**

- **`useCustomPagination`** (OnOff toggle)
  - Controls which pagination mode is active
  - Defaults to false (collection-based mode)

- **`collectionId`** (Collection selector)
  - Hidden when custom pagination is enabled
  - Selects which collection to paginate

- **`paginatorText`** (Hidden, defaults to ww-text)
  - Customizable component for page numbers display
  - Default wraps a text element to show page label

- **`paginatorPrev`** (Hidden, defaults to ww-icon)
  - Customizable previous button component
  - Default shows left arrow icon

- **`paginatorNext`** (Hidden, defaults to ww-icon)
  - Customizable next button component
  - Default shows right arrow icon

- **`paginatorTotal`** (Number, custom mode only)
  - Total number of items to paginate
  - Bindable to dynamic data
  - Defaults to 10

- **`paginatorLimit`** (Number, custom mode only)
  - Items per page
  - Bindable to dynamic data
  - Defaults to 5

- **`paginatorOffset`** (Number, custom mode only)
  - Current offset (0-based)
  - Bindable to dynamic data
  - Defaults to 0

## Code Quality Configuration

### ESLint (`.eslintrc`)
- Vue 3 rules enabled
- Enforces semicolons, single quotes, no console warnings
- Global variables: `wwLib` (Weweb framework), `_` (utility library)

### Prettier (`.prettierrc`)
- 4-space indentation
- Single quotes
- 120 character line width
- Trailing commas (ES5 style)
- Arrow parentheses only when necessary

## Important Notes

### Weweb Framework Integration

The component relies on Weweb-specific globals and APIs:
- **`wwLib.wwEditorHelper.EDIT_MODES.EDITION`**: Detect if in editor edit mode
- **`wwLib.wwCollection.getPaginationOptions(collectionId)`**: Get pagination state from collection
- **`wwLib.wwCollection.setOffset(collectionId, offset)`**: Update collection offset on page change
- **`wwObject`, `wwElement`, `wwLayoutItemContext`**: Framework components for rendering customizable UI elements

### Editor-Only Code

Code wrapped in `/* wwEditor:start */` and `/* wwEditor:end */` comments is removed during production builds. This includes:
- Edit mode detection (line 46-47)
- Binding validation tooltips in config (lines 52-57, 65-70, 78-83)

### Event Context Conventions

The 'change' event context uses:
- **`page`**: 1-indexed (user-facing page number)
- **`offset`**: 0-indexed (for API requests)
- **`limit`**: items per page
- **`total`**: total items across all pages

This allows consumers to use either convention depending on their needs.

### Navigation UI Smart Behavior

The `navigation` computed property implements a smart pagination UI:
- Always visible: page 1, current page, last page
- Context-sensitive: shows adjacent pages only when helpful
- Ellipsis: shown only when there's a gap > 1 between consecutive visible pages
- Example for 10 pages on page 5: `[1, ..., 4, 5*, 6, ..., 10]`
- Example for 5 pages on page 3: `[1, 2, 3*, 4, 5]` (no ellipsis needed)

## Recent Changes

Recent commits show focus on:
- Refactoring event triggering and content update handling
- Improving paginator event integration
- Cleaning up deprecated collection code
- Indicates active maintenance and ongoing refinement

## Dependencies

- **`@weweb/cli`**: Build and serve tool for Weweb elements
- **ESLint + Prettier**: Code quality and formatting

No runtime dependencies—the component is framework-agnostic from the user perspective and relies entirely on Weweb's runtime environment.
