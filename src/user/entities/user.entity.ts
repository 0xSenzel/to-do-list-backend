import { AutoMap } from '@automapper/classes';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
