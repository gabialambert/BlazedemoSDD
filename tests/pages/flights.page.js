const BasePage = require('./base.page');

class FlightsPage extends BasePage {
  get resultsHeading() {
    return this.page.getByRole('heading', { level: 3 });
  }

  get availableFlights() {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('button', { name: 'Choose This Flight' })
    });
  }

  async chooseFirstFlight() {
    await this.availableFlights.first().getByRole('button', { name: 'Choose This Flight' }).click();
  }
}

module.exports = FlightsPage;