import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProvider } from './entity/auth-provider.entity';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthProvider, User])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
