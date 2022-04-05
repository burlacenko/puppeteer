// how to call it:
// server must be up
// client (the target page) must be up
// run:
// node puppeteer-delete.js

const puppeteer = require('puppeteer');

// now we add a block of code to be executed as soon as the code loads
(async () => {
  let browser = null;
  try {
    // https://www.w3schools.com/jsref/jsref_try_catch.asp
    // tryCode - Code block to run
    // Step 1 - Launch Puppeteer and assign response to the browser variable
    // const browser = await puppeteer.launch();
    browser = await puppeteer.launch();

    // Step 2 - Using the browser variable, create a new page and assign the response to the page variable
    const page = await browser.newPage();
    // await page.setViewport({ width: 1920, height: 1080});
    await page.setViewport({ width: 1366, height: 768});

    // Step 3 - Using the page variable goto the correct URL that the React app is running on
    await page.goto('http://localhost:3000');
    // a simple page URL:
    // await page.goto('http://localhost:3000/addUser.html');

    // Step 4 - Using the page variable, use the click method by passing the ".create-user" class name
    await page.click('.delete-user');
    // a simple button by id:
    // await page.click('#addUser'); 

    // Step 5 - Using the page variable, use the screenshot method to generate a screenshot of the React app with the newly created user
    let today = new Date();
    // console.log(today);

    let datestring = (today.getFullYear() + "-"  
    + ("0"+(today.getMonth()+1)).slice(-2) + "-" 
    + ("0"+today.getDate()).slice(-2) + "-"
    + ("0"+today.getHours()).slice(-2) + "" 
    + ("0"+today.getMinutes()).slice(-2)
    + ("0"+today.getSeconds()).slice(-2)
    );

    // var filename = `screen${todayStr}.png`;
    let filename = `screenshot${datestring}.png`;

    await page.screenshot({path: filename});
    console.log(`Screenshot save: "${filename}"`)

    // finallyCode - Code block to be executed regardless of the try result
    // shutdown
    // browser.close();  

  }
  catch(err) {
    // catchCode - Code block to handle errors
    console.log(`Error catch: `);
    console.log(err);
  }
  finally {
    // finallyCode - Code block to be executed regardless of the try result
    // shutdown
    browser.close();  
  }  


})();

// NOTES on coding experience:
// I added the try...catch...finally structure to test it
// it seems to works fine
// but initially I was getting warnings of "deprecation":
// (node:116156) UnhandledPromiseRejectionWarning: ReferenceError: browser is not defined
// (node:116156) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing 
// inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
// (node:116156) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

// I SOLVED the warnings by redefining scope of the "browser" variable by creating it outside the try..finally block