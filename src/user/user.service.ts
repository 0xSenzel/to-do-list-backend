import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  public async checkIfUserEmailExist(email: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  }
}
