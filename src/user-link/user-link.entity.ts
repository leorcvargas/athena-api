import { Field, Int, ObjectType } from '@nestjs/graphql';
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
  @Field((_type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_type) => String)
  @Column({ nullable: true })
  title: string;

  @Field((_type) => String)
  @Column({ nullable: true })
  url: string;

  @Field((_type) => Boolean)
  @Column({ default: true })
  display: boolean;

  @Field((_type) => Int)
  @Column()
  position: number;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.links, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User | number;

  @Field((_type) => UserLinkKind)
  @ManyToOne((_type) => UserLinkKind, { nullable: false })
  @JoinColumn({ name: 'kind_id' })
  kind: UserLinkKind | number;

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
