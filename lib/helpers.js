require("dotenv").config();

var coreData=[];

module.exports = {
  loginGlobal: async function (page) {
    try {
      await page.goto("https://mybilling.global1tel.com:8442/index.html");

      await page.type("#pb_auth_user", process.env.USERNAME_GLOBAL, {
        delay: 5,
      }); // Types slower, like a user
      await page.waitForTimeout(100);
      await page.type("#pb_auth_password", process.env.PASSWORD_GLOBAL, {
        delay: 5,
      }); // Types slower, like a user
      await page.waitForSelector(".tabFormButton");

      await page.waitForTimeout(50);
      await page.click(".tabFormButton", {
        button: "left",
        clickCount: 1,
        delay: 150,
      }),
        await page.waitForTimeout(2000);
    } catch (error) {
      throw new Error("logging in to global was not successful !");
    }
  },

  activatePower6: async function (sim, page, browser, cb) {
    try {
      await page.waitForTimeout(1000);

      await page.goto(
        "https://mybilling.global1tel.com:8442/supplementary/sim_inventory_4/index.html"
      );
      await page.waitForSelector("#ext-gen1046");
      await page.waitForTimeout(40);
      await page.type("#ext-gen1046", sim);

      await page.click("#button-1057", { delay: 80 });
      await page
        .waitForSelector(".x-grid-row ")
        .then(() => console.log("selector .x-grid-row is visible: "));

      await page.waitForTimeout(50);
      await page.waitForSelector(".x-grid-row td a");

      await page.click(".x-grid-row td a", { delay: 100 });
      await page.waitForTimeout(500);

      await page.click(".x-grid-cell-inner a", { delay: 100 });

      const getNewPageWhenLoaded = async () => {
        return new Promise((x) =>
          browser.on("targetcreated", async (target) => {
            if (target.type() === "page") {
              const newPage = await target.page();
              const newPagePromise = new Promise((y) =>
                newPage.once("domcontentloaded", () => y(newPage))
              );
              const isPageLoaded = await newPage.evaluate(
                () => document.readyState
              );
              return isPageLoaded.match("complete|interactive")
                ? x(newPage)
                : x(newPagePromise);
            }
          })
        );
      };

      const newPagePromise = getNewPageWhenLoaded();
      page1 = await newPagePromise;

      await page1.bringToFront();

      await page1
        .waitForSelector("#PortaBilling_TabName_Products_bgc a")
        .then(() => page1.waitForTimeout(3000))
        .then(() =>
          console.log(
            "selector #PortaBilling_TabName_Products_bgc a is visible: "
          )
        );
      await page1.waitForTimeout(3000);

      await page1.click("#PortaBilling_TabName_Products_bgc a", { delay: 150 });

      await page1.waitForSelector(".x-grid-cell-inner");
      await page1.waitForTimeout(3000);

      // let selector1 = ".x-grid-cell-inner";

      const [button] = await page1.$x(
        "//div[contains(., 'Amicus - 6GB Data Bundle')]"
      );
      if (button) {
        await page1.click(
          "#gridview-1039-record-3255 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-actioncolumn-1038.x-action-col-cell.x-grid-cell-last.x-unselectable > div > img",
          { delay: 50 }
        );
        await console.log("button clicked");
      }
      await page1.waitForTimeout(3000);

      await page1.waitForSelector("#top_save_btn_id > a");
      await page1.waitForTimeout(500);
      await page1.click("#top_save_btn_id > a", { delay: 120 });
      await page1.waitForTimeout(3000);

      await page1.waitForXPath(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );
      await console.log(
        "x path /html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2] is visible: "
      );

      await page1.waitForTimeout(500);
      const elements = await page1.$x(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );

      await page1.waitForTimeout(500);
      await elements[0].click();

      //==============
    
// const confs = await page1.$x("/html/body/div[1]/div/div/div/div/div/div[1]/form[10]/center/table/tbody/tr[2]/td/div[2]/div[2]/div[2]/div[2]/div/div/div[1]/div[3]/div[1]/div/table/tbody/tr/td[1]/div");
//#gridview-1030-record-2971 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1025.x-unselectable > div

await page1.waitForSelector("#gridview-1030-record-2971 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1025.x-unselectable > div")
await page1.waitForTimeout(1500);
      const conf = await page1.$eval("#gridview-1030-record-2971 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1025.x-unselectable > div",
        (element) => element.innerText
      );
//#displayfield-1046-inputEl
      //#final_details > div:nth-child(2) > div > span

      await page1.waitForSelector("#displayfield-1046-inputEl")
      await page1.waitForTimeout(1200);
      const c_total = await page1.$eval(
        "#displayfield-1046-inputEl",
        (element) => element.innerText
      );
      // console.log(conf);
      let data1 = {
        sim: sim,
        result: conf,
        total: c_total,
      };

     cb(false, { data: data1 });


    }
    catch (error) {
      throw new Error(` could not activate sim: ${sim}`);
    }
  },

  activatePower3: async function (sim, page, browser) {
    try {
      await page.waitForTimeout(1000);

      await page.goto(
        "https://mybilling.global1tel.com:8442/supplementary/sim_inventory_4/index.html"
      );
      await page.waitForSelector("#ext-gen1046");
      await page.waitForTimeout(40);
      await page.type("#ext-gen1046", sim);

      await page.click("#button-1057", { delay: 80 });
      await page
        .waitForSelector(".x-grid-row ")
        .then(() => console.log("selector .x-grid-row is visible: "));

      await page.waitForTimeout(50);
      await page.waitForSelector(".x-grid-row td a");

      await page.click(".x-grid-row td a", { delay: 100 });
      await page.waitForTimeout(500);

      await page.click(".x-grid-cell-inner a", { delay: 100 });

      const getNewPageWhenLoaded = async () => {
        return new Promise((x) =>
          browser.on("targetcreated", async (target) => {
            if (target.type() === "page") {
              const newPage = await target.page();
              const newPagePromise = new Promise((y) =>
                newPage.once("domcontentloaded", () => y(newPage))
              );
              const isPageLoaded = await newPage.evaluate(
                () => document.readyState
              );
              return isPageLoaded.match("complete|interactive")
                ? x(newPage)
                : x(newPagePromise);
            }
          })
        );
      };

      const newPagePromise = getNewPageWhenLoaded();
      page1 = await newPagePromise;

      await page1.bringToFront();

      await page1
        .waitForSelector("#PortaBilling_TabName_Products_bgc a")
        .then(() => page1.waitForTimeout(3000))
        .then(() =>
          console.log(
            "selector #PortaBilling_TabName_Products_bgc a is visible: "
          )
        );
      await page1.waitForTimeout(3000);

      await page1.click("#PortaBilling_TabName_Products_bgc a", { delay: 150 });

      await page1.waitForSelector(".x-grid-cell-inner");
      await page1.waitForTimeout(3000);

      let selector1 = ".x-grid-cell-inner";

      const [button] = await page1.$x(
        "//div[contains(., 'Amicus - 6GB Data Bundle')]"
      );
      if (button) {
        await page1.click(
          "#gridview-1039-record-3255 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-actioncolumn-1038.x-action-col-cell.x-grid-cell-last.x-unselectable > div > img",
          { delay: 50 }
        );
        await console.log("button clicked");
      }
      await page1.waitForTimeout(3000);

      await page1.waitForSelector("#top_save_btn_id > a");
      await page1.waitForTimeout(500);
      await page1.click("#top_save_btn_id > a", { delay: 120 });
      await page1.waitForTimeout(3000);

      await page1.waitForXPath(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );
      await console.log(
        "x path /html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2] is visible: "
      );

      await page1.waitForTimeout(500);
      const elements = await page1.$x(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );

      await page1.waitForTimeout(500);
      await elements[0].click();
    } catch (error) {
      throw new Error(` could not activate sim: ${sim}`);
    }
  },
  activatePower5: async function (sim, page, browser) {
    try {
      await page.waitForTimeout(1000);

      await page.goto(
        "https://mybilling.global1tel.com:8442/supplementary/sim_inventory_4/index.html"
      );
      await page.waitForSelector("#ext-gen1046");
      await page.waitForTimeout(40);
      await page.type("#ext-gen1046", sim);

      await page.click("#button-1057", { delay: 80 });
      await page
        .waitForSelector(".x-grid-row ")
        .then(() => console.log("selector .x-grid-row is visible: "));

      await page.waitForTimeout(50);
      await page.waitForSelector(".x-grid-row td a");

      await page.click(".x-grid-row td a", { delay: 100 });
      await page.waitForTimeout(500);

      await page.click(".x-grid-cell-inner a", { delay: 100 });

      const getNewPageWhenLoaded = async () => {
        return new Promise((x) =>
          browser.on("targetcreated", async (target) => {
            if (target.type() === "page") {
              const newPage = await target.page();
              const newPagePromise = new Promise((y) =>
                newPage.once("domcontentloaded", () => y(newPage))
              );
              const isPageLoaded = await newPage.evaluate(
                () => document.readyState
              );
              return isPageLoaded.match("complete|interactive")
                ? x(newPage)
                : x(newPagePromise);
            }
          })
        );
      };

      const newPagePromise = getNewPageWhenLoaded();
      page1 = await newPagePromise;

      await page1.bringToFront();

      await page1
        .waitForSelector("#PortaBilling_TabName_Products_bgc a")
        .then(() => page1.waitForTimeout(3000))
        .then(() =>
          console.log(
            "selector #PortaBilling_TabName_Products_bgc a is visible: "
          )
        );
      await page1.waitForTimeout(3000);

      await page1.click("#PortaBilling_TabName_Products_bgc a", { delay: 150 });

      await page1.waitForSelector(".x-grid-cell-inner");
      await page1.waitForTimeout(3000);

      let selector1 = ".x-grid-cell-inner";

      const [button] = await page1.$x(
        "//div[contains(., 'Amicus - 6GB Data Bundle')]"
      );
      if (button) {
        await page1.click(
          "#gridview-1039-record-3255 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-actioncolumn-1038.x-action-col-cell.x-grid-cell-last.x-unselectable > div > img",
          { delay: 50 }
        );
        await console.log("button clicked");
      }
      await page1.waitForTimeout(3000);

      await page1.waitForSelector("#top_save_btn_id > a");
      await page1.waitForTimeout(500);
      await page1.click("#top_save_btn_id > a", { delay: 120 });
      await page1.waitForTimeout(3000);

      await page1.waitForXPath(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );
      await console.log(
        "x path /html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2] is visible: "
      );

      await page1.waitForTimeout(500);
      const elements = await page1.$x(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );

      await page1.waitForTimeout(500);
      await elements[0].click();
    } catch (error) {
      throw new Error(` could not activate sim: ${sim}`);
    }
  },
  activatePower20: async function (sim, page, browser) {
    try {
      await page.waitForTimeout(1000);

      await page.goto(
        "https://mybilling.global1tel.com:8442/supplementary/sim_inventory_4/index.html"
      );
      await page.waitForSelector("#ext-gen1046");
      await page.waitForTimeout(40);
      await page.type("#ext-gen1046", sim);

      await page.click("#button-1057", { delay: 80 });
      await page
        .waitForSelector(".x-grid-row ")
        .then(() => console.log("selector .x-grid-row is visible: "));

      await page.waitForTimeout(50);
      await page.waitForSelector(".x-grid-row td a");

      await page.click(".x-grid-row td a", { delay: 100 });
      await page.waitForTimeout(500);

      await page.click(".x-grid-cell-inner a", { delay: 100 });

      const getNewPageWhenLoaded = async () => {
        return new Promise((x) =>
          browser.on("targetcreated", async (target) => {
            if (target.type() === "page") {
              const newPage = await target.page();
              const newPagePromise = new Promise((y) =>
                newPage.once("domcontentloaded", () => y(newPage))
              );
              const isPageLoaded = await newPage.evaluate(
                () => document.readyState
              );
              return isPageLoaded.match("complete|interactive")
                ? x(newPage)
                : x(newPagePromise);
            }
          })
        );
      };

      const newPagePromise = getNewPageWhenLoaded();
      page1 = await newPagePromise;

      await page1.bringToFront();

      await page1
        .waitForSelector("#PortaBilling_TabName_Products_bgc a")
        .then(() => page1.waitForTimeout(3000))
        .then(() =>
          console.log(
            "selector #PortaBilling_TabName_Products_bgc a is visible: "
          )
        );
      await page1.waitForTimeout(3000);

      await page1.click("#PortaBilling_TabName_Products_bgc a", { delay: 150 });

      await page1.waitForSelector(".x-grid-cell-inner");
      await page1.waitForTimeout(3000);

      let selector1 = ".x-grid-cell-inner";

      const [button] = await page1.$x(
        "//div[contains(., 'Amicus - 6GB Data Bundle')]"
      );
      if (button) {
        await page1.click(
          "#gridview-1039-record-3255 > tbody > tr > td.x-grid-cell.x-grid-td.x-grid-cell-actioncolumn-1038.x-action-col-cell.x-grid-cell-last.x-unselectable > div > img",
          { delay: 50 }
        );
        await console.log("button clicked");
      }
      await page1.waitForTimeout(3000);

      await page1.waitForSelector("#top_save_btn_id > a");
      await page1.waitForTimeout(500);
      await page1.click("#top_save_btn_id > a", { delay: 120 });
      await page1.waitForTimeout(3000);

      await page1.waitForXPath(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );
      await console.log(
        "x path /html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2] is visible: "
      );

      await page1.waitForTimeout(500);
      const elements = await page1.$x(
        "/html/body/div[11]/div[3]/div/div/a[2]/span/span/span[2]"
      );

      await page1.waitForTimeout(500);
      await elements[0].click();
    } catch (error) {
      throw new Error(` could not activate sim: ${sim}`);
    }
  },
  click: async function (page, selector) {
    try {
    } catch (error) {
      throw new Error("custom click could not happen");
    }
  },

  loginCore: async function (page, browser) {
    try {
      await page.goto("https://premier.cashonmobile.co.uk/login.php");
      await page.bringToFront();
      // await page.waitForSelector(".selected-dial-code");

      await page.waitForTimeout(250);
      await page.click(".selected-dial-code", {
        button: "left",
        clickCount: 1,
        delay: 40,
      });
      await page.click(".iti-flag.gb", {
        button: "left",
        clickCount: 1,
        delay: 40,
      });
      await page.waitForTimeout(1100);
      //#txt_username
      await page.type("#txt_username", process.env.USERNAME_CORE); // Types slower, like a user
      await page.waitForTimeout(200);
      await page.type("#txt_password", process.env.PASSWORD_CORE); // Types slower, like a user
      await page.waitForTimeout(900);
      await page.click("#login > div.inputwrapper.animate3.bounceIn > button", {
        button: "left",
        clickCount: 1,
        delay: 0,
      });
      await page.waitForTimeout(4500);

    } catch (error) {
      throw new Error("log in core  could not happen");
    }
  },
  activateCore: async function ( page, sim, cb) {
    try {
      await page.goto("https://premier.cashonmobile.co.uk/dom_topup.php");
     
      // await console.log("we are on the page....");
      
      await page.waitForTimeout(13000);
      
      await page.waitForSelector("#lst_delivery_method");
      await page.select("select#lst_delivery_method", "6");
      // await page.waitForSelector("#lst_operators");
      //#lst_operators
      // await page.waitForTimeout(1000);
      //#lst_operators > option:nth-child(2)
      await page.waitForSelector("option[value='427']");
      //  await page.select("select#lst_operators", "427");
       await page.select("select#lst_operators", "427");
      // await page.waitForSelector("#txt_sim_number");
      
      await page.waitForSelector("#txt_sim_number");
      // await console.log("selector #txt_sim_number visible: ");
      // page
      //   .waitForSelector("#txt_sim_number")
      //   .then(() => console.log("selector #txt_sim_number visible: "));
      
      await page.type("#txt_sim_number", sim);
      
      await page.waitForSelector("#lst_denominations");
    
      await page.select("select#lst_denominations", "743");

      await page.waitForTimeout(500); //
      await page.click("#next", { delay: 80 });
     
      await page.waitForSelector("#txt_tpin");
      await page.waitForTimeout(600);

      await page.type("#txt_tpin", process.env.TPIN_CORE);
      await page.waitForTimeout(800);
      await page.waitForSelector("#next");
      await page.click("#next", {
        button: "left",
        clickCount: 1,
        delay: 70,
      });
      await page.waitForTimeout(3000);
      await page.waitForSelector(
        "#final_details > div:nth-child(2) > div > span"
      );

      const conf = await page.$eval(
        "#final_details > div:nth-child(2) > div > span",
        (element) => element.innerText
      );

      //#final_details > div:nth-child(2) > div > span
      const c_total = await page.$eval(
        "#widgets > li:nth-child(3) > a",
        (element) => element.innerText
      );
      // console.log(conf);
      let data1 = {
        sim: sim,
        result: conf,
        total: c_total,
      };

      cb(false, { data: data1 });

    } catch (error) {
      throw new Error("activate core could not happen");
    }
  },

  activateCore1: async function ( page, sim, cb) {
  try {
    await page.goto("https://premier.cashonmobile.co.uk/dom_topup.php");
   
    // await console.log("we are on the page....");
    
    await page.waitForTimeout(13000);
    
    await page.waitForSelector("#lst_delivery_method");
    await page.select("select#lst_delivery_method", "6");
    // await page.waitForSelector("#lst_operators");
    //#lst_operators
    // await page.waitForTimeout(1000);
    //#lst_operators > option:nth-child(2)
    await page.waitForSelector("option[value='427']");
    //  await page.select("select#lst_operators", "427");
     await page.select("select#lst_operators", "427");
    // await page.waitForSelector("#txt_sim_number");
    
    await page.waitForSelector("#txt_mobile_number");
    // await console.log("selector #txt_sim_number visible: ");
    // page
    //   .waitForSelector("#txt_sim_number")
    //   .then(() => console.log("selector #txt_sim_number visible: "));
    
    await page.type("#txt_mobile_number", sim);
    
    await page.waitForSelector("#lst_denominations");
    //#lst_denominations
  
    await page.waitForTimeout(1000);
    await page.select("select#lst_denominations", "743");

    await page.waitForTimeout(800); //
    await page.click("#next", { delay: 80 });
   
    await page.waitForSelector("#txt_tpin");
    await page.waitForTimeout(600);

    await page.type("#txt_tpin", process.env.TPIN_CORE);
    await page.waitForTimeout(800);
    await page.waitForSelector("#next");
    await page.click("#next", {
      button: "left",
      clickCount: 1,
      delay: 70,
    });
    await page.waitForTimeout(3000);
    await page.waitForSelector(
      "#final_details > div:nth-child(2) > div > span"
    );

    const conf = await page.$eval(
      "#final_details > div:nth-child(2) > div > span",
      (element) => element.innerText
    );

    //#final_details > div:nth-child(2) > div > span
    const c_total = await page.$eval(
      "#widgets > li:nth-child(3) > a",
      (element) => element.innerText
    );
    // console.log(conf);
    let data1 = {
      sim: sim,
      result: conf,
      total: c_total,
    };

    cb(false, { data: data1 });

  } catch (error) {
    throw new Error("activate core could not happen");
  }
},

activateCore25n: async function ( page, sim, cb) {
  try {
    await page.goto("https://premier.cashonmobile.co.uk/dom_topup.php");
   
    // await console.log("we are on the page....");
    
    await page.waitForTimeout(6000);
    
    await page.waitForSelector("#lst_delivery_method");
    await page.select("select#lst_delivery_method", "6");
    // await page.waitForSelector("#lst_operators");
    //#lst_operators
    // await page.waitForTimeout(1000);
    //#lst_operators > option:nth-child(2)
    await page.waitForSelector("option[value='427']");
    //  await page.select("select#lst_operators", "427");
     await page.select("select#lst_operators", "427");
    // await page.waitForSelector("#txt_sim_number");
    
    await page.waitForSelector("#txt_mobile_number");
    // await console.log("selector #txt_sim_number visible: ");
    // page
    //   .waitForSelector("#txt_sim_number")
    //   .then(() => console.log("selector #txt_sim_number visible: "));
    
    await page.type("#txt_mobile_number", sim);
    
    await page.waitForSelector("#lst_denominations");
    //#lst_denominations
  
    await page.waitForTimeout(1000);
    await page.select("select#lst_denominations", "742");

    await page.waitForTimeout(800); //
    await page.click("#next", { delay: 80 });
   
    await page.waitForSelector("#txt_tpin");
    await page.waitForTimeout(600);

    await page.type("#txt_tpin", process.env.TPIN_CORE);
    await page.waitForTimeout(800);
    await page.waitForSelector("#next");
    await page.click("#next", {
      button: "left",
      clickCount: 1,
      delay: 70,
    });
    await page.waitForTimeout(3000);
    await page.waitForSelector(
      "#final_details > div:nth-child(2) > div > span"
    );

    const conf = await page.$eval(
      "#final_details > div:nth-child(2) > div > span",
      (element) => element.innerText
    );

    //#final_details > div:nth-child(2) > div > span
    const c_total = await page.$eval(
      "#widgets > li:nth-child(3) > a",
      (element) => element.innerText
    );
    // console.log(conf);
    let data1 = {
      sim: sim,
      result: conf,
      total: c_total,
    };

    cb(false, { data: data1 });

  } catch (error) {
    throw new Error("activate core could not happen");
  }
},
};

//#ext-gen433 > div > table > tbody > tr > td.x-grid3-col.x-grid3-cell.x-grid3-td-dashVDUsed.x-selectable > div > table > tbody > tr > td
///html/body/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[2]/div/div[2]/div/div/div/div[2]/div[4]/div[2]/div[1]/div/div/div/div/div/form/div/div/div/div/div[1]/div[2]/div/div/table/tbody/tr/td[6]/div/table/tbody/tr/td/div/div/div[2]
