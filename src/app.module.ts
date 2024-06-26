import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, DatabaseModule, BookModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
