const axios = require("axios")
const inquirer = require("inquirer");

let axiosI = null;

function getAxiosInstance() {
    if (axiosI === null) {
        axiosI = axios.create({
        });
    }
    return axios;
}

async function createGame(data) {
    const res = await getAxiosInstance().post("http://127.0.0.1:8080/game", data);
    return res.data;
}

async function addPlayedRound(id, data) {
    const res = await getAxiosInstance().post(`http://127.0.0.1:8080/game/${id}/round-finished`, data);
    return res.data;
}

async function getGame(id) {
    const res = await getAxiosInstance().get(`http://127.0.0.1:8080/game/${id}`)
    return res.data;
}

async function getComputerChoice() {
    const res = await getAxiosInstance().get(`http://127.0.0.1:8080/game/computer-choice`)
    return res.data;
}

async function playRound(game) {
    const computerChoice = await getComputerChoice();
    const values = ['rock', 'paper', 'scissors'];
    const choices = ['Rock ✊', 'Paper 🫲', 'Scissors 🤞']
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'playerChoice',
            message: `Make your choice (${game.playerScore} - ${game.computerScore}) | ${game.maxRoundToWin} to win.`,
            choices
        },
    ]);
    console.log('Computer choose : ' + choices[values.findIndex(el => el === computerChoice)]);
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

module.exports = {createGame, getGame, getComputerChoice, addPlayedRound, playRound};