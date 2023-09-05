import styled from "styled-components";

const StyledButton = styled.button<ButtonProps>`
  border-radius: 3rem;
  background-color: ${({ backgroundColor }) => backgroundColor || "white"};
  color: ${({ color }) => color || "black"};
  font-family: "Do Hyeon", sans-serif;
  font-size: 1.1rem;
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  border: 1px solid ${({ border }) => border || "white"};
  &:hover {
    background-color: ${({ hoverEffect }) => hoverEffect};
  }
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "4vh"};
  margin: ${({ margin }) => margin || "1rem"};
`;

interface ButtonProps {
  type: "button" | "submit" | "reset";
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string | JSX.Element;
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  position?: string;
  top?: string;
  border?: string;
  hoverEffect?: string;
  margin?: string;
}

const Button = ({ type, onClick, children, ...rest }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
