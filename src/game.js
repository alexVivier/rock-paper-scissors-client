const inquirer = require("inquirer");
const {values, choices} = require("./common/constants");
const {getComputerChoice, addPlayedRound, getGame} = require("./services/game.service");


async function playRound(game) {
    const computerChoice = await getComputerChoice();
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'playerChoice',
            message: `Make your choice (${game.playerScore} - ${game.computerScore}) | ${game.maxRoundToWin} to win.`,
            choices
        },
    ]);
    console.log(`Computer choose : ${choices[values.findIndex(el => el === computerChoice)]}`);
    const playerChoice = values[choices.findIndex(el => el === answers.playerChoice)];
    const res = await addPlayedRound(game._id, {
        computerChoice,
        playerChoice
    });
    if (res.status === "started") {
        await playRound(await getGame(game._id));
    }
    return await getGame(game._id);
}

module.exports = {playRound};