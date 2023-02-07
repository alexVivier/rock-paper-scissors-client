import inquirer from "inquirer";

const leaderboardChoices = [
    'The player with the most wins',
    'The player with the fewest wins',
    'The player with the most games',
];

export const leaderboard = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'showChoice',
            message: `Choose which leaderboard you want to display`,
            choices: leaderboardChoices,
        },
    ])

    console.log('index: ', leaderboardChoices.findIndex(el => el === answers.showChoice));
}