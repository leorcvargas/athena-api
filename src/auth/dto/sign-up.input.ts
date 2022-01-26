import { Field, InputType } from '@nestjs/graphql';
import { MinLength, Length, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
