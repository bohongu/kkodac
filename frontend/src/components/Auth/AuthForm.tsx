import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { loggedInState, newAcountState } from '../../recoil/atoms';
import { theme } from '../../styles/theme';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { loginAtom, signUpAtom } from '../../api/api';
import { currentUser, accessTokenState } from './../../recoil/atoms';
import axios from 'axios';

interface IAuthForm {
  userId: string;
  password: string;
  confirm: string;
  nickname: string;
}

const Auth = () => {
  /* Recoil */
  const loginState = useSetRecoilState(loggedInState);
  const [newAccount, setNewAccount] = useRecoilState(newAcountState);
  const setCurrentUser = useSetRecoilState(currentUser);
  const setAccessToken = useSetRecoilState(accessTokenState);

  /*React-Hook-Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IAuthForm>();

  /* React-Query */
  const signUp = useMutation(signUpAtom);

  const login = useMutation(loginAtom);

  /* Handlers */
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
      } else {
        /* 회원가입 */
        signUp.mutate(
          { username: userId, password, nickname },
          {
            onSuccess(data) {
              console.log(data);
            },
            onError: (error, variables, context) => {
              console.log(error, variables, context);
            },
          },
        );
        setNewAccount(false);
        reset();
      }
    } else {
      /* 로그인 */
      login.mutate(
        { username: userId, password },
        {
          onSuccess: async (data) => {
            const { accessToken } = data.data;
            const profile = await axios.get(
              `${process.env.REACT_APP_API_URL}/kkodac/user/profile`,
              {
                headers: { Authorization: `${accessToken}` },
              },
            );
            setCurrentUser(profile.data.result);
            setAccessToken(accessToken);
            if (accessToken) {
              loginState(true);
            }
          },
          onError: (error, variables, context) => {
            console.log(error, variables, context);
          },
        },
      );
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
    <AuthWrapper>
      <Form onSubmit={handleSubmit(authSubmitHandler)}>
        <Input
          {...register('userId', {
            required: '아이디를 입력해주세요',
            pattern: {
              value: /^[^{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{5,20}$/,
              message: '5-20자로 입력해주세요 (특수문자 불가)',
            },
          })}
          placeholder="아이디"
        />
        <ErrorMsg>{errors?.userId?.message}</ErrorMsg>
        <Input
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
        <ErrorMsg>{errors?.password?.message}</ErrorMsg>
        {newAccount && (
          <>
            <Input
              {...register('confirm', {
                required: '비밀번호를 입력해주세요',
              })}
              type="password"
              placeholder="비밀번호 확인"
            />
            <ErrorMsg>{errors?.confirm?.message}</ErrorMsg>
            <Input
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
                minLength: { value: 3, message: '3-8자로 입력해주세요' },
                maxLength: { value: 8, message: '3-8자로 입력해주세요' },
              })}
              placeholder="닉네임"
            />
            <ErrorMsg>{errors?.nickname?.message}</ErrorMsg>
          </>
        )}
        <AuthButton>{newAccount ? '회원가입' : '로그인'}</AuthButton>
      </Form>
      {!newAccount && (
        <>
          <SocialLoginWrapper>
            <SocialLogin onClick={kakaoHandler}>
              <RiKakaoTalkFill />
            </SocialLogin>
            <SocialLogin onClick={googleHandler}>
              <AiOutlineGoogle />
            </SocialLogin>
          </SocialLoginWrapper>
        </>
      )}
      <AuthToggle onClick={toggleAuthHandler}>
        {newAccount ? '로그인하러가기' : '회원가입하러가기'}
      </AuthToggle>
    </AuthWrapper>
  );
};

export default Auth;

const AuthWrapper = styled.div`
  ${(props) => props.theme.flex.flexCenterColumn}
  width: 20%;
  height: 45%;
  padding: 1rem;
  border: 1px solid black;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding-left: 10px;
  font-size: 16px;
`;

const ErrorMsg = styled.span`
  ${(props) => (props) => theme.flex.flexCenter}
  font-size: 12px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: red;
`;

const AuthButton = styled.button`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
`;

const SocialLoginWrapper = styled.div`
  ${(props) => props.theme.flex.flexCenter}
  width: 100%;
`;

const SocialLogin = styled.button`
  ${(props) => props.theme.flex.flexCenter}
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: none;
  margin: 1rem;
  margin-bottom: 0;
  font-size: 20px;
`;

const AuthToggle = styled.div`
  margin-top: 10%;
`;
