import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UserLink } from '../../user-link/user-link.entity';

@ObjectType()
export class PublicProfilePayload {
  @Field((_type) => Int)
  id: number;

  @Field((_type) => String)
  username: string;

  @Field((_type) => [UserLink])
  links: UserLink[];
}
