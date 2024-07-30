import { AutoMap } from '@automapper/classes';

export class TaskResponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  title: string;

  @AutoMap()
  description: string;

  @AutoMap()
  status: number;

  @AutoMap()
  dueDate: Date;

  @AutoMap()
  userId: string;
}
