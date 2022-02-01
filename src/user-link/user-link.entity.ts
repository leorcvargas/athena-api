import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';
import { UserLinkKind } from '../user-link-kind/user-link-kind.entity';

@ObjectType()
@Entity({ name: 'user_links' })
export class UserLink {
  @Field((_type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((_type) => String)
  @Column({ nullable: true })
  title: string;

  @Field((_type) => String)
  @Column({ nullable: true })
  url: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User | string;

  @Field((_type) => UserLinkKind)
  @ManyToOne((_type) => UserLinkKind, { nullable: false })
  @JoinColumn({ name: 'kind_id' })
  kind: UserLinkKind | string;

  @Field((_type) => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field((_type) => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field((_type) => Date, { nullable: true })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
