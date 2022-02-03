const id = "shivamkarn8851@gmail.com";
const pass = "81779370";
const puppeteer = require("puppeteer");

async function login(){
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"],
        // slowMo : 200
    });
    const page = await browser.pages();
    let tab = page[0];
    await tab.goto("https://practice.geeksforgeeks.org/", {waitUntil: 'load'});
    await tab.click(".header-main__signup");
    await tab.waitForTimeout(3000);
    await tab.type("#luser", id);
    await tab.type("#password", pass);
    await tab.click("#Login > div:nth-child(5) > input[type=checkbox]:nth-child(3)");
    await tab.click("#Login > button");
    await tab.waitForTimeout(3000);
    await tab.click("body > div.header-hellobar-container.stick-me > div.header-main__wrapper > div.header-main__container > ul.header-main__list > li:nth-child(1) > a");
}

login();