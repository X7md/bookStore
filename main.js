// By x7md
import * as fs from 'fs';
import * as readline from 'readline';

const args = process.argv
// filter args, if started by dash.
const argsCommand = args.filter(e => /^\-/.test(e))[0]

let userMoney = 0;

/*
2d Array
[
 [ids],
 [Titles],
 [Authors],
 [Prices],
 [Quantities]
]

*/
let books = [
    [1, 2, 3, 4, 5],
    ["Start with why", "But how do it know", "Clean Code", "Zero to One", "You don't know JS"],
    ["Simon Sinek", "J. Clark Scott", "Robert Cecil Martin", "Peter Thiel", "Kyle Simpson"],
    [80.0 , 59.9, 50.0, 45.5, 39.9],
    [13, 22, 5, 12, 9]
];

// read user inputs
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// main function
(function (){
        switch (argsCommand) {
            case "-help":
                showHelp();
            break;

            case "-buy":
                user();
            break;

            default:
                console.log("invalid arg! \n");
                showHelp();
            break;
        }
})()

function user(){
    console.log("Hello new customer! \n");
    howMuchUserHave();
}

function howMuchUserHave(){
    rl.question('how much money you have? ', (answer) => {
        // check if user input is vaild number (int or float)
        if (/^\d+$|^\d+\.\d+$/.test(answer)) {
        userMoney = Number.parseFloat(answer);
            console.log(`Nice you have ${userMoney}RS! \n`);
        } else {
            console.log(`plz, add a valid number!`);
            // reCall self
            howMuchUserHave();
        }
        BuyaBook();
    });

}

function BuyaBook(){
    rl.question('Wanna book? serach by typing: name of book, author, price ', (answer) => {
        // check if there is book/books match user input
        const search = (q) => books.map(e => e.filter(a => a.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 )).filter(e => e.length > 0);
        const booksMatch = search(answer);
        if (booksMatch){
            console.log("nice there is: ");
            console.log(booksMatch);
        }else{
            console.log("Sorry, but there is no book match your search! /n");
        }
        
    });
}

function showHelp(){
    const commandHelp = `
    arguments: 
    -help: show this litte help.
    -buy: start as customer mode.
    -admin: start as admin mode.
    `.trim();
    console.log(commandHelp + "\n");
    process.exit();
}