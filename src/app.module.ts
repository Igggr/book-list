import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [UserModule, DatabaseModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
