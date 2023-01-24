const axios = require('../common/axios')
const {apiUrl} = require("../common/constants");

async function createGame(data) {
    const res = await axios.post(`${apiUrl}/game`, data);
    return res.data;
}

async function addPlayedRound(id, data) {
    const res = await axios.post(`${apiUrl}/game/${id}/round-finished`, data);
    return res.data;
}

async function getGame(id) {
    const res = await axios.get(`${apiUrl}/game/${id}`)
    return res.data;
}

async function getComputerChoice() {
    const res = await axios.get(`${apiUrl}/game/computer-choice`)
    return res.data;
}

module.exports = {
    createGame,
    addPlayedRound,
    getGame,
    getComputerChoice
}