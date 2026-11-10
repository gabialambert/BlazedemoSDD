# Data Model: Flight Purchase Automation

This model describes the test data and user-visible states exercised by the scenarios. It does not represent data persisted by this project.

## Entities

### Flight Search

- **Departure city**: City selected as the flight origin.
- **Destination city**: City selected as the flight destination; must differ from the departure city.
- **Available flights**: Results returned for the selected route. At least one result is required to proceed with a purchase scenario.

### Flight Reservation

- **Flight number**: Identifier displayed for the selected flight.
- **Airline**: Airline displayed for the selected flight.
- **Departure and arrival times**: Itinerary details shown in the results and reservation summary.
- **Price and fees**: Displayed amounts associated with the selected reservation and total.
- **State**: `available` → `reserved` → `purchase submitted` → `confirmed` or `not confirmed`.

### Purchase Details

- **Name**: Traveler name.
- **Address**: Street address.
- **City**: Optional location field for CT002; populated for CT001.
- **State**: Optional location field for CT002; populated for CT001.
- **Zip code**: Postal code.
- **Card type**: One offered option for CT001; current observed values are Visa, American Express, and Diner's Club. CT002 uses an offered valid option.
- **Credit card number**: Synthetic test value appropriate for the sample form; never a real payment credential.
- **Expiration month and year**: Values submitted with the card details.
- **Name on card**: Cardholder name.
- **Remember me**: Boolean preference; checked for CT001 and unchecked for CT002.

### Booking Confirmation

- **Confirmation message**: User-visible indication that the purchase flow completed.
- **Transaction summary**: Visible summary fields such as status, amount, masked card number, expiry, and authorization code, when present.
- **Relationship**: A confirmation belongs to the submitted purchase details and the reserved flight.

## Scenario Variants

| Scenario | Card type | City and State | Remember me | Expected final state |
|---|---|---|---|---|
| CT001-Visa | Visa | Populated | Checked | Confirmed |
| CT001-American-Express | American Express | Populated | Checked | Confirmed |
| CT001-Diners-Club | Diner's Club | Populated | Checked | Confirmed |
| CT002-Required-Only | Any valid offered type | Blank | Unchecked | Confirmed |

The test definitions must stay synchronized with the options currently presented by the live purchase form. Reconfirm the inventory through Playwright MCP before implementation.

## Validation Rules

- A purchase scenario begins only after a flight is selected and its itinerary and price details are displayed.
- CT001 populates all purchase-form inputs and checks the reminder preference.
- CT002 fills all purchase details other than City and State, and leaves the reminder preference unchecked.
- Every test variant asserts the final successful confirmation; a missing confirmation is a failure.
- If no flight is available for the selected route, report the unmet prerequisite rather than treating the purchase as successful.