const id = "pamico3332@nic58.com";
const pass = "12345678";
const puppeteer = require("puppeteer");

async function login(){
    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport : null,
        args : ["--start-maximized"]
        // slowMo : 100
    });
    const page = await browser.pages();
    let tab = page[0];
    // login page
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2", pass);
    // await tab.click("#tab-1-content-1 > div.login-form.auth-form.theme-m > form > div.form-item.clearfix > button");
    // // login complete
    // console.log("logged in");
    // // menu bar profile selector
    // await tab.waitForSelector("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div");
    // await tab.waitForTimeout(3000);
    // // profile click
    // let event = await tab.$("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div > span");
    // await event.click();
    // // admin click
    // await tab.click("#content > div > div > div > div > div.page-header-wrapper.theme-m-section > nav > div > div.nav-buttons.theme-m-section > ul.pull-left.nav-wrap.mmL > li:nth-child(3) > div > div.dropdown-body.profile-nav__dropdown-menu > ul > li:nth-child(8) > a");
    // // await tab.waitForTimeout(3000);
    // // await tab.click(".nav-tabs > li:nth-child(2) > a:nth-child(1)", {waitUntil : 'load'});
    // await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    // let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    // let manageChallengeLi = bothLis[1];
    // await manageChallengeLi.click();
    // // let createelement = await tab.click("#content > div > div > div > section > div:nth-child(2) > button");
    // // await tab.click(createelement);
    // await tab.waitForTimeout(3000);
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(2000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    addModerators(browser,tab);
}
login();
async function addModerators(browser , tab){
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let allATags = await tab.$$('.backbone.block-center');
    let allQuesLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let qLink = await tab.evaluate( function(elem){  return elem.getAttribute("href");  }   , allATags[i]);
        qLink = "https://www.hackerrank.com"+qLink;
        allQuesLinks.push(qLink);
    }

    for(let i=0 ; i<allQuesLinks.length ; i++){
        let qLink = allQuesLinks[i];
        let newTab = await browser.newPage();
        await addModeratorToASingleQues(newTab , qLink);
    }

    // next button active hai to click on next
    // addModerators(browser , tab);

    let allLis = await tab.$$('.pagination li');
    let nextBtnLi = allLis[allLis.length-2];
    let isDisabled = await tab.evaluate( function(elem){ return elem.classList.contains("disabled");  } , nextBtnLi );
    // if true ??
    if(isDisabled){
        return;
    }
    // else false ??
    await nextBtnLi.click();
    await tab.waitForTimeout(5000);
    await addModerators(browser , tab);
}
async function addModeratorToASingleQues(newTab , qLink){
    await newTab.goto(qLink);
    await newTab.waitForTimeout(2000);
    await newTab.click('li[data-tab="moderators"]');
    await newTab.waitForSelector('#moderator' , {visible:true});
    await newTab.type("#moderator" , "Moderator Shit");
    await newTab.click('.btn.moderator-save');
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.waitForTimeout(2000);
    await newTab.close();
}