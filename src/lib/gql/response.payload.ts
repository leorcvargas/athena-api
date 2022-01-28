import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponsePayload {
  @Field(() => String)
  result: string;
}
