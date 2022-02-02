const pupperteer =  require("puppeteer");
const id = "xohej77478@paseacuba.com";
const pass = "123456789";


async function login (){
    const browser = await pupperteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"],
    });
    const page = await browser.pages();
    let tab = page[0];
    await tab.goto("https://www.hackerrank.com/auth/login" , {waitUntil: 'load'});
    await tab.type("#input-1",id);
    await tab.type("#input-2",pass);
    await tab.click("#tab-1-content-1 > div.login-form.auth-form.theme-m > form > div.form-item.clearfix > button");
    console.log("logged in");
    await tab.waitForSelector("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div");
    await tab.waitForTimeout(3000);
    let event = await tab.$("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div > span");
    await event.click();
    await tab.click("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div.dropdown-body.profile-nav__dropdown-menu > ul > li:nth-child(8) > a");
};
login ();