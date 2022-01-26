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
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => String)
  @Column()
  url: string;

  @Field((type) => User)
  @ManyToOne((type) => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field((type) => UserLinkKind)
  @ManyToOne((type) => UserLinkKind, { nullable: false })
  @JoinColumn({ name: 'kind_id' })
  kind: UserLinkKind;

  @Field((type) => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field((type) => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
