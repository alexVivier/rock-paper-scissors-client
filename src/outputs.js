const table = require('text-table');

const values = ['rock', 'paper', 'scissors'];
const choices = ['Rock ✊', 'Paper 🫲', 'Scissors 🤞']

const finishText = (game) => {
    let string;
    if (game.winner === 'player') {
        string = 'Congrats ! You won against the quantum computer 🎉'
    } else {
        string = 'Unfortunately the super intelligent computer won 😅'
    }
    return string;
}

const formatRecapGame = (game) => {
    const array = [];
    game.rounds.forEach((round, index) => {
        const playerChoiceFormated = choices[values.findIndex(el => el === round.playerChoice)];
        const computerChoiceFormated = choices[values.findIndex(el => el === round.computerChoice)];
        array.push([`Round #${index}`, `You choose : ${playerChoiceFormated}`, `Computer choose : ${computerChoiceFormated}`]);
    })
    return `\n\nRECAP\n${table(array)}\n\n${finishText(game)}\n`;
}

module.exports = {finishText, formatRecapGame}