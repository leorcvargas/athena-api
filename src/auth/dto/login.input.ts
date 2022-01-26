import { Field, InputType } from '@nestjs/graphql';
import { MinLength, Length, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
