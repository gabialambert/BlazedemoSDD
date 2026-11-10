# Research: Flight Purchase Automation

**Date**: 2026-11-09

## Decisions

### Test runtime and dependencies

- **Decision**: Use Node.js 24.x with npm and `@playwright/test` as the test runner, browser automation library, and assertion package. Start with Chromium.
- **Rationale**: Node.js 24.21.0 and npm 11.19.0 are installed locally. Playwright Test provides browser fixtures, isolated contexts, assertions, and reporting needed by this small E2E suite without a separate runner.
- **Alternatives considered**: Node.js 26.x is a newer runtime option, but is not installed in the current environment. Other browser engines are outside the requested coverage and can be added if cross-browser behavior becomes a requirement.

### Test isolation and selectors

- **Decision**: Keep each purchase scenario independent and use the fresh page/browser-context fixture provided by the test runner. Prefer accessible roles and labels; use stable form attributes only where the live page does not expose semantic labels. Keep selectors and actions in page objects.
- **Rationale**: Independent contexts prevent one purchase from carrying state into another. Semantic locators are more resilient and align with the Page Object Model and test assertion ownership required by the constitution.
- **Alternatives considered**: Shared browser state and positional selectors are more sensitive to ordering and page changes, so they are not selected.

### Card variants and test data

- **Decision**: Model CT001 as one independently reported test for each current option: Visa (`visa`), American Express (`amex`), and Diner's Club (`dinersclub`). Use fixed, clearly synthetic values; do not generate or submit real payment details.
- **Rationale**: Playwright MCP inspected the live form and confirmed these three option labels and values. One test per option makes coverage and failures visible, while deterministic data keeps runs reproducible.
- **Alternatives considered**: A single runtime loop could obscure per-option reporting. Faker adds no value for this form unless future requirements need unique or varied data.

### Form and completion observations

- **Decision**: Treat the user-provided CT002 field boundary as authoritative: all fields except City, State, and "Remember me" are completed. Assert the visible successful purchase confirmation and summary after submission.
- **Rationale**: Playwright MCP confirmed the traveler, address, card, and expiry fields, and the confirmation page's thank-you message and transaction summary. No input has the HTML `required` attribute, but the live site accepted CT002 with City and State empty and "Remember me" unchecked.
- **Alternatives considered**: Inferring mandatory fields from HTML `required` attributes is not reliable for this application because none were visible in the fetched markup.

### Reservation and confirmation behavior

- **Observed**: Selecting the first Paris-to-Buenos Aires result led to a purchase page displaying a TLV-to-SFO United Airlines reservation, and the confirmation returned a static `PendingCapture` summary with expiry `11/2018`, despite the submitted test values.
- **Decision**: Assert that the selected-flight summary is present before submission and that the success heading and confirmation status are present afterward. Do not assert that displayed flight or expiry values match submitted/search values until the sample site's inconsistent response behavior is resolved.
- **Rationale**: This preserves the outcomes specified for CT001 and CT002 while avoiding a brittle assertion against contradictory demo data. The discrepancy remains visible for maintainers rather than being hidden.

## Playwright MCP Verification

The live route flow was inspected with Playwright MCP: home (`/`) → results (`/reserve.php`) → purchase (`/purchase.php`) → confirmation (`/confirmation.php`). The sample site emitted mixed-content and JavaScript dependency errors in the console, but the booking flow remained interactive and both full-fields and required-fields-only submissions reached the confirmation page using synthetic test data.

## Sources

- [BlazeDemo homepage](https://blazedemo.com/)
- [BlazeDemo reservation results](https://blazedemo.com/reserve.php)
- [BlazeDemo purchase form](https://blazedemo.com/purchase.php)
- [BlazeDemo purchase confirmation](https://blazedemo.com/confirmation.php)
- [Node.js previous releases and support schedule](https://nodejs.org/en/about/previous-releases)
- [Playwright installation](https://playwright.dev/docs/intro)
- [Playwright locators](https://playwright.dev/docs/locators)
- [Playwright browser contexts](https://playwright.dev/docs/browser-contexts)
- [Playwright parameterized tests](https://playwright.dev/docs/test-parameterize)