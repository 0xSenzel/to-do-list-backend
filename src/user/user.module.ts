import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserMappers } from './mappers/user.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserMappers],
  exports: [UserService],
})
export class UserModule {}
