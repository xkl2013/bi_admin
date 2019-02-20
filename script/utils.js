const interfaces = require('os').networkInterfaces();

module.exports = {
  getIPDress() {
    let IPAdress = '';
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          IPAdress = alias.address;
        }
      }
    }
    return IPAdress;
  } };
