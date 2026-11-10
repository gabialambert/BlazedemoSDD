const BasePage = require('./base.page');

class ConfirmationPage extends BasePage {
  get successHeading() {
    return this.page.getByRole('heading', { name: 'Thank you for your purchase today!' });
  }

  get pendingCaptureStatus() {
    return this.page.getByRole('cell', { name: 'PendingCapture' });
  }
}

module.exports = ConfirmationPage;