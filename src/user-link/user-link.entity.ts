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

  @Field((type) => UserLinkKind)
  @ManyToOne((type) => UserLinkKind)
  @JoinColumn({ name: 'type_id' })
  type: UserLinkKind;

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
