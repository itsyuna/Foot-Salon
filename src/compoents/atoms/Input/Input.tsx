import styled, { css } from "styled-components";
import React from "react";

const InputBar = styled.input<InputProps>`
  text-align: center;
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
  placeholder,
  value,
  onChange,
  autoComplete,
  width,
  height,
  marginTop,
  defaultValue,
}: InputProps) => {
  return (
    <InputBar
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      width={width}
      height={height}
      marginTop={marginTop}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
