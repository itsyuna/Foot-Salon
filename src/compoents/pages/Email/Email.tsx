import styled from "styled-components";
import { HiOutlineMailOpen } from "react-icons/hi";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import Button from "../../atoms/Button";

const EmailWrapper = styled.section`
  font-family: "IBM Plex Sans KR", sans-serif;
  width: 100%;
  height: 65vh;
  background-color: #fff8ea;
  overflow: auto;
  border-collapse: collapse;
  white-space: nowrap;
  border-radius: 10px;
`;

const EmailHeader = styled.header`
  width: 30vw;
  height: 5vh;
  line-height: 5vh;
  margin: 5rem auto 2rem;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin: 0.2rem 0.5rem 0;
  }
`;

const Form = styled.form`
  width: 30vw;
  height: 30vh;
  margin: 0 auto;
  text-align: center;
`;

const InputSection = styled.section`
  font-size: 1.1rem;
  width: 100%;
  height: 5vh;

  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;

  label {
    font-weight: 900;
  }
`;

const Input = styled.input`
  font-size: 0.9rem;
  width: 16vw;
  height: 3vh;
  text-align: center;
`;

const MessageSection = styled(InputSection)`
  height: 13vh;
`;

const Textarea = styled.textarea`
  font-size: 0.9rem;
  width: 16vw;
  height: 10vh;
`;

const Email = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmailHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentForm = form.current;

    if (currentForm === null) return;

    emailjs
      .sendForm(
        `${process.env.REACT_APP_EMAIL_SERVICE_ID}`,
        `${process.env.REACT_APP_EMAIL_TEMPLATE_ID}`,
        currentForm,
        `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          currentForm.reset();
          toast.success("이메일이 전송되었습니다 :)");
        },
        (error) => {
          toast.error("오류가 발생했습니다 :(");
        }
      );
  };

  return (
    <EmailWrapper>
      <EmailHeader>
        <h2>Send Email</h2>
        <HiOutlineMailOpen size="27" />
      </EmailHeader>
      <Form ref={form} onSubmit={sendEmailHandler}>
        <InputSection>
          <label htmlFor="user_name">Name</label>
          <Input
            type="text"
            id="user_name"
            name="user_name"
            placeholder="작성자의 이름을 입력해 주세요."
            required
          />
        </InputSection>
        <InputSection>
          <label htmlFor="user_email">Email</label>
          <Input
            type="text"
            id="user_email"
            name="user_email"
            placeholder="작성자의 이메일을 입력해 주세요."
            required
          />
        </InputSection>
        <MessageSection>
          <label htmlFor="message">Message</label>
          <Textarea
            id="message"
            name="message"
            placeholder="메시지를 입력해 주세요 :)"
            required
          />
        </MessageSection>
        <Button type="submit" backgroundColor="#FFEA20" border="#FFEA20">
          Send
        </Button>
      </Form>
      <section></section>
    </EmailWrapper>
  );
};

export default Email;
