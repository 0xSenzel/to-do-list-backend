import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { AuthModule } from 'src/auth/auth.module';
import { TaskMappers } from './mappers/task.mapper';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskMappers],
  exports: [TaskService],
})
export class TaskModule {}
