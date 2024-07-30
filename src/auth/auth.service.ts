import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestDto } from 'src/user/dtos/user.request.dto';
import { UserResponseDto } from 'src/user/dtos/user.response.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private readonly saltRounds = 10;
  private readonly JWT_EXPIRATION_TIME =
    process.env.JWT_EXPIRATION_TIME ?? 3600; // default to 1 hour
  private readonly REFRESH_TOKEN_EXPIRATION_TIME =
    process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '30d'; // default to 30 days

  @InjectMapper()
  private readonly mapper: Mapper;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  constructor(private readonly jwtService: JwtService) {}

  public async login(userRequestDto: UserRequestDto) {
    const user = await this.validateUser(userRequestDto);

    const payload = {
      id: user.id,
      username: user.name,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: this.JWT_EXPIRATION_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: this.REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return { accessToken, refreshToken };
  }

  public async createUser(userRequestDto: UserRequestDto) {
    const userExist = await this.userService.checkIfUserEmailExist(
      userRequestDto.email,
    );
    if (userExist) {
      throw new InternalServerErrorException(
        `User with name ${userRequestDto.userName} already exist`,
      );
    }

    const hashPassword = await this.hashPassword(userRequestDto.password);

    const newUser = await this.prismaService.user.create({
      data: {
        email: userRequestDto.email,
        name: userRequestDto.userName,
        password: hashPassword,
      },
    });

    return this.mapper.map(newUser, UserEntity, UserResponseDto);
  }

  public async validateUser(
    userRequestDto: UserRequestDto,
  ): Promise<UserEntity> {
    const user = await this.userService.checkIfUserEmailExist(
      userRequestDto.email,
    );
    if (!user) {
      throw new InternalServerErrorException(
        `User with email ${userRequestDto.email} does not exist`,
      );
    }

    const isPassValid = await this.validatePassword(
      userRequestDto.password,
      user.password,
    );
    if (!isPassValid) {
      throw new InternalServerErrorException('Invalid Password');
    }

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
