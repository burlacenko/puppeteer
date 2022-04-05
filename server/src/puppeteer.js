const puppeteer = require('puppeteer');

const testCreateUserButton = async () => {
    // tryCode - Code block to run
    // Step 1 - Launch Puppeteer and assign response to the browser variable
    const browser = await puppeteer.launch();

    // Step 2 - Using the browser variable, create a new page and assign the response to the page variable
    const page = await browser.newPage();
    // await page.setViewport({ width: 1920, height: 1080});
    await page.setViewport({ width: 1366, height: 768});

    // Step 3 - Using the page variable goto the correct URL that the React app is running on
    await page.goto('http://localhost:3000');
    // a simple page URL:
    // await page.goto('http://localhost:3000/addUser.html');

    // Step 4 - Using the page variable, use the click method by passing the ".create-user" class name
    await page.click('.create-user');
    // a simple button by id:
    // await page.click('#addUser'); 

    // Step 5 - Using the page variable, use the screenshot method to generate a screenshot of the React app with the newly created user
    var today = new Date();

    var datestring = (today.getFullYear() + "-"  
    + ("0"+(today.getMonth()+1)).slice(-2) + "-" 
    + ("0"+today.getDate()).slice(-2) + "-"
    + ("0"+today.getHours()).slice(-2) + "" 
    + ("0"+today.getMinutes()).slice(-2)
    + ("0"+today.getSeconds()).slice(-2)
    );

    // var filename = `screen${todayStr}.png`;
    var filename = `initial_screenshot${datestring}.png`;

    await page.screenshot({path: filename});
    console.log(`initial screenshot save: "${filename}"`)

    // finallyCode - Code block to be executed regardless of the try result
    // shutdown
    await browser.close();  
};

module.exports = testCreateUserButton;
