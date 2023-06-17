const chalk = require('chalk');
const reedLine = require('readline').createInterface({
    output: process.stdout,
    input: process.stdin,
});

let counter = 1;
const limitAttempts = 10;
const randomNumber = Math.round(Math.random() * 10);

console.log(chalk.green.bgBlue.bold('Game is started!'));

const game = () => { 
    if (counter < limitAttempts) {
        reedLine.question(chalk.yellow.bold("Enter a number"), (number) => { 
            ++counter;
            if (Number(number) === randomNumber) {
                console.log(chalk.green.bold('Game win!'));
                reedLine.close();
            }
            else if (Number(number) > randomNumber) {
                console.log(chalk.blue.bold('You number is bigger! Try again'));
                game();
            }
            else {
                console.log(chalk.blue.bold('You number is smaller! Try again'));
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