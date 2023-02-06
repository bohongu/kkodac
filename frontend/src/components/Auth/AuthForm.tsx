import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { loggedInState, newAcountState } from '../../recoil/atoms';
import { theme } from '../../styles/theme';
import { useMutation } from 'react-query';
import { currentUser, accessToken } from './../../recoil/atoms';
import { signUp, login, BASE_URL } from '../../api/api';
import axios from 'axios';

interface IAuthForm {
  userId: string;
  password: string;
  confirm: string;
  nickname: string;
}

const Auth = () => {
  /* State */

  /* Recoil */
  const loginState = useSetRecoilState(loggedInState);
  const [newAccount, setNewAccount] = useRecoilState(newAcountState);
  const setUser = useSetRecoilState(currentUser);
  const setAccessToken = useSetRecoilState(accessToken);

  /*React-Hook-Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IAuthForm>();

  /* React-Query */
  const signUpAxios = useMutation(signUp);
  const loginAxios = useMutation(login);

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
        signUpAxios.mutate(
          { username: userId, password, nickname },
          {
            onSuccess(data) {
              alert('회원가입이 완료되었습니다.');
            },
            onError: (error) => {
              alert(error);
            },
          },
        );
        setNewAccount(false);
        reset();
      }
    } else {
      /* 로그인 */
      loginAxios.mutate(
        { username: userId, password },
        {
          onSuccess: async (data) => {
            const { accessToken } = data.data;
            const { refreshToken } = data.data.refreshToken;

            setAccessToken(accessToken);
            localStorage.setItem('token', refreshToken);

            const profile = await axios.get(`${BASE_URL}/kkodac/user/profile`, {
              headers: { Authorization: `${accessToken}` },
            });

            setUser(profile.data.result);
            loginState(true);
          },
          onError: (error) => {
            alert(error);
          },
        },
      );
      reset();
    }
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

      <AuthToggle onClick={toggleAuthHandler}>
        {newAccount ? '로그인 하러가기' : '회원가입 하러가기'}
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
  border: none;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding-left: 10px;
  font-size: 14px;
  border: none;
  font-family: Neo;
  border-radius: 5px;
`;

const ErrorMsg = styled.span`
  ${(props) => (props) => theme.flex.flexCenter}
  font-size: 12px;
  margin: 1rem 0;
  color: red;
`;

const AuthButton = styled.button`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 1rem;
  border: none;
  font-family: Neo;
  border-radius: 5px;
`;

const AuthToggle = styled.div`
  margin-top: 10%;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.harderGreen};
  }
`;
