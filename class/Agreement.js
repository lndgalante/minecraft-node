module.exports =
  class Agreement {
    constructor () {
      this.fs = require('fs')
      this.agreementText = 'eula=true'
    }
    writeEula () {
      this.fs.writeFileSync('eula.txt', this.agreementText, (err) => {
        if (err) throw err
      })
      console.log('Agreement accepted')
      console.log('For more info: https://account.mojang.com/documents/minecraft_eula')
    }
}
