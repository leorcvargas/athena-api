import { Field, ObjectType } from '@nestjs/graphql';

import { UserLink } from '../user-link.entity';

@ObjectType()
export class UserLinkPayload {
  @Field(() => UserLink)
  userLink: UserLink;
}
