<!--
Sync Impact Report
Version change: unversioned scaffold -> 1.0.0 (initial adoption)
Modified principles: None (initial baseline)
Added sections: Five core principles; Technical Constraints and Project Structure;
	Test Workflow and Quality Gates
Removed sections: None
Follow-up TODOs: None
-->
# BlazeDemo E2E Test Automation Constitution

## Core Principles

### I. Playwright E2E for the BlazeDemo SUT
Playwright MUST be the end-to-end test framework, and https://blazedemo.com/ MUST be treated as
the system under test (SUT). Whenever the SUT needs to be inspected, explored, or understood,
contributors MUST use the Playwright MCP. This keeps test behavior grounded in the live application
rather than assumptions.

### II. Page Object Model
Tests MUST use the Page Object Model to represent pages and user interactions. Page names MUST be
intuitive and cohesive with their corresponding application routes. This gives scenarios a clear
domain vocabulary and keeps route-specific behavior easy to locate.

### III. Clear Ownership of Assertions and Interactions
All test validations and assertions MUST live in test files. Page objects MUST centralize selectors
and the strategies used to locate and interact with page elements, and MUST NOT contain test
assertions. This separation keeps scenarios responsible for expected outcomes and pages responsible
for application interaction.

### IV. Validate Meaningful Checkpoints
Tests MUST validate important information and elements at meaningful points throughout each flow,
not only its final state. Checkpoint assertions MUST remain in the test files. This localizes failures
and confirms that intermediate transitions behave as expected.

### V. Reuse Shared Page Behavior Deliberately
Behavior genuinely common to all pages MUST be centralized in `tests/pages/base.page.js`, and every
other page object MUST extend that base page. Behavior that is not common MUST remain with its
owning page. This establishes consistent shared behavior without obscuring page-specific actions.

## Technical Constraints and Project Structure

The project MUST use Playwright and the Page Object Model. It MUST use `@faker-js/faker` when
generated test data is needed; fixed data MAY be used when generation adds no value.

Page objects MUST reside in `tests/pages/` and use the `.page.js` suffix. Test files MUST reside in
`tests/` and use the `.spec.js` suffix. Shared utility functions, when needed, MUST reside in
`utils/`. The base page MUST be named `base.page.js`.

## Test Workflow and Quality Gates

Before encoding assumptions about the SUT, contributors MUST inspect the relevant behavior with the
Playwright MCP. Each end-to-end scenario MUST cover its intended user flow and assert important
intermediate and final outcomes in the test file. Selectors and element interaction strategies MUST
be implemented through the relevant page objects. Changes MUST be reviewed against these rules
before they are accepted.

## Governance

This constitution governs the project’s end-to-end test architecture and practices. Amendments
MUST document their rationale, be reviewed and approved by project maintainers, and update the
version and last-amended date. The ratification date MUST remain the date of the initial adoption.

Versioning MUST follow semantic versioning: MAJOR for backward-incompatible governance changes,
MINOR for new principles or materially expanded requirements, and PATCH for clarifications and
non-semantic wording changes. During review, maintainers MUST verify that proposed changes and
tests comply with the constitution; any exception MUST be documented and approved as part of the
amendment.

**Version**: 1.0.0 | **Ratified**: 2026-11-09 | **Last Amended**: 2026-11-09
