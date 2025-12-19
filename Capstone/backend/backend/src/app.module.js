const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { AppController } = require('./app.controller');
const { AppService } = require('./app.service');

class AppModule {}

// Aplikasikan Module decorator
Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Grapholyze_db_user:grapholyze_01@grapholyze.7pnshbp.mongodb.net/grapholyze',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})(AppModule);

module.exports = { AppModule };
