const BasePage = require('./base.page');

class PurchasePage extends BasePage {
  get reservationHeading() {
    return this.page.getByRole('heading', { name: /Your flight from .* has been reserved\./ });
  }

  get airlineDetails() {
    return this.page.getByText(/^Airline:/);
  }

  get flightNumberDetails() {
    return this.page.getByText(/^Flight Number:/);
  }

  get priceDetails() {
    return this.page.getByText(/^Price:/);
  }

  get totalCostDetails() {
    return this.page.getByText(/^Total Cost:/);
  }

  get cityField() {
    return this.page.getByRole('textbox', { name: 'City' });
  }

  get stateField() {
    return this.page.getByRole('textbox', { name: 'State' });
  }

  get rememberMeField() {
    return this.page.getByRole('checkbox', { name: 'Remember me' });
  }

  async fillDetails(details) {
    await this.page.getByRole('textbox', { name: 'Name', exact: true }).fill(details.name);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(details.address);
    if (details.city !== undefined) {
      await this.cityField.fill(details.city);
    }
    if (details.state !== undefined) {
      await this.stateField.fill(details.state);
    }
    await this.page.getByRole('textbox', { name: 'Zip Code' }).fill(details.zipCode);
    await this.page.locator('select[name="cardType"]').selectOption(details.cardType);
    await this.page.getByRole('textbox', { name: 'Credit Card Number' }).fill(details.creditCardNumber);
    await this.page.getByRole('textbox', { name: 'Month' }).fill(details.month);
    await this.page.getByRole('textbox', { name: 'Year' }).fill(details.year);
    await this.page.getByRole('textbox', { name: 'Name on Card' }).fill(details.nameOnCard);
  }

  async setRememberMe(checked) {
    await this.rememberMeField.setChecked(checked);
  }

  async submitPurchase() {
    await this.page.getByRole('button', { name: 'Purchase Flight' }).click();
  }
}

module.exports = PurchasePage;