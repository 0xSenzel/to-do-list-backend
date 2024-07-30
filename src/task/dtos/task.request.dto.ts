import { ApiProperty } from '@nestjs/swagger';

export class TaskRequestDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier for the task',
  })
  id: string;

  @ApiProperty({
    example: 'Write documentation',
    description: 'The title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'Write documentation for the project',
    description: 'The description of the task',
  })
  description: string;

  @ApiProperty({ example: 1, description: 'The status of the task' })
  status: number;

  @ApiProperty({
    example: '2022-01-01T00:00:00Z',
    description: 'The due date of the task',
  })
  dueDate: Date;
}
