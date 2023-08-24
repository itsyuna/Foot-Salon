import styled, { css } from "styled-components";
import React from "react";

const InputBar = styled.input<InputProps>`
  text-align: center;
  font-size: 1rem;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: ${({ marginTop }) => marginTop};
  ${({ type }) =>
    type === "date" &&
    css`
      border: none;
      background-color: #eeeeee;
      border-radius: 5px;
      cursor: pointer;
      padding: 0.4rem;
      font-family: "Do Hyeon", sans-serif;
      font-size: 1rem;
    `}
`;

interface InputProps {
  type: "text" | "number" | "email" | "password" | "file" | "date";
  id?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  defaultValue?: string;
  ref?: React.MutableRefObject<string>;
  accept?: string;
}

const Input = ({
  type,
  defaultValue,
  value,
  onChange,
  placeholder,
  autoComplete,
  width,
  height,
  marginTop,
}: InputProps) => {
  return (
    <InputBar
      type={type}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete={autoComplete}
      width={width}
      height={height}
      marginTop={marginTop}
    />
  );
};

export default Input;
