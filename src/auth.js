import inquirer from "inquirer";
import {signupRequest, loginRequest} from "./services/auth.service.js";
import {setItem, getItem} from "./local-storage/index.js";
import jwtDecode from "jwt-decode";

export async function login() {

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: `Email address`,
        },
        {
            type: 'input',
            name: 'password',
            message: `Password`,
        },
    ]);

    const res = await loginRequest(answers);
    const user = jwtDecode(res)
    setItem('auth.token', res);
    setItem('user', user);
    console.log(`\nLet's play against the computer! You're now logged as ${user.pseudo}.\n`)
}
export async function signup() {

    console.log(`\nYou will create account to record your games and your rank.\n`)

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'pseudo',
            message: `Pseudo :`,
        },
        {
            type: 'input',
            name: 'email',
            message: `Email address :`,
        },
        {
            type: 'password',
            name: 'password',
            message: `Password :`,
        },
    ]);

    const token = await signupRequest(answers);
    setItem('auth.token', token);
    setItem('user', jwtDecode(token));

    console.log(`\nThanks for entering the game against the computer! \nYou're now logged as ${answers.pseudo}.\n`)
}

export async function logout() {
    const user = getItem('user');

    if (!user) {
        console.log(`\nYou cannot logout because you're not logged in! \nUse ropesc login to log in.\n`)
        return false;
    }

    const answers = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'shouldDisconnect',
            message: `Are you sure you want to disconnect ?`,
        },
    ]);

    if (answers.shouldDisconnect) {
        setItem('auth.token', null)
        setItem('user', null)
        console.log(`\nThanks for having fun against the computer! You're now logged out.\n`)
    } else {
        console.log(`\nYou've made the right choice, let's continue playing together! \nYou're still logged as ${user.pseudo}.\n`)
    }
}