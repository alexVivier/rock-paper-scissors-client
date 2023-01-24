const table = require('text-table');
const {values, choices} = require("./constants");


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
        array.push([`Round #${index + 1}`, `You choose : ${playerChoiceFormated}`, `Computer choose : ${computerChoiceFormated}`]);
    })
    return `\n\nRECAP\n${table(array)}\n\n${finishText(game)}\n`;
}

const formatRoundRecap = (round) => {
    let string;
    if (!round.winner) {
        string = `It's a draw.`
    } else {
        string = `${round.winner.toUpperCase()} won.`
    }
    string += ` You choose ${round.playerChoice}, computer choose ${round.computerChoice}`;
    return string;
}

module.exports = {finishText, formatRecapGame, formatRoundRecap}