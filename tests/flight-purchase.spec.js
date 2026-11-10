const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/home.page');
const FlightsPage = require('./pages/flights.page');
const PurchasePage = require('./pages/purchase.page');
const ConfirmationPage = require('./pages/confirmation.page');

const cardTypes = [
  { name: 'Visa', value: 'visa' },
  { name: 'American Express', value: 'amex' },
  { name: "Diner's Club", value: 'dinersclub' }
];

for (const cardType of cardTypes) {
  test(`CT001 completes a flight purchase with ${cardType.name}`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchFlights('Paris', 'Buenos Aires');

    const flightsPage = new FlightsPage(page);
    await expect(flightsPage.resultsHeading).toContainText('Flights from Paris to Buenos Aires');
    await expect(flightsPage.availableFlights).toHaveCount(5);
    await flightsPage.chooseFirstFlight();

    const purchasePage = new PurchasePage(page);
    await expect(purchasePage.reservationHeading).toBeVisible();
    await expect(purchasePage.airlineDetails).toBeVisible();
    await expect(purchasePage.flightNumberDetails).toBeVisible();
    await expect(purchasePage.priceDetails).toBeVisible();
    await expect(purchasePage.totalCostDetails).toBeVisible();

    await purchasePage.fillDetails({
      name: 'Test Passenger',
      address: '123 Example Street',
      city: 'Example City',
      state: 'CA',
      zipCode: '12345',
      cardType: cardType.value,
      creditCardNumber: '4111111111111111',
      month: '12',
      year: '2030',
      nameOnCard: 'Test Passenger'
    });
    await purchasePage.setRememberMe(true);
    await purchasePage.submitPurchase();

    const confirmationPage = new ConfirmationPage(page);
    await expect(confirmationPage.successHeading).toBeVisible();
    await expect(confirmationPage.pendingCaptureStatus).toBeVisible();
  });
}