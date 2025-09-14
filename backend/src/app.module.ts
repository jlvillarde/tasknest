import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './src/auth/auth.controller';
import { UserController } from './user/controller/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'tasknest',
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AuthController, UserController],
})
export class AppModule { }
