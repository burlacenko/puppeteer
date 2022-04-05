// how to call it:
// server must be up
// client (the target page) must be up
// examples:
// node puppeteer-cmd.js action=click targettype=class TARGET=create-user
// node puppeteer-cmd.js action=click targettype=class TARGET=delete-user

const puppeteer = require('puppeteer');
const { findParam, showParams } = require('./findParams.js');

// MOVED to 'findParams.js' 
// showParams to inside 'findParams.js'
// checking the arguments:
// console.log('A list of the arguments:');
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
//   });

//showParams();

// extracting args:
// var arg_node = process.argv.slice(0, 1);
// console.log(`Current node with path: ${arg_node}`);

// var arg_filename = process.argv.slice(1, 2);
// console.log(`Current filename with path: ${arg_filename}`);

// var args = process.argv.slice(2);
// console.log(`All the other arguments/parameters:`);
// console.log(args);

// MOVED  findParam to 'findParams.js'
// function findParam(argName, ignoreCase = true) {
// // this function returns:
// // a string if param was found
// // null if param was found by is empty
// // undefined type if param was not found
//     if (ignoreCase) {
//         argName = argName.toUpperCase();
//     }
//     let arg = process.argv.find( (val, index, array) => {
//         if (ignoreCase) {
//             val = val.toUpperCase();
//         }
//         return val.includes(argName + '=');
//     });
//     console.log(`looking for ${argName}: ${arg}`);

//     if (typeof arg !== 'undefined') {
//         let split = arg.split('=');
//         console.log(arg);
//         if (split[1]) {
//             return split[1]
//         } else {
//             return null
//         }
//     } return
// } 

// after I developed the findParam method
// let's use it to get desired arguments:

var action = findParam('action', true);
// console.log(`action is "${action}"`);

var targettype = findParam('targettype', true);
// console.log(`targettype is "${targettype}"`);

var target = findParam('target');
// console.log(`target is "${target}"`);

// adding a block of code to be executed as soon as the code loads
(async () => {
             })();

// now we add a block of code to be executed as soon as the code loads
async function runPuppeteer () {
  let browser = null;
  let targettypeValid = true;
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
    // await page.click('.delete-user');
    // EVOLVED to use args:
    if (action === 'click') {
       if (targettype === 'class') {
        await page.click('.' + target);   
       } else if (type === 'id') {
        await page.click('#' + target);  
       } else {
           console.log(`Invalid target type = ${targettype}`)
           targettypeValid = false;
       }
    }
    // a simple button by id:
    // await page.click('#addUser'); 

    // Step 5 - Using the page variable, use the screenshot method to generate a screenshot of the React app with the newly created user
    if (targettypeValid) {
        let today = new Date();
        let datestring = (today.getFullYear() + "-"  
        + ("0"+(today.getMonth()+1)).slice(-2) + "-" 
        + ("0"+today.getDate()).slice(-2) + "-"
        + ("0"+today.getHours()).slice(-2) + "" 
        + ("0"+today.getMinutes()).slice(-2)
        + ("0"+today.getSeconds()).slice(-2)
        );
    
        // var filename = `screen${todayStr}.png`;
        var filename = `screenshot${datestring}.png`;
    
        await page.screenshot({path: filename});
        console.log(`Screenshot save as file "${filename}"`)
    }

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


};

if ( action && targettype && target) {
    runPuppeteer();
} else {
    console.log(`Not enough arguments!`)
    console.log(`Please check required the arguments:`)
    console.log(`action is "${action}"`);
    console.log(`targettype is "${targettype}"`);
    console.log(`target is "${target}"`);
}

// NOTES on coding experience:
// I added the try...catch...finally structure to test it
// it seems to works fine
// but initially I was getting warnings of "deprecation":
// (node:116156) UnhandledPromiseRejectionWarning: ReferenceError: browser is not defined
// (node:116156) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing 
// inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
// (node:116156) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
// I SOLVED the warnings by redefining scope of the "browser" variable by creating it outside the try..finally block

// second improvement was to catch arguments from the command line 
// so that we coudl use it as parameter to determine the button or class to be "clicked"
// https://stackoverflow.com/questions/4351521/how-do-i-pass-command-line-arguments-to-a-node-js-program
// var args = process.argv.slice(2);

// or:
// print process.argv
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
//   });
//   This will generate:
  
//   $ node process-2.js one two=three four
//   0: node
//   1: /Users/mjr/work/node/process-2.js
//   2: one
//   3: two=three
//   4: four

// I created the function findParam(argName) which searches for a desired argument extracted from the command line
// this function returns:
// a string if param was found
// null if param was found by is empty
// undefined type if param was not found 

// EVOLVED findParam to take an "ignoreCase" option
// EVOLVED to findParams.js

// CHANGED the way we wrote the async
// async construction: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#description

// EVOLVED to use the args provided in the command line
