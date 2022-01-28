import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

import { UserLinkKindEnum } from '../../user-link-kind/user-link-kind.entity';

@InputType()
export class CreateUserLinkInput {
  @Field((_type) => String)
  @IsOptional()
  title: string;

  @Field((_type) => String)
  @IsOptional()
  url: string;

  @Field((_type) => UserLinkKindEnum)
  @IsNotEmpty()
  kind: UserLinkKindEnum;
}
