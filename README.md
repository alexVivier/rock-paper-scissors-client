# Rock paper scissors client

This is a CLI client for a custom rock-paper-scissors API.

## Installation

You just have to download the package globally using npm

````
npm i -g rock-paper-scissors-client 
````

## Usage

To play be sure the [api](https://github.com/alexVivier/rock-paper-scissors) is running on port 8080.

Then use the client with this alias :

````
ropesc
````

To play a game you have to use the play arg with --rounds option

--rounds options means the number of winning rounds needed to win the game against the computer.
Here we pass 2 so you or the computer will have to win 2 rounds to win the game.
````
ropesc play --rounds 2
````
