import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../entities/task.entity';
import { TaskResponseDto } from '../dtos/task.response.dto';

@Injectable()
export class TaskMappers extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, TaskEntity, TaskResponseDto);
    };
  }
}
