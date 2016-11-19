module.exports = class MinecraftServer {
    constructor() {
        this.readlineSync = require('readline-sync');
        this.minRam = 0;
        this.maxRam = 0;
        this.fileName = '';
        this.command = '';
    }
    askMinRam() {
        this.minRam = this.readlineSync.question('Insert the minimum RAM in MB: ');
    }
    askMaxRam() {
        this.maxRam = this.readlineSync.question('Insert the maximum RAM in MB: ');
    }
    askServerFileName() {
        this.maxRam = this.readlineSync.question('Insert the file name of your server jar : ');
    }
    welcome() {
        console.log('Hi this is the setup for your Minecraft Server!')
        console.log('Remember to put your *.jar inside this folder')
    }
    showSetup() {
        console.log('-- This is your setup --')
        console.log('Minimum Ram: ' + this.minRam);
        console.log('Maximum Ram: ' + this.maxRam);
        console.log('Server file name')
    }
    launchServer() {
        this.command = "java -Xms" + this.minRam + "M -Xmx" + this.maxRam + "M -jar " + this.fileName + " nogui";
        exec(this.command, (error, stdout, stderr) => {
            if (error) {
                console.error("exec error: ${error}");
            }
            console.log("stdout: ${stdout}");
            console.log("stderr: ${stderr}");
        });
    }
}


// fs.access("eula.txt", fs.F_OK, function (err) {
//     if (!err) {
//         fs.readFile("eula.txt", 'utf8', function (err, data) {
//             if (err) {
//                 return console.log(err);
//             }

//             const result = data.replace(/eula=false/g, 'eula=true');

//             fs.writeFile("eula.txt", result, 'utf8', function (err) {
//                 if (err) return console.log(err);
//             });
//         });
//     } else {
//         console.log("file do not exists")
//     }
// });