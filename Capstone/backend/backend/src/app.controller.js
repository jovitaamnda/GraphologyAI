const { Controller, Get } = require('@nestjs/common');
const { AppService } = require('./app.service');

class AppController {
  constructor(appService) {
    this.appService = appService;
  }

  getHello() {
    return this.appService.getHello();
  }
}

// Aplikasikan Controller decorator
Controller()(AppController);

// Aplikasikan Get decorator ke method
Get()(AppController.prototype, 'getHello', Object.getOwnPropertyDescriptor(AppController.prototype, 'getHello'));

module.exports = { AppController };
