import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
