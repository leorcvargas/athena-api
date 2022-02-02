import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UserLink } from '../../user-link/user-link.entity';

@ObjectType()
export class PublicProfilePayload {
  constructor(props: {
    id: number;
    username: string;
    displayName: string;
    bio: string;
    links: UserLink[];
  }) {
    this.id = props.id;
    this.username = props.username;
    this.displayName = props.displayName;
    this.bio = props.bio;
    this.links = props.links;
  }

  @Field((_type) => Int)
  id: number;

  @Field((_type) => String)
  username: string;

  @Field((_type) => String, { nullable: true })
  displayName: string;

  @Field((_type) => String, { nullable: true })
  bio: string;

  @Field((_type) => [UserLink])
  links: UserLink[];
}
