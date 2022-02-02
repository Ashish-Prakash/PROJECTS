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
};
login ();