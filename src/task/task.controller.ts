import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '../common/dtos/pagination.request.dto';

@Controller('task')
@UseGuards(JwtAuthGuard)
@ApiTags('task')
@ApiBearerAuth('access_token')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async createTask(@Body() taskRequestDto: TaskRequestDto, @Req() req) {
    return await this.taskService.createTask(taskRequestDto, req.user.id);
  }

  // TODO: update to PATCH follow RESTful standard
  @Put()
  private async updateTask(@Body() taskRequestDto: TaskRequestDto, @Req() req) {
    return await this.taskService.updateTask(taskRequestDto, req.user.id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  private async getAllTasks(@Req() req, @Query() paginationDto: PaginationDto) {
    return await this.taskService.getAllTaskByUserId(
      req.user.id,
      paginationDto,
    );
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
