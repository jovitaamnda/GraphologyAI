import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Grapholyze_db_user:grapholyze_01@grapholyze.7pnshbp.mongodb.net/grapholyze',
    ),
  ],
})
export class AppModule {}
