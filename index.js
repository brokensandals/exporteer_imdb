const puppeteer = require('puppeteer');

module.exports.download = async function(email, password) {
  const result = {};
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto('https://imdb.com');
    
    const [signIn] = await page.$x('//a[contains(., \'Sign In\')]');
    if (!signIn) {
      throw 'unable to find Sign In link';
    }
    await signIn.click();
    await page.waitForNavigation();

    const [signInWithIMDb] = await page.$x('//a[contains(., \'Sign in with IMDb\')]');
    if (!signInWithIMDb) {
      throw 'unable to find Sign in with IMDb link';
    }
    await Promise.all([
      page.waitForNavigation(),
      signInWithIMDb.click(),
    ]);

    await page.type('[type="email"]', email);
    await page.type('[type="password"]', password);
    await Promise.all([
      page.waitForNavigation(),
      page.click('[type="submit"]'),
    ]);
    
    await page.goto('https://www.imdb.com/list/watchlist');
    result.watchlist = await page.evaluate(() => {
      const link = document.evaluate(
        '//a[contains(., \'Export this list\')]',
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return fetch(link.href).then(r => r.text());
    });

    await page.goto('https://www.imdb.com/list/ratings');
    result.ratings = await page.evaluate(() => {
      const link = document.evaluate(
        '//a[contains(., \'Export\')]',
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return fetch(link.href).then(r => r.text());
    });
  } finally {
    browser.close();
  }
  return result;
}
