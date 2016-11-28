## Description
Small script to launch a Minecraft server easily!

## Requirements
 * [Minecraft Server](https://minecraft.net/en/download/server)
 * [Node.js 7+](http://nodejs.org)
 * [Java 8](https://java.com)

## How to

1) Launch `npm install`

2) Launch `node index.js`

3) Select LAUNCH SERVER with character 1 and press ENTER

4) Enjoy!

## Allow un-authenticated users
This is not recommended but will allow you to try your server quickly

1) Launch with `node index.js`

2) Select MODIFY PROPERTIES with character 5 and press ENTER

3) Select Online Mode with character 31 and press ENTER

4) Write false and press ENTER

## Allow only certain usernames (whitelist)
Doing this only the usernames in the whitelist will be able to connect to your server

1) Launch with `node index.js`

2) Select MODIFY PROPERTIES with character 5 and press ENTER

3) Select Online Mode with character 31 and press ENTER

4) Write false and press ENTER

5) Select MODIFY PROPERTIES with character 5 and press ENTER

6) Select White List with character 29 and press ENTER

6) Select LAUNCH SERVER with character 1 and press ENTER

7) Write `whitelist add username` and `whitelist reload`

## Port Forwarding
This is not needed for LAN mode.

1) Do not to touch the IP configuration on the MODIFY PROPERTIES menu, option 22

2) Use TCP ports and above 1024 (most used is 25565)

3) Point it to your server local IP

## Future features
- [ ] Being able to install different mods from menu

- [ ] Show private and public IP and port after server launches

- [x] Show recommended RAM on Setup

- [ ] Automatic deploy to mount a server on Heroku

- [x] Take input to do admin commands like `/op name`

- [ ] Add username only allowing that to be able to connect

- [ ] Detect if the server is on a 64-bit computer & using 64-bit Java to add `-d64` flag

## More Server Info
[Tutorials/Setting up a server](http://minecraft.gamepedia.com/Tutorials/Setting_up_a_server)