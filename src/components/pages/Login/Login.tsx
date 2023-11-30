import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosFootball } from "react-icons/io";
import { Controller, useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Card from "../../../ui/Card/Card";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { ErrorText, FormData } from "../SignUp/SignUp";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const LoginWrapper = styled.section`
  width: 50%;
  height: 40%;
  margin: 0 auto;
  margin-top: 7rem;
  font-family: "Orelega One", cursive;
  text-align: center;

  input {
    font-size: 0.9rem;
  }

  ${media.small`
    width: 80%;

    button,input {
      font-size: 0.7rem;
    }

    p {
      font-size: 0.5rem;
    }

    input {
      width: 40vw;
      height: 2.5vh;
    }

    h1 {
      font-size: 1.3rem;
    }

    svg {
      width: 4vw;
      height: 2.2vh;
    }
  `}

  ${media.medium`
    button,input {
      font-size: 0.8rem;
    }

    p {
      font-size: 0.6rem;
    }

    input {
      width: 30vw;
      height: 3vh;
    }

    h1 {
      font-size: 1.5rem;
    }

    svg {
      width: 2.7vw;
      height: 2.7vh;
    }
  `}
`;

const SingUpWrapper = styled(LoginWrapper)`
  height: 20%;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  margin-bottom: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0.1rem;
`;

const SignUpText = styled.p`
  color: gray;
  margin-right: 1rem;
`;

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      navigate(-1);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/user-not-found")) {
          setError("존재하지 않는 이메일입니다.");
        } else if (error.message.includes("auth/wrong-password")) {
          setError("비밀번호를 다시 확인해 주세요.");
        } else {
          toast.error("오류가 발생했습니다 :(");
        }
      }
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  return (
    <Card>
      <LoginWrapper>
        <Header>
          <Title>Login</Title>
          <IoIosFootball size="30" />
        </Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            defaultValue=""
            name="email"
            rules={{
              required: "필수 입력 사항입니다.",
              pattern: {
                value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
                message: "올바른 이메일 형식인지 다시 확인해 주세요.",
              },
            }}
            render={({ field }) => (
              <Input
                type="email"
                placeholder="이메일을 입력해 주세요."
                value={field.value}
                onChange={field.onChange}
                autoComplete="off"
                width="20vw"
                height="3.5vh"
                marginTop="2rem"
              />
            )}
          />
          <ErrorText>{errors.email && errors.email.message}</ErrorText>
          <Controller
            control={control}
            defaultValue=""
            name="password"
            rules={{
              required: "필수 입력 사항입니다.",
              pattern: {
                value: /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,15}$/,
                message:
                  "8-15자 / 최소 1개의 숫자 혹은 특수문자를 포함했는지 확인해 주세요.",
              },
            }}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                value={field.value}
                onChange={field.onChange}
                autoComplete="off"
                width="20vw"
                height="3.5vh"
                marginTop="1rem"
              />
            )}
          />
          <ErrorText>{errors.password && errors.password.message}</ErrorText>
          <ErrorText>{error && error}</ErrorText>
          <Button type="submit" backgroundColor="#f95d8a" color="white">
            Enter
          </Button>
        </form>
      </LoginWrapper>
      <SingUpWrapper>
        <SignUpText>Foot Salon 멤버가 되어보세요!</SignUpText>
        <Link to="/login/sign-up">
          <Button type="button" backgroundColor="#f2e678" margin="0">
            Sign Up
          </Button>
        </Link>
      </SingUpWrapper>
    </Card>
  );
};

export default Login;
