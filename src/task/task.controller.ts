import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/common/configs/guards/jwt.auth.guard';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('task')
@UseGuards(JwtAuthGuard)
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  private async createTask(@Body() taskRequestDto: TaskRequestDto, @Req() req) {
    return await this.taskService.createTask(taskRequestDto, req.user.id);
  }

  @Put('update')
  private async updateTask(@Body() taskRequestDto: TaskRequestDto, @Req() req) {
    return await this.taskService.updateTask(taskRequestDto, req.user.id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  private async getAllTasks(@Req() req) {
    return await this.taskService.getAllTaskByUserId(req.user.id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to retrieve',
    example: 'd2a8eec9-67ea-4c28-a3ca-b72380b8b7ba',
  })
  private async getTaskById(@Req() req, @Param('id') id: string) {
    return await this.taskService.getTaskById(id, req.user.id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The ID of the task to delete',
    example: 'd2a8eec9-67ea-4c28-a3ca-b72380b8b7ba',
  })
  private async deleteTaskById(@Req() req, @Param('id') id: string) {
    return await this.taskService.deleteTask(id, req.user.id);
  }
}
