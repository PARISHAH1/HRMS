import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'srv1536.hstgr.io',
      port: 3306,
      username: 'u428551797_Anantam',
      password: 'Anantam413',
      database: 'u428551797_HRMS',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    StudentModule,
  ],
})
export class AppModule {}
