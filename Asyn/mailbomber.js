const puppeteer = require("puppeteer");

async function web(){
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"],
    });
    const page = await browser.pages();
    let tab = page[0];
    await tab.goto("https://temp-mail.org/en/");
}
web();