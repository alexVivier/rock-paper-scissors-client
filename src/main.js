
import {Command} from 'commander';
import {createGame} from "./services/game.service.js";
import {playRound} from "./game.js";
import {formatRecapGame} from "./common/outputs.js";
import {login, logout, signup} from "./auth.js";
import {getItem} from "./local-storage/index.js";
const program = new Command();

program
    .name('rock-paper-scissors-client')
    .description('Client for rock-paper-scissors')
    .version('0.0.0');

program.command('play')
    .description('Start a rock paper scissors game')
    .option('--rounds <int>', 'Number of rounds to win')
    .action(async (str) => {
        if (getItem('auth.token')) {
            const user = getItem('user');
            console.log(`\nYou will play logged as : ${user.pseudo}\n`);
        }
        let game = await createGame({
            maxRoundToWin: parseInt(str.rounds)
        });
        const res = await playRound(game);
        console.log(formatRecapGame(res));
    });

program.command('signup')
    .description('Create rock paper scissors user account')
    .action(async () => {
        signup()
    })

program.command('login')
    .description('Log to your account')
    .action(async () => {
        login()
    })

program.command('logout')
    .description('Logout form the current account')
    .action(async () => {
        logout()
    })
program.parse();