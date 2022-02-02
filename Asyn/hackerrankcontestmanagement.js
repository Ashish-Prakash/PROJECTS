const pupperteer =  require("puppeteer");
const id = "xohej77478@paseacuba.com";
const pass = "123456789";
let challenges = require("./challenges");

async function login (){
    const browser = await pupperteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"],
    });
    const page = await browser.pages();
    let tab = page[0];
    // login page
    await tab.goto("https://www.hackerrank.com/auth/login" , {waitUntil: 'load'});
    await tab.type("#input-1",id);
    await tab.type("#input-2",pass);
    await tab.click("#tab-1-content-1 > div.login-form.auth-form.theme-m > form > div.form-item.clearfix > button");
    // login complete
    console.log("logged in");
    // menu bar profile selector
    await tab.waitForSelector("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div");
    await tab.waitForTimeout(3000);
    // profile click
    let event = await tab.$("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div > span");
    await event.click();
    // admin click
    await tab.click("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div.dropdown-body.profile-nav__dropdown-menu > ul > li:nth-child(8) > a");
    // await tab.waitForTimeout(3000);
    // await tab.click(".nav-tabs > li:nth-child(2) > a:nth-child(1)", {waitUntil : 'load'});
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    // let createelement = await tab.click("#content > div > div > div > section > div:nth-child(2) > button");
    // await tab.click(createelement);
    await tab.waitForTimeout(3000);
    // await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true});
    // let createChallengeElement = await tab.$('.btn.btn-green.backbone.pull-right');
    // let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }   ,  createChallengeElement)
    // createChallengeLink = "https://www.hackerrank.com"+createChallengeLink;
    let createchallengelink = "https://www.hackerrank.com/administration/challenges/create";
    for(let i=0;i<challenges;i++){
        await tab.waitForTimeout(2000);
        await addchalange(browser, createchallengelink, challenges[i]);
    }
    // await addchalange(browser,createchallengelink, challenges[0]);
};
login ();

async function addchalange(browser, createchallengelink, challenge){
    let newTab = await browser.newPage();
    await newTab.goto(createchallengelink);

    let challengeName = challenge["Challenge Name"];
    let Description = challenge["Description"];
    let ProblemStatement = challenge["Problem Statement"];
    let InputFormat = challenge["Input Format"];
    let Constraints = challenge["Constraints"];
    let OutputFormat = challenge["Output Format"]
    let Tags = challenge["Tags"];

    await newTab.waitForTimeout(3000);
    await newTab.type("#name", challengeName);
    await newTab.type("#preview", Description);
    await newTab.type("#problem_statement-container > div > div > div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea", ProblemStatement);
    await newTab.type("#input_format-container > div > div > div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea", InputFormat);
    await newTab.type("#constraints-container > div > div > div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea", Constraints);
    await newTab.type("#output_format-container > div > div > div.CodeMirror.cm-s-default.CodeMirror-wrap > div:nth-child(1) > textarea", OutputFormat);
    await newTab.type("#tags_tag", Tags);
    await newTab.keyboard.press("Enter");
    await newTab.click("button.save-challenge");
    await newTab.waitForTimeout(3000);
    await newTab.close();
}