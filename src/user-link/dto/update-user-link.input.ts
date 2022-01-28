import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUrl } from 'class-validator';

import { UserLinkKindEnum } from '../../user-link-kind/user-link-kind.entity';

@InputType()
export class UpdateUserLinkInput {
  @Field((_type) => String)
  id: string;

  @Field((_type) => String, { nullable: true })
  @IsOptional()
  title: string;

  @Field((_type) => String, { nullable: true })
  @IsOptional()
  url: string;

  @Field((_type) => UserLinkKindEnum, { nullable: true })
  @IsOptional()
  kind?: UserLinkKindEnum;
}
