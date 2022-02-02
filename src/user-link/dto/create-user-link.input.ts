import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';

import { UserLinkKindEnum } from '../../user-link-kind/user-link-kind.entity';

@InputType()
export class CreateUserLinkInput {
  @Field((_type) => String)
  @IsString()
  title: string;

  @Field((_type) => String)
  @IsUrl()
  url: string;

  @Field((_type) => Boolean)
  @IsBoolean()
  display: boolean;

  @Field((_type) => Int)
  @IsNumber()
  position: number;

  @Field((_type) => UserLinkKindEnum)
  @IsEnum(UserLinkKindEnum)
  kind: UserLinkKindEnum;
}
