import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field((type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((type) => String)
  @Column({ unique: true })
  email: string;

  @Field((type) => String)
  @Column({ length: 20, unique: true })
  username: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @Exclude()
  password?: string;

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
