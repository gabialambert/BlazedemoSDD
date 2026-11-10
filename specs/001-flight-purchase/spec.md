# Feature Specification: Flight Purchase Automation

**Feature Branch**: `Not created`

**Created**: 2026-11-09

**Status**: Draft

**Input**: User description: "Vamos criar uma automação para cobrir o fluxo mais importante, que seria a compra de passagens. CT001: Fluxo completo preenchendo todos os campos do formulario. Faça um teste para cada opcão de cartao disponivel. CT002: Fluxo completo preenchendo apenas os campos obrigatorios (todos exceto Cidade, Estado e 'lembrar de mim')."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Purchase with all form fields (Priority: P1)

As a traveler, I want to complete a flight purchase with every purchase-form field populated, so that the complete booking journey is verified for each available card type.

**Why this priority**: This covers the primary booking journey and exercises every card type offered by the purchase form.

**Independent Test**: For each card type offered by the purchase form, independently select a flight, complete every purchase field, submit the purchase, and verify the booking confirmation.

**Acceptance Scenarios**:

1. **Given** a flight search with at least one available flight, **When** the traveler reserves a flight, completes every purchase-form field, selects one card type offered by the form, and submits the purchase, **Then** the reservation details are shown before purchase and a successful booking confirmation is shown afterward.
2. **Given** the purchase form offers multiple card types, **When** the full purchase journey is run for each offered card type, **Then** each card type has its own independently reported successful purchase scenario.

---

### User Story 2 - Purchase with required fields only (Priority: P1)

As a traveler, I want to complete a flight purchase using only required information, so that optional location and reminder fields do not prevent booking.

**Why this priority**: This verifies the minimum information needed to complete the central booking task.

**Independent Test**: Select and reserve a flight, fill all required purchase fields, leave City and State blank, keep "Remember me" unchecked, and verify the booking confirmation.

**Acceptance Scenarios**:

1. **Given** a flight search with at least one available flight, **When** the traveler reserves a flight, fills the required purchase fields, leaves City and State blank, leaves "Remember me" unchecked, and submits the purchase, **Then** the booking succeeds and a successful confirmation is shown.

### Edge Cases

- If a flight search returns no available flights, no purchase attempt is made and the scenario reports that the prerequisite flight was unavailable.
- If the purchase form's available card types change, CT001 covers every option currently offered, with one independently reported purchase scenario per option.
- Leaving City and State blank and "Remember me" unchecked must not prevent the CT002 purchase from succeeding.
- A booking scenario must not be reported as successful if the reserved-flight details or final purchase confirmation are missing.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The booking journey MUST allow a traveler to choose a departure city and destination city, view available flights, and reserve one flight.
- **FR-002**: Before purchase, the journey MUST verify that the reserved flight's itinerary and price details are displayed.
- **FR-003**: CT001 MUST populate every field and selectable preference offered on the purchase form, including City, State, and "Remember me".
- **FR-004**: CT001 MUST run one independently reported complete purchase scenario for every card type offered by the purchase form.
- **FR-005**: CT002 MUST populate all required purchase fields while leaving City and State blank and "Remember me" unchecked.
- **FR-006**: Each purchase scenario MUST verify that submitting the form results in a successful booking confirmation.
- **FR-007**: A scenario MUST report a failure when a required checkpoint, reserved-flight detail, or successful booking confirmation is absent.

### Key Entities *(include if data involved)*

- **Flight reservation**: The selected itinerary, airline, flight number, and displayed price details that the traveler reviews before purchase.
- **Purchase details**: The traveler information, card type and payment details, and optional location and reminder preferences submitted with a reservation.
- **Booking confirmation**: The user-visible result indicating whether the flight purchase completed successfully.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of card types offered by the purchase form have a distinct CT001 scenario, and each scenario reaches a successful booking confirmation.
- **SC-002**: CT002 reaches a successful booking confirmation with all required fields completed, City and State blank, and "Remember me" unchecked.
- **SC-003**: 100% of purchase scenarios verify the reserved-flight details before submission and the booking confirmation after submission.
- **SC-004**: All CT001 variations and CT002 produce a result in one test run completed within five minutes.

## Assumptions

- The system under test is the publicly available BlazeDemo travel site.
- The purchase-form card types are determined from the options currently presented by the form; the scenario set must stay aligned with that list.
- "All fields" in CT001 includes the optional City and State fields and selecting "Remember me"; CT002 leaves these optional inputs empty or unchecked.
- Purchase details are test data for the sample travel site; these scenarios verify the displayed booking outcome and do not assume a real-world charge.
- At least one flight is available for the selected route during a successful scenario; otherwise the unavailable-flight edge case is reported.