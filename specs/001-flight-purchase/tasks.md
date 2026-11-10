---
description: "Task list for flight purchase automation"
---

# Tasks: Flight Purchase Automation

**Input**: Design documents from `specs/001-flight-purchase/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [quickstart.md](quickstart.md)

**Tests**: End-to-end test tasks are included because CT001 and CT002 explicitly request automated coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel because tasks touch different files and have no dependency on incomplete tasks.
- **[Story]**: Story label for user-story tasks: `[US1]` or `[US2]`.
- Every task names the exact file path it creates, changes, or validates.

## Phase 1: Setup

**Purpose**: Initialize the JavaScript Playwright test project.

- [X] T001 [P] Initialize `package.json` with `@playwright/test` as a development dependency and `test` / `test:report` scripts.
- [X] T002 [P] Create `playwright.config.js` with `tests/` as the test directory, BlazeDemo as the base URL, Chromium as the browser, one worker, and list plus HTML reporting.
- [X] T003 [P] Create root `.gitignore` entries for `node_modules/`, `playwright-report/`, and `test-results/`.
- [X] T004 Run `npm install` from the repository root and verify the generated dependency lockfile at `package-lock.json`.
- [X] T005 Install Chromium with `npx playwright install chromium` and update `specs/001-flight-purchase/quickstart.md` if the setup commands differ from the documented prerequisites.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Clear the constitution gate and establish shared browser/page behavior before either story.

**Critical gate**: No page-specific selectors or story work may begin until T006 completes successfully through Playwright MCP.

- [X] T006 Use Playwright MCP to inspect the live BlazeDemo route flow, purchase fields, card selector values, optional-field behavior, and confirmation; record verified findings in `specs/001-flight-purchase/research.md` and change the blocked constitution gate in `specs/001-flight-purchase/plan.md` only after successful inspection.
- [X] T007 Create `tests/pages/base.page.js` with only behavior genuinely shared by every page object.
- [X] T008 [P] Create `tests/pages/home.page.js` for departure/destination selection and flight search, extending `base.page.js`.
- [X] T009 [P] Create `tests/pages/flights.page.js` for available-flight selection and reservation details, extending `base.page.js`.
- [X] T010 [P] Create `tests/pages/purchase.page.js` for purchase-form locators and actions, extending `base.page.js` and keeping assertions out of the page object.
- [X] T011 [P] Create `tests/pages/confirmation.page.js` for confirmation-page locators and navigation, extending `base.page.js` and keeping assertions out of the page object.

**Checkpoint**: The MCP gate is cleared, shared page objects exist, and user-story test files can be implemented independently.

---

## Phase 3: User Story 1 - Purchase with all form fields (Priority: P1) 🎯 MVP

**Goal**: Complete an independent purchase for every card type confirmed on the live purchase form, with all fields populated.

**Independent Test**: Run `tests/flight-purchase.spec.js`; each current card option must have its own result, with reservation details checked before submission and successful confirmation checked afterward.

### Tests for User Story 1

- [X] T012 [P] [US1] Create `tests/flight-purchase.spec.js` with one named complete-purchase test per card option verified by T006; populate all form fields, check "Remember me", and assert reservation details and final confirmation in the test file.
- [X] T013 [US1] Run `npx playwright test tests/flight-purchase.spec.js` and correct `tests/flight-purchase.spec.js` until every confirmed card option completes and reports independently.

**Checkpoint**: CT001 passes independently for every card type currently offered by the live form.

---

## Phase 4: User Story 2 - Purchase with required fields only (Priority: P1)

**Goal**: Complete the booking with City and State blank and "Remember me" unchecked.

**Independent Test**: Run `tests/required-fields-purchase.spec.js`; the submitted purchase must reach the successful confirmation with both optional text fields blank and the reminder preference unchecked.

### Tests for User Story 2

- [X] T014 [P] [US2] Create `tests/required-fields-purchase.spec.js` to complete the flight-purchase flow with all other purchase details populated, City and State blank, and "Remember me" unchecked; assert the reservation details and confirmation in the test file.
- [X] T015 [US2] Run `npx playwright test tests/required-fields-purchase.spec.js` and correct `tests/required-fields-purchase.spec.js` until the required-fields-only purchase succeeds.

**Checkpoint**: CT002 passes independently without City, State, or the reminder preference.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Confirm the full suite and keep its run guide aligned with the implementation.

- [X] T016 Update `specs/001-flight-purchase/quickstart.md` with the verified card inventory, final commands, and expected four independently reported results.
- [X] T017 Run `npm test` and verify all scenarios finish within the five-minute target in `specs/001-flight-purchase/spec.md`; correct any affected `tests/*.spec.js`, `playwright.config.js`, or `specs/001-flight-purchase/quickstart.md` files.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T001, T002, and T003 can run in parallel. T004 depends on T001; T005 depends on T004.
- **Foundational (Phase 2)**: Starts after Setup. T006 is the mandatory MCP inspection gate; T007-T011 must not start until T006 succeeds. T008-T011 depend on T007 and can then run in parallel.
- **User Stories (Phases 3-4)**: Both depend on completion of the Foundation. The two test files (T012 and T014) can be authored in parallel. Run T013 and T015 sequentially against the public site.
- **Polish (Phase 5)**: Starts after both user stories pass; run T016 before final full-suite validation T017.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundation; no dependency on User Story 2.
- **User Story 2 (P1)**: Starts after Foundation; no dependency on User Story 1.

### Dependency Graph

```text
T001 ─┐
T002 ─┼─> T004 -> T005 -> T006 -> T007 -> T008/T009/T010/T011
T003 ─┘                                      ├─> T012 -> T013 ─┐
                                             └─> T014 -> T015 ─┴─> T016 -> T017
```

### Parallel Opportunities

- **Setup**: T001, T002, and T003 modify different files and can run together.
- **Foundation**: T008, T009, T010, and T011 modify separate page-object files after T007.
- **User-story authoring**: T012 and T014 modify separate test files and can be authored in parallel after Foundation.
- Do not run T013 and T015 concurrently; both exercise the public BlazeDemo site.

## Parallel Example: User Story Test Authoring

```text
Task: T012 Create CT001 card-variant coverage in tests/flight-purchase.spec.js
Task: T014 Create CT002 required-fields coverage in tests/required-fields-purchase.spec.js
```

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Setup and Foundation, including the mandatory Playwright MCP inspection gate.
2. Complete User Story 1 and run its card-specific tests independently.
3. Validate CT001's reservation and confirmation checkpoints before adding the second story.

### Incremental Delivery

1. Add User Story 1 for all verified card options and validate it independently.
2. Add User Story 2 and validate required-only submission independently.
3. Run the full suite and confirm the four results meet the five-minute target.

## Notes

- Every task follows `- [ ] T### [P?] [US?] ...` and names the exact file path it changes or validates.
- Fixed synthetic purchase values are sufficient; do not use real payment details.
- T005 completed with the user-requested `@playwright/test` version `1.48.0`; its bundled Chromium 130 launched successfully. T006 completed through Playwright MCP and confirmed the live card options and CT002 behavior.
- The complete four-test suite passed in 18 seconds, within the five-minute success target.
- Playwright MCP observed the sample purchase page reporting a different route/flight than the selected result and a static expiration in the confirmation. Keep assertions limited to the required visible checkpoints unless the demo behavior changes.
- `npm audit` reports two high-severity findings in Playwright 1.48.0 related to browser downloads not verifying SSL certificate authenticity; npm's suggested fix upgrades to 1.65.0. Keep 1.48.0 as requested and retain this risk for review before using the test setup in a security-sensitive environment.
- No contracts or separate domain-model source files are planned; this is a test-only project and the model is documented in `specs/001-flight-purchase/data-model.md`.