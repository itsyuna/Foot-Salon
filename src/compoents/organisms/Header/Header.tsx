import styled from "styled-components";
import Button from "../../atoms/Button/Button";
import Login from "../../pages/Login/Login";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  width: 100%;
  text-align: center;
`;

const logoImg = `${process.env.PUBLIC_URL}/assets/logo/header-logo.svg`;

const loginHandler = () => {
  <Login />;
};

const Header = () => {
  return (
    <HeaderWrapper>
      <img src={logoImg} alt="Header logo" />
      <Link to="login">
        <Button
          type="button"
          onClick={loginHandler}
          buttonText="LOGIN"
          backgroundColor="#E1FFB1"
          color="#f266ab"
          float="right"
          position="relative"
          top="5rem"
        />
      </Link>
    </HeaderWrapper>
  );
};

export default Header;
