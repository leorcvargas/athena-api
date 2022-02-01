import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, ValidateIf } from 'class-validator';

import { UserLinkKindEnum } from '../../user-link-kind/user-link-kind.entity';

@InputType()
export class UserLinkInput {
  @Field((_type) => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field((_type) => String, { nullable: true })
  @IsOptional()
  url?: string;

  @Field((_type) => Boolean, { nullable: true })
  @IsOptional()
  display?: boolean;

  @Field((_type) => UserLinkKindEnum, { nullable: true })
  @ValidateIf((obj) => !!obj.kind)
  @IsOptional()
  @IsEnum(UserLinkKindEnum)
  kind?: UserLinkKindEnum;
}
