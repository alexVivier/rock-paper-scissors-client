import {apiUrl} from "../common/constants.js";
import axios from "../common/axios.js";
import {getItem} from "../local-storage/index.js";

export async function createGame(data) {
    if (getItem('user')) {
        data.playerId = getItem('user').id;
    }
    const res = await axios.post(`${apiUrl}/game`, data);
    return res.data;
}

export async function addPlayedRound(id, data) {
    const res = await axios.post(`${apiUrl}/game/${id}/round-finished`, data);
    return res.data;
}

export async function getGame(id) {
    const res = await axios.get(`${apiUrl}/game/${id}`)
    return res.data;
}

export async function getComputerChoice() {
    const res = await axios.get(`${apiUrl}/game/computer-choice`)
    return res.data;
}