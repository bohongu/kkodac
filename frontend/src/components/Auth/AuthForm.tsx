import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { loggedInState, newAcountState } from '../../recoil/atoms';
import { theme } from '../../styles/theme';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { signUpAtom } from '../../api/api';

interface IAuthForm {
  userId: string;
  password: string;
  confirm: string;
  nickname: string;
}

const Auth = () => {
  const loginState = useSetRecoilState(loggedInState);
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

  const signUp = useMutation(signUpAtom, {
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onSuccess: (variables) => {
      console.log('success', variables);
    },
    onSettled: () => {
      console.log('end');
    },
  });

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
        signUp.mutate({ userName: userId, password, nickname });
        reset();
      }
    } else {
      /* 로그인 */
      loginState(true);
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
    <AuthWrapper>
      <Form onSubmit={handleSubmit(authSubmitHandler)}>
        <Inputs>
          <label htmlFor="userId">
            <span>*</span>아이디
          </label>
          <input
            id="userId"
            {...register('userId', {
              required: '아이디를 입력해주세요',
              pattern: {
                value: /^[^{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]{5,20}$/,
                message: '5-20자로 입력해주세요 (특수문자 불가)',
              },
            })}
          />
        </Inputs>
        <ErrorMsg>{errors?.userId?.message}</ErrorMsg>
        <Inputs>
          <label htmlFor="password">
            <span>*</span>비밀번호
          </label>
          <input
            id="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
                message: '8-20자로 입력해주세요 (영문자 + 숫자 + 특수문자)',
              },
            })}
            type="password"
          />
        </Inputs>
        <ErrorMsg>{errors?.password?.message}</ErrorMsg>
        {newAccount && (
          <>
            <Inputs>
              <label htmlFor="confirm">
                <span>*</span>비밀번호 확인
              </label>
              <input
                id="confirm"
                {...register('confirm', {
                  required: '비밀번호를 입력해주세요',
                })}
                type="password"
              />
            </Inputs>
            <ErrorMsg>{errors?.confirm?.message}</ErrorMsg>
            <Inputs>
              <label htmlFor="nickname">
                <span>*</span>닉네임
              </label>
              <input
                id="nickname"
                {...register('nickname', {
                  required: '닉네임을 입력해주세요',
                  minLength: { value: 3, message: '3-8자로 입력해주세요' },
                  maxLength: { value: 8, message: '3-8자로 입력해주세요' },
                })}
              />
            </Inputs>

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
`;

const Form = styled.form`
  width: 100%;
`;

const Inputs = styled.div`
  margin: 20px auto;
  position: relative;
  label {
    display: inline-block;
    position: absolute;
    top: -5px;
    left: 14px;
    padding: 10px;
    background: white;
    font-size: 14px;
    color: #888;
    font-weight: bold;
    span {
      color: #da4841;
      vertical-align: -1px;
    }
  }
  input {
    width: 100%;
    border: 1px solid #dddddd !important;
    font-size: 1rem;
    line-height: 1.45;
    letter-spacing: -0.04rem;
    border-radius: 8px;
    padding: 16px;
    margin-top: 12px;
  }
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
