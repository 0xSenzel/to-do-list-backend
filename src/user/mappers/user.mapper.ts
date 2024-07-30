import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserResponseDto } from '../dtos/user.response.dto';

@Injectable()
export class UserMappers extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserEntity, UserResponseDto);
    };
  }
}
