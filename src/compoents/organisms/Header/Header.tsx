import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const logoImg = `${process.env.PUBLIC_URL}/assets/logo/header-logo.svg`;

const Header = () => {
  return (
    <Wrapper>
      <img src={logoImg} alt="Header logo" />
    </Wrapper>
  );
};

export default Header;
