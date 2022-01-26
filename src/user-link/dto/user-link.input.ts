import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { UserLinkKindEnum } from 'src/user-link-kind/user-link-kind.entity';

@InputType()
export class UserLinkInput {
  @Field((_type) => String)
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @Field((_type) => UserLinkKindEnum)
  @IsNotEmpty()
  kind: UserLinkKindEnum;
}
