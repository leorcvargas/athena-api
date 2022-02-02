import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserLinkKindEnum {
  BASIC = 'BASIC',
}

registerEnumType(UserLinkKindEnum, {
  name: 'UserLinkKindEnum',
});

@ObjectType()
@Entity({ name: 'user_link_kinds' })
export class UserLinkKind {
  @Field((_type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_type) => UserLinkKindEnum)
  @Column()
  value: UserLinkKindEnum;
}
