import { IsNotEmpty } from 'class-validator';

export class FollowDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  followedUserId: string;
}
