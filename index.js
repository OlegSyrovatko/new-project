const chalk = require('chalk');
const { log } = require('console');
const reedLine = require('readline').createInterface({
    output: process.stdout,
    input: process.stdin,
});
const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "./result.json");


let counter = 1;
const limitAttempts = 10;
const randomNumber = Math.round(Math.random() * 10);

console.log(chalk.green.bgBlue.bold('Game is started!'));
fs.writeFile(filePath, JSON.stringify([]));

const game = () => { 
    if (counter < limitAttempts) {
        reedLine.question(chalk.yellow.bold("Enter a number"), async (number) => { 
            ++counter;
            if (Number(number) === randomNumber) {
                console.log(chalk.green.bold('Game win!'));
                console.log(JSON.parse(await fs.readFile(filePath)));
                reedLine.close();
            }
            else {
                if (Number(number) > randomNumber) {
                console.log(chalk.blue.bold('You number is bigger! Try again'));
                }
                if (Number(number) < randomNumber) { 
                   console.log(chalk.blue.bold('You number is smaller! Try again'));
                }
                const fileData = JSON.parse(await fs.readFile(filePath));
                const res = { number, counter };
                await fs.writeFile(filePath, JSON.stringify([...fileData, res]));
                game();
             }

        });
    }
    else { 
        console.log(chalk.red.bgBlue.bold('Game over!'));
        reedLine.close();
    }
}
game();