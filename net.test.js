const { clickElement, putText, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Cinema ticket purchase test", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
    await page.waitForSelector("h1");
  });

  test("Happy path 1: booking one ticket", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await clickElement(page, "div:nth-child(4) span:nth-child(4)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  });

  test("Happy path 2: booking two ticket", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await clickElement(page, "div:nth-child(4) span:nth-child(4)");
    await clickElement(page, "div:nth-child(4) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  });

  test("Sad path: choosing a reserved seat", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']"
    );
    await page.waitForSelector("div:nth-child(6) span:nth-child(3)");
    await clickElement(page, "div:nth-child(7) span:nth-child(1)");
    const actual = String(
      await page.$eval("button", (button) => {
        return button.disabled;
      })
    );
    const expected = "true";
    expect(actual).toContain(expected);
  });
});
