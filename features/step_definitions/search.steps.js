const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElement, getText } = require("../../lib/commands");

setDefaultTimeout(50000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on the cinema page", async function () {
  return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
    setTimeout: 20000,
  });
});

When("user selects the session date", async function () {
  return await clickElement(this.page, "a:nth-child(2)");
});

When("user chooses the session time", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']"
  );
});
When("user chooses one place", async function () {
  return await clickElement(this.page, "div:nth-child(4) span:nth-child(4)");
});

When("user chooses the second place", async function () {
  return await clickElement(this.page, "div:nth-child(4) span:nth-child(5)");
});

When("user clicks the booking button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

When("user selects the reserved seat", async function () {
  return await clickElement(this.page, "div:nth-child(7) span:nth-child(1)");
});

Then("user sees the inscription {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then(
  "user sees that the booking button is not active {string}",
  async function (string) {
    const actual = String(
      await this.page.$eval("button", (button) => {
        return button.disabled;
      })
    );
    const expected = await string;
    expect(actual).contains(expected);
  }
);
