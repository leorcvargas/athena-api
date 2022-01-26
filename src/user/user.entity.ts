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
  @Field((_type) => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field((_type) => String)
  @Column({ unique: true })
  email: string;

  @Field((_type) => String)
  @Column({ length: 20, unique: true })
  username: string;

  @Field((_type) => String, { nullable: true })
  @Column()
  @Exclude()
  password?: string;

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
