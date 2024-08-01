import { TaskRequestDto } from './dtos/task.request.dto';
import { TaskResponseDto } from './dtos/task.response.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

// TODO: finish implementation
describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(() => {
    taskService = new TaskService();
    taskController = new TaskController(taskService);
  });

  describe('findAll', () => {
    it('should return taskRequestDto', async () => {
      const taskRequestDto: TaskRequestDto = {
        id: '',
        title: 'Test Task',
        description: 'Task description',
        status: 1,
        dueDate: new Date(),
      };

      const userId = 'user-id-123';
      const taskResponseDto: TaskResponseDto = {
        id: 'task-id-123',
        title: 'Test Task',
        description: 'Task description',
        status: 1,
        dueDate: new Date(),
        userId: userId,
      };

      jest.spyOn(taskService, 'createTask').mockResolvedValue(taskResponseDto);

      const result = await taskController.createTask(taskRequestDto, {
        userId,
      });
      expect(result).toEqual(taskResponseDto);
      expect(taskService.createTask).toHaveBeenCalledWith(
        taskRequestDto,
        userId,
      );
    });
  });
});
