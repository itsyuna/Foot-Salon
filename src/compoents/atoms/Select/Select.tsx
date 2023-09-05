import styled from "styled-components";

const StyledSelect = styled.select<SelectProps>`
  width: ${({ width }) => width || "auto"};
  height: 4vh;
  border-radius: 3rem;
  font-family: "Do Hyeon", sans-serif;
  font-size: 1.1rem;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor || "white"};
  color: ${({ color }) => color || "black"};
  border: 1px solid ${({ border }) => border || "black"};
`;

interface OptionType {
  [key: string]: string;
}

interface SelectProps {
  name?: string;
  value?: string;
  option?: OptionType[];
  editOption?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
}

const Select = ({
  defaultValue,
  value,
  onChange,
  option,
  width,
  backgroundColor,
  color,
  border,
}: SelectProps) => {
  return (
    <StyledSelect
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      border={border}
    >
      {option?.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
