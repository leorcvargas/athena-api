import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsUrl,
  ValidateIf,
} from 'class-validator';

import { UserLinkKindEnum } from '../../user-link-kind/user-link-kind.entity';

@InputType()
export class UpdateUserLinkInput {
  @Field((_type) => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field((_type) => String, { nullable: true })
  @ValidateIf((obj) => !!obj.url)
  @IsUrl()
  url?: string;

  @Field((_type) => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  display?: boolean;

  @Field((_type) => UserLinkKindEnum, { nullable: true })
  @ValidateIf((obj) => !!obj.kind)
  @IsEnum(UserLinkKindEnum)
  kind?: UserLinkKindEnum;
}
