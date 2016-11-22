module.exports =
  class MinecraftServer {
    constructor () {
      this.readlineSync = require('readline-sync')
      this.exec = require('child_process').exec
      this.fs = require('fs')
      this.jsonfile = require('jsonfile')
      this.publicIp = require('public-ip')
      this.minimumRamMb = 0
      this.maximumRamMb = 0
      this.serverFileName = ''
      this.gui = ''
      this.command = ''
      this.setupFile = 'setup.json'
    }
    welcome () {
      console.log('Hi this is the setup manager for your Minecraft Server!')
      console.log('Remember to put your *.jar inside this folder')
      console.log('------------------------------------------------')
    }
    readSetup () {
      this.fs.open(this.setupFile, 'r', (err, fd) => {
        if (err) {
          if (err.code === 'ENOENT') {
            this.welcome()
            this.runSetup()
            this.showSetup()
            return
          } else {
            throw err
          }
        }
        console.log('You already have a configuration file: ')
        this.minimumRamMb = this.jsonfile.readFileSync(this.setupFile).minimumRamMb
        this.maximumRamMb = this.jsonfile.readFileSync(this.setupFile).maximumRamMb
        this.serverFileName = this.jsonfile.readFileSync(this.setupFile).serverFileName
        this.gui = this.jsonfile.readFileSync(this.setupFile).gui
        console.log(`Minimum Ram: ${this.minimumRamMb}MB`)
        console.log(`Maximum Ram: ${this.maximumRamMb}MB`)
        console.log(`Server file: ${this.serverFileName}`)
        ;(this.gui === 'nogui') ?
          console.log('GUI: Deactivated') :
          console.log('GUI: Activated')
        this.menu()
      })
    }
    runSetup () {
      console.log('1) Configure your server options')
      this.minimumRamMb = this.readlineSync.question('Insert the minimum RAM in MB: ')
      this.maximumRamMb = this.readlineSync.question('Insert the maximum RAM in MB: ')
      this.serverFileName = this.readlineSync.question('Insert the server file name: ') + '.jar'
      console.log('Want to launch server with a GUI?')
      let selected = ['YES', 'NO']
      let index = this.readlineSync.keyInSelect(selected, 'Choose an option', {cancel: false})
      if (selected[index] === 'YES') {
        this.gui = 'gui'
      } else if (selected[index] === 'NO') {
        this.gui = 'nogui'
      }
      this.jsonfile.writeFileSync(this.setupFile, {
        minimumRamMb: this.minimumRamMb,
        maximumRamMb: this.maximumRamMb,
        serverFileName: this.serverFileName,
        gui: this.gui
      })
    }
    menu () {
      let selected = ['RUN SERVER', 'MODIFY']
      let index = this.readlineSync.keyInSelect(selected, 'Choose an option')
      if (selected[index] === 'RUN SERVER') {
        this.launchServer()
      } else if (selected[index] === 'MODIFY') {
        this.runSetup()
        this.showSetup()
      }}
    showSetup () {
      console.log('------------------------------------------------')
      console.log('2) This is your setup')
      console.log(`Minimum Ram: ${this.minimumRamMb}MB`)
      console.log(`Maximum Ram: ${this.maximumRamMb}MB`)
      console.log(`Server file: ${this.serverFileName}`)
      ;(this.gui === 'nogui') ?
        console.log('GUI: Deactivated') :
        console.log('GUI: Activated')
      this.menu()
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
