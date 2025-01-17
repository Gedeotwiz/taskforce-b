import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import UserOperation from './user.controller';
import { User } from './user.entities';
import { AuthModule } from 'src/auth/auth.modle';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule, 
  ],
  providers: [UserService],
  controllers: [UserOperation], 
  exports: [UserService],
})
export class UserModule {}