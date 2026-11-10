# Implementation Plan: Flight Purchase Automation

**Branch**: `001-flight-purchase` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-flight-purchase/spec.md`

**Status**: Playwright MCP inspection completed; implementation may proceed with the observed demo inconsistencies documented in [research.md](research.md).

## Summary

Create an end-to-end test suite for BlazeDemo's flight-purchase journey. CT001 reports one independent successful purchase per verified card type (Visa, American Express, and Diner's Club); CT002 completes the purchase with City and State blank and "Remember me" unchecked. Use Playwright Test and the required Page Object Model, with assertions in test files at reservation and confirmation checkpoints.

## Technical Context

**Language/Version**: JavaScript on Node.js 24.x (local runtime: 24.21.0)

**Primary Dependencies**: `@playwright/test`; `@faker-js/faker` is not needed for the initial scope because fixed synthetic purchase data is reproducible and sufficient.

**Storage**: N/A; scenarios submit data to the public sample site and do not persist project data.

**Testing**: Playwright Test; run the full suite with Chromium.

**Target Platform**: macOS development environment with Chromium; tests exercise `https://blazedemo.com/` over the network.

**Project Type**: JavaScript end-to-end test automation.

**Performance Goals**: CT001's three card variations plus CT002 complete and report within five minutes for one run.

**Constraints**: Use page objects in `tests/pages/*.page.js`, each extending `tests/pages/base.page.js`; place test assertions in `tests/*.spec.js`; verify reservation details before purchase and confirmation after submission; use synthetic test data only. The live route, selectors, and card choices were inspected with Playwright MCP; see [research.md](research.md) for the observed sample-site inconsistencies.

**Scale/Scope**: Four independently reported purchase scenarios: Visa, American Express, Diner's Club, and required-fields-only CT002.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Playwright E2E for BlazeDemo**: PASS. Playwright MCP inspected the live route flow, form, card options, and confirmation. The sample site returned inconsistent reservation and expiry details; see [research.md](research.md) and avoid asserting unverified value matching.
- **Page Object Model**: PASS. Route-specific page objects will live in `tests/pages/` and extend the shared `base.page.js`.
- **Assertions owned by tests**: PASS. All expected-result checks remain in test files; page objects only encapsulate locators and actions.
- **Meaningful checkpoints**: PASS. Scenarios check reserved-flight details before purchase and booking confirmation after purchase.
- **Shared page behavior**: PASS. Only behavior common to every page belongs in `base.page.js`.
- **Project layout and data**: PASS. Test and page-object locations follow the constitution. Fixed synthetic values are sufficient; Faker is reserved for a future need for meaningful variation or uniqueness.

## Project Structure

### Documentation (this feature)

```text
specs/001-flight-purchase/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── tasks.md              # Produced by /speckit-tasks
```

No `contracts/` directory is needed: this feature is an internal test suite and does not expose a product API or other consumer-facing interface.

### Source Code (repository root)

```text
package.json
package-lock.json
playwright.config.js
tests/
├── flight-purchase.spec.js
└── pages/
    ├── base.page.js
    ├── home.page.js
    ├── flights.page.js
    ├── purchase.page.js
    └── confirmation.page.js
```

**Structure Decision**: This is a new, single-project JavaScript test harness; the workspace currently has no package manifest, Playwright config, or test source. The chosen paths follow the constitution and model the site's home, results, purchase, and confirmation routes. Add only page objects needed for route-specific behavior.

## Phase 0: Research

Research decisions, source notes, and observed sample-site inconsistencies are recorded in [research.md](research.md). The mandatory Playwright MCP inspection gate is cleared.

## Phase 1: Design

- **Data model**: See [data-model.md](data-model.md) for reservation, purchase details, confirmation, and scenario variants.
- **Contracts**: Not applicable; this test-only project has no public interface contract.
- **Validation guide**: See [quickstart.md](quickstart.md) for setup, execution, and expected results.

## Constitution Check (Post-Design)

- **Playwright and required SUT**: PASS; the mandatory MCP inspection was completed and the demo's inconsistent values are documented as assertion constraints.
- **Page Object Model and locations**: PASS; each page object extends the base page and uses the prescribed suffix and directory.
- **Assertion ownership and checkpoints**: PASS; test files assert reservation details and final confirmation.
- **Shared behavior, test data, and project structure**: PASS; shared behavior remains in the base page, deterministic synthetic values avoid unnecessary Faker use, and files use the prescribed paths.
- **Unjustified complexity**: None.

## Complexity Tracking

No constitution violations or additional architectural complexity are introduced.
