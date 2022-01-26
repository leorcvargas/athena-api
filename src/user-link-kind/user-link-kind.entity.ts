import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserLinkKindEnum {
  BASIC = 'BASIC',
}

@ObjectType()
@Entity({ name: 'user_link_kinds' })
export class UserLinkKind {
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => String)
  @Column()
  kind: UserLinkKindEnum;
}
