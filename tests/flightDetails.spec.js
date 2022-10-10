// @ts-check
const { test, expect } = require('@playwright/test');

import FlightDetailsPage from '../pages/flightDetails.page';
import { getDateString } from '../utils/date';

test('Search result change based on date', async ({ page }) => {
  const flightDetailsPage = new FlightDetailsPage(page);

  await flightDetailsPage.goto();
  await flightDetailsPage.acceptCTA();

  const today = new Date();
  await flightDetailsPage.searchForFlight({ departureAirport: 'CGN', destinationAirport: 'BER', departureDate: today });

  const flightResults = await flightDetailsPage.getFlightResults();

  await expect(flightResults.isVisible()).toBeTruthy
  await expect(await flightDetailsPage.getCurrentFlightResultsDataLabel()).toContain(getDateString(today));

  await flightDetailsPage.clickOnNextDayButton();
  await expect(flightResults.isVisible()).toBeTruthy

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  await expect(await flightDetailsPage.getCurrentFlightResultsDataLabel()).toContain(getDateString(tomorrow));

  await page.pause()
});


