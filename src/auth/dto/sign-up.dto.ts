import { MinLength, Length, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
