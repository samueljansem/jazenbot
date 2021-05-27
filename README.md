# Jazenbot

## _A chatbot for my twitch channel, used to interact with my viewers in real time_

Jazenbot is a twitch that was made to interact with viewers, automate some channel points rewards, create timers and even control smart devices, in this case, a smart lamp (Mi LED Smart Bulb Essential)

## Features

-   Add/List/Edit/Delete basic chat commands with simple response messages and counters

## Tech

Jazenbot uses:

-   [node.js] - evented I/O for the backend
-   [tmi.js] - node.js module to connect to twitch chat and listen events
-   [mongodb] - as database to store commands and rewards data

And of course Jazenbot itself is open source with a [public repository][dill] on GitHub.

## Installation

Jazenbot requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and devDependencies and start the server.

```sh
cd jazenbot
npm i
node src/bot.js
```
