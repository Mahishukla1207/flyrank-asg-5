# Accessible Component Fundamentals: Technical Notes & Retrospective

## Overview
This document summarizes key accessibility findings, structural improvements, and W3C ARIA compliance patterns implemented across the React + TypeScript playground components (**Modal Dialog**, **Tabs**, and **Disclosure**).

---

## 1. Common Accessibility Issues in AI-Generated Components
* **Non-Semantic Interactive Elements**: Utilizing `<div>` or `<span>` elements with `onClick` handlers instead of native `<button>` elements, omitting keyboard accessibility (<kbd>Enter</kbd> / <kbd>Space</kbd>) and focusability.
* **Missing Focus Management**: Modals opening without transferring focus inside, or unmounting without restoring focus back to the trigger button that invoked them.
* **Tab Stop Bloat in Composite Widgets**: Treating tabs as individual sequential `Tab` stops instead of adopting a roving `tabIndex` pattern with arrow key navigation.
* **Incomplete ARIA State Binding**: Omitting dynamic attributes like `aria-expanded`, `aria-selected`, `aria-controls`, or `aria-modal="true"`.
* **Leaky Background Focus**: Allowing screen readers and keyboard navigation to leak into background content while a modal dialog is open.

---

## 2. Improvements via W3C ARIA Authoring Practices Alignment

### Modal Dialog Pattern
* Implemented `role="dialog"` and `aria-modal="true"` to signal modal context to screen readers.
* Linked dialog headers dynamically via `aria-labelledby` and body descriptions via `aria-describedby` using React `useId()`.

### Tabs Pattern
* Created explicit hierarchical relationships: `role="tablist"` containing `role="tab"` buttons controlling `role="tabpanel"` elements.
* Established reciprocal ARIA linking (`aria-controls="panel-id"` on tabs, `aria-labelledby="tab-id"` on panels).

### Disclosure (Accordion) Pattern
* Wrapped disclosure button triggers inside heading landmarks (`<h3>`), allowing screen reader users to navigate between sections using heading navigation keys.
* Utilized native `<button>` elements with dynamic `aria-expanded="true/false"` state updates and HTML `hidden` attributes on collapsed panels.

---

## 3. Focus Management Improvements
* **Modal Focus Trap**: Intercepted <kbd>Tab</kbd> and <kbd>Shift + Tab</kbd> keypresses to constrain keyboard focus strictly within the active dialog.
* **Focus Restoration**: Recorded `document.activeElement` prior to opening modals, automatically returning focus to the trigger button upon dismissal.
* **Initial Focus Allocation**: Programmatically moved focus to the first interactive element inside the modal upon rendering.
* **Roving Tabindex**: Applied `tabIndex={0}` exclusively to the currently selected tab item, setting `tabIndex={-1}` on inactive tabs to maintain a single tab stop for the entire tab list.

---

## 4. Keyboard Navigation Improvements
* **Tabs Arrow Key Navigation**: Implemented <kbd>Left Arrow</kbd>, <kbd>Right Arrow</kbd>, <kbd>Home</kbd>, and <kbd>End</kbd> key handlers with automatic focus wrapping and disabled tab skipping.
* **Modal Escape Key Dismissal**: Listened for <kbd>Escape</kbd> key events to close open dialogs instantly.
* **Disclosure Toggle Controls**: Leveraging native `<button>` semantics provided built-in, effortless activation via both <kbd>Enter</kbd> and <kbd>Space</kbd> keys.

---

## 5. ARIA Role & Binding Improvements
* Replaced plain layout wrappers with explicit ARIA roles (`dialog`, `tablist`, `tab`, `tabpanel`, `region`).
* Used React `useId()` hook to guarantee unique, collision-free DOM identifiers for `aria-controls`, `aria-labelledby`, and `aria-describedby` properties across multiple concurrent component instances.
