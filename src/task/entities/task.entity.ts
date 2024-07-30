import { AutoMap } from '@automapper/classes';
import { Task } from '@prisma/client';

export class TaskEntity implements Task {
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

  createdAt: Date;
  updatedAt: Date;

  @AutoMap()
  userId: string;
}
