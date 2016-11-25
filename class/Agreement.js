module.exports =
  class Agreement {
    constructor () {
      this.agreementText = 'eula=true'
    }
    writeEula () {
      fs.writeFileSync('eula.txt', this.agreementText, (err) => {
        if (err) throw err
        console.log('Agreement accepted')
        console.log('For more info go to https://account.mojang.com/documents/minecraft_eula')
      })
    }
}
