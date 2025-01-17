
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./gaurd/jwt.stratege";
import { Authguard } from "./gaurd/auth.gaurd";
import { AccessFile } from "./auth.controller";
import { User } from "src/user/user.entities";

const screKey='qawsedrftgyh'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]), 
    PassportModule,
    JwtModule.register({
      secret: screKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, Authguard],
  controllers: [AccessFile],
  exports: [AuthService],
})
export class AuthModule {}