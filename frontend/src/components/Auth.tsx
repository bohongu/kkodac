import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { newAcountState } from './../recoil/atoms';

interface IAuthForm {
  userId: string;
  password: string;
  confirm: string;
  nickname: string;
}

const Auth = () => {
  const [newAccount, setNewAccount] = useRecoilState(newAcountState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IAuthForm>();

  const toggleAuthHandler = () => {
    setNewAccount((prev) => !prev);
    reset();
  };

  const authSubmitHandler = ({
    userId,
    password,
    confirm,
    nickname,
  }: IAuthForm) => {
    if (newAccount) {
      if (password !== confirm) {
        setError('confirm', { message: '비밀번호가 일치하지 않습니다' });
      }
      /* 회원가입 */
      console.log('회원가입', userId, password, confirm, nickname);
      reset();
    } else {
      /* 로그인 */
      console.log('로그인', userId, password);
      reset();
    }
  };

  const kakaoHandler = () => {
    /* 카카오 로그인 */
    console.log('카카오 로그인');
  };
  const googleHandler = () => {
    /* 구글 로그인 */
    console.log('구글 로그인');
  };

  return (
    <FormWrapper onSubmit={handleSubmit(authSubmitHandler)}>
      <input
        {...register('userId', {
          required: '아이디를 입력해주세요',
          pattern: {
            value: /^[^{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{5,20}$/,
            message: '5-20자로 입력해주세요 (특수문자 불가)',
          },
        })}
        placeholder="아이디"
      />
      <span>{errors?.userId?.message}</span>
      <input
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          pattern: {
            value:
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
            message: '8-20자로 입력해주세요 (영문자 + 숫자 + 특수문자)',
          },
        })}
        type="password"
        placeholder="비밀번호"
      />
      <span>{errors?.password?.message}</span>
      {newAccount && (
        <>
          <input
            {...register('confirm', {
              required: '비밀번호를 입력해주세요',
            })}
            type="password"
            placeholder="비밀번호 확인"
          />
          <span>{errors?.confirm?.message}</span>
          <input
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              minLength: { value: 3, message: '3-8자로 입력해주세요' },
              maxLength: { value: 8, message: '3-8자로 입력해주세요' },
            })}
            placeholder="닉네임"
          />
          <span>{errors?.nickname?.message}</span>
        </>
      )}
      <button>{newAccount ? '회원가입' : '로그인'}</button>
      {!newAccount && (
        <>
          <h1>Social Account</h1>
          <SocialLoginWrapper>
            <SocialLogin onClick={kakaoHandler}>카카오</SocialLogin>
            <SocialLogin onClick={googleHandler}>구글</SocialLogin>
          </SocialLoginWrapper>
        </>
      )}
      <div onClick={toggleAuthHandler}>
        {newAccount ? '로그인하러가기' : '회원가입하러가기'}
      </div>
    </FormWrapper>
  );
};

export default Auth;

const FormWrapper = styled.form`
  ${(props) => props.theme.flex.flexCenterColumn}
  border: 1px solid black;
`;

const SocialLoginWrapper = styled.div`
  ${(props) => props.theme.flex.flexCenter}
`;

const SocialLogin = styled.div`
  margin: 0 10px;
`;
