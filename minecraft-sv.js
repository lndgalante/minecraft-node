module.exports =
  class MinecraftServer {
    constructor () {
      this.readlineSync = require('readline-sync')
      this.exec = require('child_process').exec
      this.fs = require('fs')
      this.jsonfile = require('jsonfile')
      this.propertiesReader = require('properties-reader')
      this.publicIp = require('public-ip')
      this.minimumRamMb = 0
      this.maximumRamMb = 0
      this.serverFileName = ''
      this.gui = ''
      this.command = ''
      this.serverSetupFile = 'server-setup.json'
      // Server Properties
      this.serverPropertiesFile = 'server-properties.json'
      this.properties = this.propertiesReader('server.properties')
      this.maxTickTime = 0
      this.generatorSettings = ''
      this.forceGameMode = ''
      this.allowNether = ''
      this.gameMode = 0
      this.enableQuery = false
      this.playerIdleTimeout = 0
      this.difficulty = 1
      this.spawnMonsters = true
      this.opPermissionLevel = 4
      this.announcePlayerAchievements = true
      this.pvp = true
      this.snooperEnabled = true
      this.levelType = 'default'
      this.hardcore = false
      this.enableCommandBlock = false
      this.maxPlayers = 20
      this.networkCompressionThreshold = 256
      this.resourcePackSha1 = ''
      this.maxWorldSize = 29999984
      this.serverPort = 25565
      this.serverIp = ''
      this.spawnNpcs = true
      this.allowFlight = false
      this.levelName = 'world'
      this.viewDistance = 10
      this.resourcePack = ''
      this.spawnAnimals = true
      this.whiteList = false
      this.generateStructures = true
      this.onlineMode = false
      this.maxBuildHeight = 256
      this.levelSeed = ''
      this.preventProxyConnections = false
      this.enableRcon = false
      this.motd = 'A minecraft server'
      this.readProperties()
    }
    showProperties () {
      console.log('------------------------------------------------')
      console.log('This are your properties: ')
      console.log(`Server name: ${this.serverName}`)
      console.log(`Online mode: ${this.onlineMode}`)
      console.log(`Server IP: ${this.serverIp}`)
      console.log(`Server port: ${this.serverPort}`)
      console.log(`Maximum players: ${this.maxPlayers}`)
    }
    readProperties () {
      this.serverName = this.properties.get('motd')
      this.onlineMode = this.properties.get('online-mode')
      this.serverIp = this.properties.get('server-ip')
      this.serverPort = this.properties.get('server-port')
      this.maxPlayers = this.properties.get('max-players')
    }
    modifyProperties () {
      console.log('1) Configure your server properties')

      this.serverName = this.readlineSync.question('Insert your server name: ')

      console.log('Want to play LAN as well?')

      let selected = ['YES', 'NO']

      let index = this.readlineSync.keyInSelect(selected, 'Choose an option', {
        cancel: false
      })
      if (selected[index] === 'YES') {
        this.onlineMode = false
      } else if (selected[index] === 'NO') {
        this.onlineMode = true
      }

      this.serverIp = this.readlineSync.question('Insert server IP: ')

      this.serverPort = this.readlineSync.question('Insert server port: ')

      this.maxPlayers = this.readlineSync.question('Insert maximum players: ')
    }
    writeProperties () {
      this.properties.set('motd', this.serverName)
      this.properties.set('online-mode', this.onlineMode)
      this.properties.set('server-ip', this.serverIp)
      this.properties.set('server-port', this.serverPort)
      this.properties.set('max-players', this.maxPlayers)
      this.properties.save('server.properties', (err) => {
        if (err)
          throw errs
        console.log("It's saved!")
      })
    }
    welcome () {
      console.log('Hi this is the setup manager for your Minecraft Server!')
      console.log('Remember to put your *.jar inside this folder')
      console.log('------------------------------------------------')
    }
    readSetup () {
      this.fs.open(this.serverSetupFile, 'r', (err, fd) => {
        if (err) {
          if (err.code === 'ENOENT') {
            this.welcome()
            this.modifySetup()
            this.showSetup()
            return
          } else {
            throw err
          }
        }

        // Read Setup
        console.log('You already have a configuration file: ')
        this.minimumRamMb = this.jsonfile.readFileSync(this.serverSetupFile).minimumRamMb
        this.maximumRamMb = this.jsonfile.readFileSync(this.serverSetupFile).maximumRamMb
        this.serverFileName = this.jsonfile.readFileSync(this.serverSetupFile).serverFileName
        this.gui = this.jsonfile.readFileSync(this.serverSetupFile).gui

        // Show Setup
        console.log(`Minimum Ram: ${this.minimumRamMb}MB`)
        console.log(`Maximum Ram: ${this.maximumRamMb}MB`)
        console.log(`Server file: ${this.serverFileName}`)
        ;(this.gui === 'nogui') ? console.log('GUI: Deactivated') : console.log('GUI: Activated')

        this.showProperties()
        this.menu()
      })
    }
    modifySetup () {
      console.log('Configure your server options')
      this.minimumRamMb = this.readlineSync.question('Insert the minimum RAM in MB: ')
      this.maximumRamMb = this.readlineSync.question('Insert the maximum RAM in MB: ')
      this.serverFileName = this.readlineSync.question('Insert the server file name: ') + '.jar'
      console.log('Want to launch server with a GUI?')
      let selected = ['YES', 'NO']
      let index = this.readlineSync.keyInSelect(selected, 'Choose an option', {
        cancel: false
      })
      if (selected[index] === 'YES') {
        this.gui = 'gui'
      } else if (selected[index] === 'NO') {
        this.gui = 'nogui'
      }
      this.jsonfile.writeFileSync(this.serverSetupFile, {
        minimumRamMb: this.minimumRamMb,
        maximumRamMb: this.maximumRamMb,
        serverFileName: this.serverFileName,
        gui: this.gui
      })
    }
    showSetup () {
      console.log('------------------------------------------------')
      console.log('This is your setup')
      console.log(`Minimum Ram: ${this.minimumRamMb}MB`)
      console.log(`Maximum Ram: ${this.maximumRamMb}MB`)
      console.log(`Server file: ${this.serverFileName}`)
      ;(this.gui === 'nogui') ? console.log('GUI: Deactivated') : console.log('GUI: Activated')
      console.log('------------------------------------------------')
      console.log('This are your properties: ')
      console.log(`Server name: ${this.serverName}`)
      console.log(`Online mode: ${this.onlineMode}`)
      console.log(`Server IP: ${this.serverIp}`)
      console.log(`Server port: ${this.serverPort}`)
      console.log(`Maximum players: ${this.maxPlayers}`)
      this.menu()
    }
    menu () {
      let selected = ['LAUNCH SERVER', 'MODIFY SETUP', 'MODIFY PROPERTIES']
      let index = this.readlineSync.keyInSelect(selected, 'Choose an option')
      if (selected[index] === 'LAUNCH SERVER') {
        this.launchServer()
      } else if (selected[index] === 'MODIFY SETUP') {
        this.modifySetup()
        this.showSetup()
      }else if (selected[index] === 'MODIFY PROPERTIES') {
        this.modifyProperties()
        this.writeProperties()
        this.showSetup()
      }
    }
    launchServer () {
      this.command = 'java -Xms' + this.minimumRamMb + 'M -Xmx' + this.maximumRamMb + 'M -jar ' + this.serverFileName + ' ' + this.gui
      this.exec(this.command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.log(`stderr: ${stderr}`)
      })
    }
    acceptAgreement () {
      let _this = this
      this.fs.open('eula.txt', 'r', (err, fd) => {
        if (err) {
          if (err.code === 'ENOENT') {
            console.log('eula not exist')
            return
          } else {
            throw err
          }
        }
        _this.fs.readFile('eula.txt', 'utf8', function (err, data) {
          if (err) {
            return console.log(err)
          }
          _this.fs.writeFile('eula.txt', 'eula=true', 'utf8', function (err) {
            if (err)
              return console.log(err)
          })
        })
      })
    }
    showIp () {
      this.publicIp.v4().then(ip => {
        console.log('Public IP: ' + ip + ':25565')
      })
    }
}

// Mostrar IP Publica + Puerto
//
