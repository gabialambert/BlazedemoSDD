const { test, expect } = require('@playwright/test');
const HomePage = require('./pages/home.page');
const FlightsPage = require('./pages/flights.page');
const PurchasePage = require('./pages/purchase.page');
const ConfirmationPage = require('./pages/confirmation.page');

test('CT002 completes a flight purchase with required fields only', async ({ page }) => {
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
    zipCode: '12345',
    cardType: 'visa',
    creditCardNumber: '4111111111111111',
    month: '12',
    year: '2030',
    nameOnCard: 'Test Passenger'
  });
  await expect(purchasePage.cityField).toHaveValue('');
  await expect(purchasePage.stateField).toHaveValue('');
  await purchasePage.setRememberMe(false);
  await expect(purchasePage.rememberMeField).not.toBeChecked();
  await purchasePage.submitPurchase();

  const confirmationPage = new ConfirmationPage(page);
  await expect(confirmationPage.successHeading).toBeVisible();
  await expect(confirmationPage.pendingCaptureStatus).toBeVisible();
});