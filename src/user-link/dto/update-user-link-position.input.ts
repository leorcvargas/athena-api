import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export class UpdateUserLinkPositionInput {
  @Field((_type) => Int)
  @IsNumber()
  id: number;

  @Field((_type) => Int)
  @IsNumber()
  @IsPositive()
  position: number;
}
