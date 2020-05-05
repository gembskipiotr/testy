const faker = require('faker');
const puppeteer = require('puppeteer');

const company = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  company: faker.name.firstName() + ' ' + faker.name.lastName(),
};

const person = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Page loading tests', () => {
  test('Main page loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/');
    await page.waitForSelector('h4.MuiTypography-h4');

    const html = await page.$eval('h4.MuiTypography-h4', e => e.innerHTML);
    expect(html).toBe('Task planner');

    browser.close();
  }, 16000);

  test('Register page loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/register');
    await page.waitForSelector('h5.MuiTypography-h5');

    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Rejestracja');

    browser.close();
  }, 16000);

  test('Login page loads correctly', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');

    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);

test('Redirecting after access company page before login', async () => {
  let browser = await puppeteer.launch({
    headless: false
  });
  let page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 1600,
      height: 900
    },
    userAgent: ''
  });

  await page.goto('http://localhost:3001/company');
  await page.waitForSelector('h5.MuiTypography-h5');

  const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
  expect(html).toBe('Logowanie');

  browser.close();
}, 16000);

  test('Redirecting after access planner page before login', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/planner');
    await page.waitForSelector('h5.MuiTypography-h5');

    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);

  test('Redirecting after access company employees page before login', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/company/employees');
    await page.waitForSelector('h5.MuiTypography-h5');

    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);

  test('Redirecting after access company orders page before login', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/company/orders');
    await page.waitForSelector('h5.MuiTypography-h5');

    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);

  test('Redirecting after access company notifications page before login', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/company/notifications');
    await page.waitForSelector('h5.MuiTypography-h5');

    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);
});

describe('New user/company', () => {
  test('Create account', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/register');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#name", company.name);
    await page.type("#lastname", company.lastName);
    await page.type("#email", company.email);
    await page.type("#emailRepeat", company.email);
    await page.type("#password", company.password);
    await page.type("#passwordRepeat", company.password);
    await page.click(".MuiButton-containedPrimary");

    await page.waitForFunction(
      'document.querySelector("h5.MuiTypography-root.MuiTypography-h5").innerText.includes("Logowanie")'
    );
    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);

  test('Login to new account', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    const html = await page.$eval('body', e => e.innerText);
    expect(html).toContain('TWOJA FIRMA');

    browser.close();
  }, 16000);

  test('Add new company', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.click("svg");
    await page.type("#name", company.company);
    await page.click("button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("Pracownicy")'
    );
    const html = await page.$eval('.sc-lhVmIH.fRRSVh', e => e.innerHTML);
    expect(html).toContain('Pracownicy');

    browser.close();
  }, 16000);

  test('Add new order', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.goto('http://localhost:3001/company/orders');
    await page.click("svg");
    await page.type("#name", 'Jest tests');
    await page.click("button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");

    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("Jest tests")'
    );
    const html = await page.$eval('.MuiList-root.sc-ktHwxA.bwPBzM.MuiList-padding', e => e.innerText);
    expect(html).toContain('Jest tests');

    browser.close();
  }, 16000);
});


describe('Join company', () => {
  test('Create account', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/register');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#name", person.name);
    await page.type("#lastname", person.lastName);
    await page.type("#email", person.email);
    await page.type("#emailRepeat", person.email);
    await page.type("#password", person.password);
    await page.type("#passwordRepeat", person.password);
    await page.click(".MuiButton-containedPrimary");

    await page.waitForFunction(
      'document.querySelector("h5.MuiTypography-root.MuiTypography-h5").innerText.includes("Logowanie")'
    );
    const html = await page.$eval('h5.MuiTypography-h5', e => e.innerHTML);
    expect(html).toBe('Logowanie');

    browser.close();
  }, 16000);

  test('Login to new account', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", person.email);
    await page.type("#password", person.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    const html = await page.$eval('body', e => e.innerText);
    expect(html).toContain('TWOJA FIRMA');

    browser.close();
  }, 16000);

  test('Join company', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", person.email);
    await page.type("#password", person.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.type("input", company.company);
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-text.sc-btzYZH.dcBPpq.MuiButton-textPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("Oczekuje na akceptację")'
    );
    const html = await page.$eval('body', e => e.innerText);
    expect(html).toContain('Oczekuje na akceptację');

    browser.close();
  }, 16000);

  test('Apply join request', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    const linkHandlers = await page.$x("//button");
    await linkHandlers[1].click();
    await page.waitFor(5000);
    const html = await page.$eval('body', e => e.innerText);
    expect(html).not.toContain('AKCEPTUJ');

    browser.close();
  }, 30000);

  test('Assign order to employee', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.goto('http://localhost:3001/company/orders');
    await page.waitFor(2000);

    const linkHandlers = await page.$x("//button");
    await linkHandlers[1].click();
    await page.waitFor(2000);
    await page.click("#users");
    await page.click(".MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.waitFor(2000);
    await linkHandlers[1].click();

    const html = await page.$eval('.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded', e => e.innerText);
    expect(html).not.toContain(person.name+' '+person.lastName);

    browser.close();
  }, 30000);

  test('Check if order was correctly assigned', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.goto('http://localhost:3001/planner');

    const html = await page.$eval('body', e => e.innerText);
    expect(html).toContain('Jest tests');

    browser.close();
  }, 30000);



  test('Add job to order', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.goto('http://localhost:3001/planner');
    await page.waitFor(2000);
    await page.click(".sc-ifAKCX.sc-TOsTZ.iAgntT");
    const linkHandlers = await page.$x("//button");
    await linkHandlers[1].click();

    await page.type("#name", 'test job');
    await page.type("#endTime", '04042020');
    await page.type("#description", 'test job description');
    await page.click("#userId");
    await page.click(".MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");

    await page.waitFor(5000);

    const html = await page.$eval('body', e => e.innerText);
    expect(html).toContain("test job");

    browser.close();
  }, 30000);


  test('Edit orders job', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.goto('http://localhost:3001/planner');
    await page.waitFor(2000);
    await page.click(".sc-ifAKCX.sc-TOsTZ.iAgntT");
    await page.hover(".sc-frDJqD.iJHCZx");
    const linkHandlers = await page.$x("//button");
    await linkHandlers[2].click();

    await page.type("#endTime", '20042020');
    await page.click(".MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    await page.click(".MuiButtonBase-root.MuiButton-root.MuiButton-contained.sc-bZQynM.sc-hEsumM.czOACi.MuiButton-containedPrimary");
    const accept = await page.$x("//button");

    await page.waitFor(5000);
    await accept[5].click();

    await page.waitFor(5000);

    const html = await page.$eval('p.sc-gzVnrw.sc-jbKcbu.ffKVtX', e => e.innerText);
    expect(html).toBe("Termin: 20.04.2020");

    browser.close();
  }, 30000);

  test('Delete orders job', async () => {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 1600,
        height: 900
      },
      userAgent: ''
    });
    await page.goto('http://localhost:3001/login');
    await page.waitForSelector('h5.MuiTypography-h5');
    await page.type("#email", company.email);
    await page.type("#password", company.password);
    await page.click(".MuiButton-containedPrimary");
    await page.waitForFunction(
      'document.querySelector("body").innerText.includes("TWOJA FIRMA")'
    );
    await page.goto('http://localhost:3001/planner');
    await page.waitFor(2000);
    await page.click(".sc-ifAKCX.sc-TOsTZ.iAgntT");
    await page.hover(".sc-frDJqD.iJHCZx");
    const linkHandlers = await page.$x("//button");
    await linkHandlers[3].click();

    await page.waitFor(5000);

    const html = await page.$eval('body', e => e.innerText);
    expect(html).not.toContain("test job");
    browser.close();
  }, 30000);

});
