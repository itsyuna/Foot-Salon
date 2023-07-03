import styled from "styled-components";
import { MainWrapper } from "../../../App";
import Card from "../../../ui/Card/Card";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/auth/auth";
import { useNavigate } from "react-router-dom";

const SingUpWrapper = styled.div`
  width: 50%;
  height: 90%;
  margin: 0 auto;
  margin-top: 7rem;
  font-family: "Orelega One", cursive;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

export const ErrorText = styled.p`
  color: red;
  margin: 0;
  font-size: 0.8rem;
`;

export interface FormData {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.passwordCheck) {
      setError("passwordCheck", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.nickname });

      alert("회원가입 성공!");
      navigate("/");
      // history.push('/');
    } catch (error: any) {
      console.log(error.message);
      alert("오류");
    }
  };

  return (
    <MainWrapper>
      <Card>
        <SingUpWrapper>
          <Title>Sign up</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              defaultValue=""
              name="nickname"
              rules={{
                required: "필수 입력사항입니다.",
                pattern: {
                  value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                  message: "특수문자 or 공백을 제거해주세요.",
                },
              }}
              render={({ field }) => (
                <Input
                  label="닉네임"
                  type="text"
                  placeholder="한글,영문 사용 가능 / 띄어쓰기,특수문자 사용 불가"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              )}
            />
            <ErrorText>{errors.nickname && errors.nickname.message}</ErrorText>
            <Controller
              control={control}
              defaultValue=""
              name="email"
              rules={{
                required: "필수 입력사항입니다.",
                pattern: {
                  value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
                  message: "올바른 이메일 형식인지 다시 확인해주세요.",
                },
              }}
              render={({ field }) => (
                <Input
                  label="이메일"
                  type="email"
                  placeholder="이메일에 오타가 없는지 확인해주세요."
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              )}
            />
            <ErrorText>{errors.email && errors.email.message}</ErrorText>
            <Controller
              control={control}
              defaultValue=""
              name="password"
              rules={{
                required: "필수 입력사항입니다.",
                pattern: {
                  value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,15}$/,
                  message:
                    "8-15자 or 최소 1개의 숫자 혹은 특수문자를 포함했는지 확인해주세요.",
                },
              }}
              render={({ field }) => (
                <Input
                  label="비밀번호"
                  type="password"
                  placeholder="8-15자 대/소문자 + 최소 1개의 숫자 혹은 특수문자 포함"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              )}
            />
            <ErrorText>{errors.password && errors.password.message}</ErrorText>
            <Controller
              control={control}
              defaultValue=""
              name="passwordCheck"
              rules={{
                required: "필수 입력사항입니다.",
              }}
              render={({ field }) => (
                <Input
                  label="비밀번호 확인"
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              )}
            />
            <ErrorText>
              {errors.passwordCheck && errors.passwordCheck.message}
            </ErrorText>
            <Button type="submit" backgroundColor="#f2e678">
              Sign up
            </Button>
          </form>
        </SingUpWrapper>
      </Card>
    </MainWrapper>
  );
};

export default SignUp;
