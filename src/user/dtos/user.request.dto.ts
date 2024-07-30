import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ example: 'john', description: 'The username of the user' })
  userName: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  password: string;
}
