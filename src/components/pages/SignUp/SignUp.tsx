import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { userActions } from "../../../store/user";
import { useAppDispatch } from "../../../store";
import { auth, dbService } from "../../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import Card from "../../../ui/Card";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const SingUpWrapper = styled.section`
  width: 50%;
  height: 55vh;
  margin: 3rem auto 0;
  font-family: "Orelega One", cursive;
  text-align: center;

  form {
    width: 100%;
  }

  input {
    height: 3.5vh;
  }

  & > section {
    text-align: left;
  }

  label,
  button,
  input {
    font-size: 0.9rem;
  }

  ${media.small`
    width: 80%;
    
    label,button,input {
      font-size: 0.6rem;
    }

    p {
      width: 60%;
      font-size: 0.5rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    input {
      width: 80%;
      height: 2.5vh;
    }

    button {
      width: auto;
      height: 3vh;
    }
  `}

  ${media.medium`
    width: 70%;

    label,button,input {
      font-size: 0.7rem;
    }

    p {
      font-size: 0.6rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    input {  
      width: 75%;
      height: 3vh;
    }

    button {
      width: auto;
      height: 3.2vh;
    }
  `}
`;

const Title = styled.h1`
  font-size: 1.8rem;
`;

const CheckInput = styled.input`
  text-align: center;
`;

export const ErrorText = styled.p`
  color: red;
  margin: 0 auto;
  font-family: "Do Hyeon", sans-serif;
  font-size: 0.8rem;
`;

const InputWrapper = styled.section`
  width: 100%;
  font-family: "Do Hyeon", sans-serif;
  margin-top: 1.5rem;

  display: grid;
  grid-template-columns: 0.5fr 2fr 0.5fr;
  align-items: center;

  ${media.small`
    grid-template-columns: 0.8fr 2.5fr;
  `}

  ${media.medium`
    grid-template-columns: 0.5fr 2fr;
  `}
`;

const Label = styled.label`
  line-height: 4vh;
`;

export interface FormData {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const [nicknameCheckText, setNicknameCheckText] = useState("");

  const checkNickname = (
    nicknameInput: React.ChangeEvent<HTMLInputElement>
  ) => {
    const queryNicknameCheck = query(
      collection(dbService, "userList"),
      where("userNickname", "==", nicknameInput)
    );

    onSnapshot(queryNicknameCheck, (querySnapshot) => {
      if (querySnapshot.empty) {
        setNicknameCheckText("사용 가능한 닉네임입니다 :)");
      } else setNicknameCheckText("이미 사용 중인 닉네임입니다 :(");
    });
  };

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.passwordCheck) {
      setError("passwordCheck", { message: "비밀번호가 일치하지 않습니다." });
      return;
    }

    if (nicknameCheckText === "이미 사용 중인 닉네임입니다 :(") {
      toast.warning("닉네임을 확인해 주세요!");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.nickname });

      await setDoc(doc(dbService, "userList", user.uid), {
        userNickname: user.displayName,
        userEmail: user.email,
      });

      dispatch(
        userActions.login({
          userNickname: user.displayName,
          userEmail: user.email,
          userUid: user.uid,
        })
      );

      toast.success("Welcome to Foot Salon! ⚽️🙌🏻");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.warning("이미 사용 중인 이메일입니다 :(");
        } else toast.error("오류가 발생했습니다 :(");
      }
    }
  };

  return (
    <Card>
      <SingUpWrapper>
        <section>
          <Button
            type="button"
            onClick={() => navigate(-1)}
            backgroundColor="#FFD36E"
            border="#FEB139"
            width="5rem"
            margin="0"
          >
            뒤로가기
          </Button>
        </section>
        <header>
          <Title>Sign up</Title>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            defaultValue=""
            name="nickname"
            rules={{
              required: "필수 입력 사항입니다.",
              pattern: {
                value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                message: "특수문자 or 공백을 제거해 주세요.",
              },
              onChange(e) {
                checkNickname(e.target.value);
              },
            }}
            render={({ field }) => (
              <>
                <InputWrapper>
                  <Label htmlFor="nickname">닉네임</Label>
                  <CheckInput
                    type="text"
                    id="nickname"
                    placeholder="한글,영문 사용 가능(최대 12글자) / 띄어쓰기,특수문자 사용 불가"
                    autoComplete="off"
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={12}
                  />
                </InputWrapper>
                <ErrorText>{!errors.nickname && nicknameCheckText}</ErrorText>
              </>
            )}
          />
          <ErrorText>{errors.nickname && errors.nickname.message}</ErrorText>
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
              <InputWrapper>
                <Label htmlFor="email">이메일</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="이메일에 오타가 없는지 확인해 주세요."
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              </InputWrapper>
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
                  "8-15자 or 최소 1개의 숫자 혹은 특수문자를 포함했는지 확인해 주세요.",
              },
            }}
            render={({ field }) => (
              <InputWrapper>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="8-15자 대/소문자 + 최소 1개의 숫자 혹은 특수문자 포함"
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              </InputWrapper>
            )}
          />
          <ErrorText>{errors.password && errors.password.message}</ErrorText>
          <Controller
            control={control}
            defaultValue=""
            name="passwordCheck"
            rules={{
              required: "필수 입력 사항입니다.",
            }}
            render={({ field }) => (
              <InputWrapper>
                <Label htmlFor="password-check">비밀번호 확인</Label>
                <Input
                  type="password"
                  id="password-check"
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete="off"
                />
              </InputWrapper>
            )}
          />
          <ErrorText>
            {errors.passwordCheck && errors.passwordCheck.message}
          </ErrorText>
          <Button type="submit" backgroundColor="#f2e678" margin="2rem">
            Sign up
          </Button>
        </form>
      </SingUpWrapper>
    </Card>
  );
};

export default SignUp;
