import styled from "styled-components";

const HeaderWrapper = styled.header`
  width: 100%;
  text-align: center;
`;

const logoImg = `${process.env.PUBLIC_URL}/assets/logo/header-logo.svg`;

const Header = () => {
  return (
    <HeaderWrapper>
      <img src={logoImg} alt="Header logo" />
    </HeaderWrapper>
  );
};

export default Header;
