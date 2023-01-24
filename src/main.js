const {playRound} = require("./game");

const {Command} = require('commander');
const {formatRecapGame} = require("./common/outputs");
const {createGame} = require("./services/game.service");
const program = new Command();

program
    .name('rock-paper-scissors-client')
    .description('Client for rock-paper-scissors')
    .version('0.0.0');

program.command('play')
    .description('Start a rock paper scissors game')
    .option('--rounds <int>', 'Number of rounds to win')
    .action(async (str) => {
        let game = await createGame({
            maxRoundToWin: parseInt(str.rounds)
        });
        const res = await playRound(game);
        console.log(formatRecapGame(res));
    });

program.parse();