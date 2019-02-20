const path = require('path')
const packageConfig = require('../package.json');
const notifier = require('node-notifier');
const interfaces = require('os').networkInterfaces();
const chalk=require('chalk');
exports.createNotifierCallback = () => {
    return (severity, errors) => {
      if (severity !== 'error') return
  
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
  console.log(filename)
      notifier.notify({
        title: packageConfig.name,
        message: severity + ': ' + error.name,
        subtitle: filename || '',
        icon: path.join(__dirname, 'logo.png')
      })
    }
  }
exports.getIPDress=function(){
    let IPAdress = '';
    for(var devName in interfaces){  
      var iface = interfaces[devName];  
      for(var i=0;i<iface.length;i++){  
            var alias = iface[i];  
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
                  IPAdress = alias.address;  
            }  
      }  
    }
    return IPAdress;
}
exports.reWirteHost=function(port,host){
    const newHost=host||getIPDress();
return chalk.green(`Your application is running here: http://${host}:${port}`);
}