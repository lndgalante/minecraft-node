const MinecraftServer = require('./minecraft-sv');
const minecraftServer = new MinecraftServer();

minecraftServer.welcome()
minecraftServer.askMinRam()
minecraftServer.askMaxRam()
minecraftServer.askServerFileName()
minecraftServer.launchServer()