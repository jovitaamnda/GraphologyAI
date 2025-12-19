const { Test, TestingModule } = require('@nestjs/testing');
const { AppController } = require('../src/app.controller');
const { AppService } = require('../src/app.service');

describe('AppController', () => {
  let appController;
  let appService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get(AppService);
    appController = module.get(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
