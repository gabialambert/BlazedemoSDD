const BasePage = require('./base.page');

class HomePage extends BasePage {
  async searchFlights(departureCity, destinationCity) {
    await this.page.locator('select[name="fromPort"]').selectOption(departureCity);
    await this.page.locator('select[name="toPort"]').selectOption(destinationCity);
    await this.page.getByRole('button', { name: 'Find Flights' }).click();
  }
}

module.exports = HomePage;