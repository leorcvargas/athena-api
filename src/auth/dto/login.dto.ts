import { MinLength, Length, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
