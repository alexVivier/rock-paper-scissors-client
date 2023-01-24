const inquirer = require("inquirer");
const {values, choices} = require("./common/constants");
const {getComputerChoice, addPlayedRound, getGame} = require("./services/game.service");


async function playRound(game) {
    // Get the computer's choice for the round
    const computerChoice = await getComputerChoice();
    // Use inquirer library to prompt player for their choice
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'playerChoice',
            message: `Make your choice (${game.playerScore} - ${game.computerScore}) | ${game.maxRoundToWin} to win.`,
            choices
        },
    ]);
    // Log the computer's choice to the console
    console.log(`Computer choose : ${choices[values.findIndex(el => el === computerChoice)]}`);
    // Assign the player's choice
    const playerChoice = values[choices.findIndex(el => el === answers.playerChoice)];
    // Add the round information to the game
    const res = await addPlayedRound(game._id, {
        computerChoice,
        playerChoice
    });
    const lastRound = res.rounds[res.rounds.length - 1]
    // Check if the game is still in progress (status === "started")
    if (res.status === "started") {
        // If the game is still in progress, call playRound again with updated game information
        await playRound(await getGame(game._id));
    }
    // Return the updated game information
    return await getGame(game._id);
}


module.exports = {playRound};