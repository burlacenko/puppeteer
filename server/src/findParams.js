// // checking the arguments:
exports.showParams = () => {
    console.log('A list of the arguments:');
    process.argv.forEach(function (val, index, array) {
        console.log(index + ': ' + val);
        });
}

// // extracting args:
// var arg_node = process.argv.slice(0, 1);
// console.log(`Current node with path: ${arg_node}`);

// var arg_filename = process.argv.slice(1, 2);
// console.log(`Current filename with path: ${arg_filename}`);

// var args = process.argv.slice(2);
// console.log(`All the other arguments/parameters:`);
// console.log(args);

// if I desired to export it at the "end" of the module, then I'd simply call it a "const" in here:
// const findParam = (argName, ignoreCase = true) => {
exports.findParam = (argName, ignoreCase = true, verbose = false) => {
// this function returns:
// a string if param was found
// null if param was found by is empty
// undefined type if param was not found
    if (ignoreCase) {
        argName = argName.toUpperCase();
    }
    let arg = process.argv.find( (val, index, array) => {
        if (ignoreCase) {
            val = val.toUpperCase();
        }
        return val.includes(argName + '=');
    });
    
    if (verbose) console.log(`looking for ${argName}: ${arg}`);

    if (typeof arg !== 'undefined') {
        let split = arg.split('=');
        
        if (verbose) console.log(arg);
        
        if (split[1]) {
            return split[1]
        } else {
            return null
        }
    } return
} 

// NOTES:
// this was designed to catch arguments from the command line 
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

// this would also be valid:
// exports.findParam = findParam;
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
// https://www.hacksparrow.com/nodejs/exports-vs-module-exports.html