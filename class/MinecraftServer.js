module.exports =
  class MinecraftServer {
    constructor () {
      this.fs = require('fs')
      this.jsonfile = require('jsonfile')
      this.spawn = require('child_process').spawn
      this.readlineSync = require('readline-sync')
      this.properties = require('properties-parser')
      this.serverSetupFile = 'server-setup.json'
      this.minimumRamMb = 0,
      this.maximumRamMb = 0,
      this.serverFileName = '',
      this.gui = ''
    }
    menu () {
      let selected = ['LAUNCH SERVER', 'DISPLAY SETUP', 'MODIFY SETUP', 'DISPLAY PROPERTIES', 'MODIFY PROPERTIES']
      let index = this.readlineSync.keyInSelect(selected, 'Choose an option')
      console.log('')
      switch (selected[index]) {
        case 'LAUNCH SERVER':
          if (this.fs.existsSync(this.serverSetupFile)) {
            this.readSetup()
          } else {
            this.writeSetup()
            this.saveSetup()
          }
          this.displaySetup('Launching server with this setup: ')
          this.writeEula()
          this.launchServer()
          break
        case 'DISPLAY SETUP':
          if (this.fs.existsSync(this.serverSetupFile)) {
            this.readSetup()
            this.displaySetup()
            this.menu()
          } else {
            console.log('You do not have a setup configuration')
            this.menu()
          }
          break
        case 'MODIFY SETUP':
          if (this.fs.existsSync(this.serverSetupFile)) {
            this.readSetup()
            this.writeSetup()
            this.saveSetup()
            this.menu()
          } else {
            this.writeSetup()
            this.saveSetup()
            this.menu()
          }
          break
        case 'DISPLAY PROPERTIES':
          if (this.fs.existsSync('server.properties')) {
            this.readProperties()
            this.displayProperties()
            this.menu()
          } else {
            console.log('server.properties does not exist')
          }
          break
        case 'MODIFY PROPERTIES':
          if (this.fs.existsSync('server.properties')) {
            this.readProperties()
            this.displayProperties()
            this.writeProperties()
            this.saveProperties()
            this.menu()
          } else {
            console.log('server.properties does not exist')
          }
          break
        default:
          break
      }
    }
    readSetup () {
      this.minimumRamMb = this.jsonfile.readFileSync(this.serverSetupFile).minimumRamMb
      this.maximumRamMb = this.jsonfile.readFileSync(this.serverSetupFile).maximumRamMb
      this.serverFileName = this.jsonfile.readFileSync(this.serverSetupFile).serverFileName
      this.gui = this.jsonfile.readFileSync(this.serverSetupFile).gui
    }
    writeSetup () {
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
    }
    displaySetup (msg) {
      console.log(msg)
      console.log('------------------------------------------------')
      console.log(`Minimum Ram: ${this.minimumRamMb}MB`)
      console.log(`Maximum Ram: ${this.maximumRamMb}MB`)
      console.log(`Server file: ${this.serverFileName}`)
      ;(this.gui === 'nogui') ? console.log('GUI: Deactivated') : console.log('GUI: Activated')
      console.log('------------------------------------------------')
    }
    saveSetup () {
      this.jsonfile.writeFileSync(this.serverSetupFile, {
        minimumRamMb: this.minimumRamMb,
        maximumRamMb: this.maximumRamMb,
        serverFileName: this.serverFileName,
        gui: this.gui
      })
    }
    launchServer () {
      let child = this.spawn('java', ['-jar', this.serverFileName, '-Xms ${this.minimumRamMb}M', '-Xms ${this.maximumRamMb}M', this.gui], {stdio: 'inherit'})
    }
    writeEula () {
      this.fs.writeFileSync('eula.txt', 'eula=true', (err) => {
        if (err) throw err
      })
      console.log('Agreement accepted')
      console.log('For more info: https://account.mojang.com/documents/minecraft_eula')
      console.log('')
    }
    readProperties () {
      this.values = this.properties.createEditor('server.properties')
    }
    writeProperties () {
      console.log('')
      let index = this.readlineSync.question('Choose an property to modify: ')
      console.log('')
      switch (index) {
        case '1':
          this.values.set('max-tick-time', this.readlineSync.question('Maximum Tick Time: '))
          break
        case '2':
          this.values.set('generator-settings', this.readlineSync.question('Generator Settings: '))
          break
        case '3':
          this.values.set('force-gamemode', this.readlineSync.question('Force Game Mode: '))
          break
        case '4':
          this.values.set('allow-nether', this.readlineSync.question('Allow Nether: '))
          break
        case '5':
          this.values.set('gamemode', this.readlineSync.question('Game Mode: '))
          break
        case '6':
          this.values.set('enable-query', this.readlineSync.question('Enable Query: '))
          break
        case '7':
          this.values.set('player-idle-timeout', this.readlineSync.question('Player Idle Time Out: '))
          break
        case '8':
          this.values.set('difficulty', this.readlineSync.question('Difficulty: '))
          break
        case '9':
          this.values.set('spawn-monsters', this.readlineSync.question('Spawn Monsters: '))
          break
        case '10':
          this.values.set('op-permission-level', this.readlineSync.question('OP Permission Level: '))
          break
        case '11':
          this.values.set('announce-player-achievements', this.readlineSync.question('Announce Player Achievements: '))
          break
        case '12':
          this.values.set('pvp', this.readlineSync.question('PVP: '))
          break
        case '13':
          this.values.set('snooper-enabled', this.readlineSync.question('Snooper Enabled: '))
          break
        case '14':
          this.values.set('level-type', this.readlineSync.question('Level Type: '))
          break
        case '15':
          this.values.set('hardcore', this.readlineSync.question('Hardcore: '))
          break
        case '16':
          this.values.set('enable-command-block', this.readlineSync.question('Enable Command Block: '))
          break
        case '17':
          this.values.set('max-players', this.readlineSync.question('Maximum Players: '))
          break
        case '18':
          this.values.set('network-compression-threshold', this.readlineSync.question('Network Compression Threshold: '))
          break
        case '19':
          this.values.set('resource-pack-sha1', this.readlineSync.question('Resource Pack SHA1: '))
          break
        case '20':
          this.values.set('max-world-size', this.readlineSync.question('Max World Size: '))
          break
        case '21':
          this.values.set('server-port', this.readlineSync.question('Server Port: '))
          break
        case '22':
          this.values.set('server-ip', this.readlineSync.question('Server IP: '))
          break
        case '23':
          this.values.set('spawn-npcs', this.readlineSync.question('Spawn Npcs: '))
          break
        case '24':
          this.values.set('allow-flight', this.readlineSync.question('Allow Flight: '))
          break
        case '25':
          this.values.set('level-name', this.readlineSync.question('Level Name: '))
          break
        case '26':
          this.values.set('view-distance', this.readlineSync.question('View Distance: '))
          break
        case '27':
          this.values.set('resource-pack', this.readlineSync.question('Resource Pack: '))
          break
        case '28':
          this.values.set('spawn-animals', this.readlineSync.question('Spawn Animals: '))
          break
        case '29':
          this.values.set('white-list', this.readlineSync.question('White List: '))
          break
        case '30':
          this.values.set('generate-structures', this.readlineSync.question('Generate Structures: '))
          break
        case '31':
          this.values.set('online-mode', this.readlineSync.question('Online Mode: '))
          break
        case '32':
          this.values.set('max-build-height', this.readlineSync.question('Maximum Build Height: '))
          break
        case '33':
          this.values.set('level-seed', this.readlineSync.question('Level Seed: '))
          break
        case '34':
          this.values.set('prevent-proxy-connections', this.readlineSync.question('Prevent Proxy Connections: '))
          break
        case '35':
          this.values.set('enable-rcon', this.readlineSync.question('Enable Rcon: '))
          break
        case '36':
          this.values.set('motd', this.readlineSync.question('Server Name (motd): '))
          break
        default:
          break
      }
    }
    displayProperties () {
      console.log(`[1] Maximum Tick Time: ${this.values.get('max-tick-time') || 'No value assigned'}`)
      console.log(`[2] Generator Settings: ${this.values.get('generator-settings') || 'No value assigned'}`)
      console.log(`[3] Force Game Mode: ${this.values.get('force-gamemode') || 'No value assigned'}`)
      console.log(`[4] Allow Nether: ${this.values.get('allow-nether') || 'No value assigned'}`)
      console.log(`[5] Game Mode: ${this.values.get('gamemode') || 'No value assigned'}`)
      console.log(`[6] Enable Query: ${this.values.get('enable-query') || 'No value assigned'}`)
      console.log(`[7] Player Idle Time Out: ${this.values.get('player-idle-timeout') || 'No value assigned'}`)
      console.log(`[8] Difficulty: ${this.values.get('difficulty') || 'No value assigned'}`)
      console.log(`[9] Spawn Monsters: ${this.values.get('spawn-monsters') || 'No value assigned'}`)
      console.log(`[10] OP Permission Level: ${this.values.get('op-permission-level') || 'No value assigned'}`)
      console.log(`[11] Announce Player Achievements: ${this.values.get('announce-player-achievements') || 'No value assigned'}`)
      console.log(`[12] PVP: ${this.values.get('pvp') || 'No value assigned'}`)
      console.log(`[13] Snooper Enabled: ${this.values.get('snooper-enabled') || 'No value assigned'}`)
      console.log(`[14] Level Type: ${this.values.get('level-type') || 'No value assigned'}`)
      console.log(`[15] Hardcore: ${this.values.get('hardcore') || 'No value assigned'}`)
      console.log(`[16] Enable Command Block: ${this.values.get('enable-command-block') || 'No value assigned'}`)
      console.log(`[17] Maximum Players: ${this.values.get('max-players') || 'No value assigned'}`)
      console.log(`[18] Network Compression Threshold: ${this.values.get('network-compression-threshold') || 'No value assigned'}`)
      console.log(`[19] Resource Pack SHA1: ${this.values.get('resource-pack-sha1') || 'No value assigned'}`)
      console.log(`[20] Maximum World Size: ${this.values.get('max-world-size') || 'No value assigned'}`)
      console.log(`[21] Server Port: ${this.values.get('server-port') || 'No value assigned'}`)
      console.log(`[22] Server IP: ${this.values.get('server-ip') || 'No value assigned'}`)
      console.log(`[23] Spawn Npcs: ${this.values.get('spawn-npcs') || 'No value assigned'}`)
      console.log(`[24] Allow Flight: ${this.values.get('allow-flight') || 'No value assigned'}`)
      console.log(`[25] Level Name: ${this.values.get('level-name') || 'No value assigned'}`)
      console.log(`[26] View Distance: ${this.values.get('view-distance') || 'No value assigned'}`)
      console.log(`[27] Resource Pack: ${this.values.get('resource-pack') || 'No value assigned'}`)
      console.log(`[28] Spawn Animals: ${this.values.get('spawn-animals') || 'No value assigned'}`)
      console.log(`[29] White List: ${this.values.get('white-list') || 'No value assigned'}`)
      console.log(`[30] Generate Structures: ${this.values.get('generate-structures') || 'No value assigned'}`)
      console.log(`[31] Online Mode: ${this.values.get('online-mode') || 'No value assigned'}`)
      console.log(`[32] Maximum Build Height: ${this.values.get('max-build-height') || 'No value assigned'}`)
      console.log(`[33] Level Seed: ${this.values.get('level-seed') || 'No value assigned'}`)
      console.log(`[34] Prevent Proxy Connections: ${this.values.get('prevent-proxy-connections') || 'No value assigned'}`)
      console.log(`[35] Enable Rcon: ${this.values.get('enable-rcon') || 'No value assigned'}`)
      console.log(`[36] Server Name (motd): ${this.values.get('motd') || 'No value assigned'}`)
    }
    saveProperties () {
      this.values.save()
    }
}
