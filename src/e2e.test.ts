// import puppeteer from 'puppeteer';

describe('End to end test suite', () => {
  test('e2e test', () => {
    return;
  });
  // test('opens in puppeteer', async () => {
  //   const browser = await puppeteer.launch({
  //     args: ['--no-sandbox'],
  //     headless: true,
  //   });
  //   const page = await browser.newPage();
  //
  //   await page.emulate({
  //     viewport: {
  //       width: 360,
  //       height: 640,
  //     },
  //     userAgent: '',
  //   });
  //
  //   await Promise.all([
  //     page.goto('http://staging-driver.fleetops.ai.s3-website-us-west-2.amazonaws.com'),
  //     page.waitForNavigation(),
  //   ]);
  //   expect(page.url()).toContain('bigroad');
  //
  //   await page.type('.form > tbody > tr > td > #email', 'justin@fleetrover.com');
  //   await page.type('.form > tbody > tr > td > #password', '4htgme');
  //   await Promise.all([
  //     page.click('.buttonBar > input'),
  //     page.waitForNavigation(),
  //   ]);
  //   expect(page.url()).not.toContain('bigroad');
  //
  //   await browser.close();
  // }, 16000);
});
