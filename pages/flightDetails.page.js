export default class FlightDetailsPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.CTAAcceptButton = page.locator('.cookieConsentBanner .cookie-consent--cta-accept')
    this.flightRouteRadioButton = page.getByLabel('Flight route');
    this.departureAirportButton = page.locator('.o-compact-search__bar-item--station-select-origin');
    this.departureAirportInput = page.getByPlaceholder('Departure airport');
    this.departureAirportOption = (name) => page.locator(`.o-station-select__new-station-list li >> text=${name} >> nth=0`);
    this.destinationAirportButton = page.locator('.o-compact-search__bar-item--station-select-destination');
    this.destinationAirportInput = page.getByPlaceholder('Destination airport');
    this.departureAirportOption = (name) => page.locator(`.o-station-select__new-station-list li >> text=${name} >> nth=0`);
    this.departureDateButton = page.getByLabel('Departure date');
    this.departureDateElement = ({ year, month, day }) => page.locator(`input[value="${year}-${month}-${day}"]`);
    this.showFlightButton = page.getByText('Show flight status');
    this.flightResultsList = page.locator('.o-search-flight-status__flight-list-cards');
    this.currentFlightResultsDataLabel = page.locator('.o-search-flight-status__date-navigation__date--active');
    this.nextDayButton = page.locator('.o-search-flight-status__date-navigation__arrow >> nth=1');
  }

  async goto() {
    await this.page.goto('en/information/at-the-airport/flight-status.html');
  }
  async acceptCTA() {
    await this.CTAAcceptButton.click();
    await this.flightRouteRadioButton.check();
  }

  async selectDepartureAirport(airportName) {
    await this.departureAirportButton.click();
    await this.departureAirportInput.fill(airportName);
    await this.departureAirportOption(airportName).click();
  }

  async selectDestinationAirport(airportName) {
    await this.destinationAirportButton.click();
    await this.destinationAirportInput.fill(airportName);
    await this.departureAirportOption(airportName).click();
  }

  async selectDepartureDate(dateObject = new Date()) {
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = `0${dateObject.getDate()}`.slice(-2)
    await this.departureDateButton.click();
    await this.departureDateElement({ year, month, day }).click();
  }

  async searchForFlight({ departureAirport, destinationAirport, departureDate } = {}) {
    await this.selectDepartureAirport(departureAirport);
    await this.selectDestinationAirport(destinationAirport);
    await this.selectDepartureDate(departureDate);
    await this.showFlightButton.click();
  }

  async getFlightResults() {
    return this.flightResultsList
  }
  async getCurrentFlightResultsDataLabel() {
    const x = await this.currentFlightResultsDataLabel;
    return x.textContent();
  }
  async clickOnNextDayButton() {
    await this.nextDayButton.click();
  }
}
