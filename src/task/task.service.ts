import { Inject, Injectable, Logger } from '@nestjs/common';
import { TaskRequestDto } from './dtos/task.request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TaskEntity } from './entities/task.entity';
import { TaskResponseDto } from './dtos/task.response.dto';
import { PaginationDto } from '../common/dtos/pagination.request.dto';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  @InjectMapper()
  private readonly mapper: Mapper;

  public async createTask(
    TaskRequestDto: TaskRequestDto,
    userId: string,
  ): Promise<TaskResponseDto> {
    this.logger.log(`Creating a new task with title: ${TaskRequestDto.title}`);
    const newTask = await this.prismaService.task.create({
      data: {
        title: TaskRequestDto.title,
        description: TaskRequestDto.description,
        status: TaskRequestDto.status,
        dueDate: TaskRequestDto.dueDate,
        userId: userId,
      },
    });

    this.logger.log(`Task created with id: ${newTask.id}`);
    return this.mapper.map(newTask, TaskEntity, TaskResponseDto);
  }

  public async getTaskById(
    id: string,
    userId: string,
  ): Promise<TaskResponseDto> {
    this.logger.log(`Getting task with id: ${id}`);

    const task = await this.prismaService.task.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!task) {
      throw new Error(`Task with id: ${id} not found`);
    }

    this.logger.log(`Task found with id: ${id}`);
    return this.mapper.map(task, TaskEntity, TaskResponseDto);
  }

  public async getAllTaskByUserId(
    userId: string,
    take: number,
    skip: number,
  ): Promise<TaskResponseDto[]> {
    this.logger.log(`Getting all tasks for user with id: ${userId}`);

    const tasks = await this.prismaService.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: +take,
      skip: +skip,
    });

    this.logger.log(`Found ${tasks.length} tasks for user with id: ${userId}`);
    return this.mapper.mapArray(tasks, TaskEntity, TaskResponseDto);
  }

  public async updateTask(
    taskRequestDto: TaskRequestDto,
    userId: string,
  ): Promise<TaskResponseDto> {
    this.logger.log(`Updating task with id: ${taskRequestDto.id}`);
    const isUserOwnTask = await this.checkIfUserOwnTask(
      userId,
      taskRequestDto.id,
    );

    if (!isUserOwnTask) {
      throw new Error(
        `User is not authorized to update task with id: ${taskRequestDto.id}`,
      );
    }

    const updatedTask = await this.prismaService.task.update({
      where: { id: taskRequestDto.id },
      data: {
        title: taskRequestDto.title,
        description: taskRequestDto.description,
        status: taskRequestDto.status,
        dueDate: taskRequestDto.dueDate,
      },
    });

    this.logger.log(`Task with id: ${taskRequestDto.id} updated`);
    return this.mapper.map(updatedTask, TaskEntity, TaskResponseDto);
  }

  public async deleteTask(id: string, userId: string): Promise<void> {
    const isUserOwnTask = await this.checkIfUserOwnTask(userId, id);
    if (!isUserOwnTask) {
      throw new Error(`User is not authorized to delete task with id: ${id}`);
    }

    const deletedTask = await this.prismaService.task.delete({
      where: { id },
    });

    this.logger.log(`Task with id: ${id} deleted`);
  }

  private async checkIfUserOwnTask(
    userId: string,
    taskId: string,
  ): Promise<boolean> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    return task ? true : false;
  }
}
