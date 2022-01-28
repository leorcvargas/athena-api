import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteUserLinkInput {
  @Field((_type) => String)
  @IsNotEmpty()
  id: string;
}
