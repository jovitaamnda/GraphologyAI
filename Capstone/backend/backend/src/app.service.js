const { Injectable } = require('@nestjs/common');

class AppService {
  getHello() {
    return 'Hello World!';
  }
}

// Aplikasikan decorator
Injectable()(AppService);

module.exports = { AppService };
