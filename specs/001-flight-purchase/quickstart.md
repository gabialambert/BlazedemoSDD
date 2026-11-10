# Quickstart: Flight Purchase Automation

## Prerequisites

- Node.js 24.x and npm.
- Network access to `https://blazedemo.com/`.
- The project setup phase has created the package manifest and installed `@playwright/test`.
- Chromium installed for Playwright.
- The live route flow, purchase form, and card selector were verified with Playwright MCP. Recheck them if the sample site changes.

## Setup

From the repository root, install project dependencies and the Chromium browser if they have not already been installed:

```sh
npm install
npx playwright install chromium
```

## Run the End-to-End Scenarios

```sh
npx playwright test
```

The suite reports four independent purchase results: CT001 with Visa, American Express, and Diner's Club, plus CT002 with City and State blank and "Remember me" unchecked. Each result verifies the reservation summary before submission and the success heading and `PendingCapture` status afterward. All four scenarios passed together in 18 seconds with Playwright 1.48.0.

## Review Results

```sh
npx playwright show-report
```

An unavailable-flight prerequisite, missing reservation details, or missing final confirmation must be reported as a failed or blocked scenario, never as a successful purchase. A complete run should finish within the five-minute target in the feature specification.