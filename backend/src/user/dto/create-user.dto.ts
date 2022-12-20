import {
  IsEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^[a-zA-Z][0-9a-zA-Z]{4,20}$/, {
    message: '아이디는 5-20자로 입력해주세요 (특수문자, 한글 불가)',
  })
  userName: string;

  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,20}$/, {
    message: '비밀번호는 8-20자로 입력해주세요 (영문자 + 숫자 + 특수문자)',
  })
  password: string;

  @IsString()
  @MinLength(3, {
    message: '닉네임은 3글자 이상이어야 합니다.',
  })
  @MaxLength(8, {
    message: '닉네임은 8글자 이하여야 합니다.',
  })
  nickname: string;

  @IsOptional()
  introduce: string;

  @IsOptional()
  file: string;

  @IsEmpty()
  updatedAt: string;

  @IsEmpty()
  createdAt: string;
}
