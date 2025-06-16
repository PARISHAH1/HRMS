import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { BucketModule } from './bucket/bucket.module';
import { ToDosModule } from './todos/todos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),
    CompanyModule,
    UserModule,
    AuthModule,
    BucketModule,
    ToDosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
