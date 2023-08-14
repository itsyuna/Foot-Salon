import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../store/user";
import { useAppDispatch, useAppSelector } from "../../../store";
import { auth } from "../../../firebase/config";
import { Comment } from "react-loader-spinner";

import Button from "../../atoms/Button/Button";

const HeaderWrapper = styled.header`
  width: 100%;
  text-align: center;
  position: relative;
`;

const LoginUserInfoBox = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 40%;
  right: 0;
`;

const UserInfoBox = styled.div`
  font-family: "Do Hyeon", sans-serif;
  background-color: #f9f5f6;
  width: auto;
  height: 3vh;
  line-height: 3vh;
  padding: 0 0.7rem;
  border-radius: 10px;

  h3 {
    margin: 0;
  }

  span {
    color: #c780fa;
  }
`;

const logoImg = `${process.env.PUBLIC_URL}/assets/logo/header-logo.svg`;

const Header = () => {
  const userNickname = useAppSelector((state) => state.user.nickname);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginOutHandler = () => {
    if (isLoggedIn) {
      if (window.confirm("정말 로그아웃 하시겠습니까?")) {
        auth.signOut();
      }
    } else navigate("/login");
  };

  let [isSpinnerOn, setIsSpinnerOn] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          userActions.login({
            userNickname: user.displayName,
            userEmail: user.email,
            userUid: user.uid,
          })
        );
        setIsSpinnerOn(false);
      } else {
        dispatch(userActions.logout());
        setIsSpinnerOn(false);
      }
    });
  }, [dispatch]);

  return (
    <HeaderWrapper>
      <img src={logoImg} alt="Header logo" />
      <LoginUserInfoBox>
        {userNickname && (
          <UserInfoBox>
            <h3>
              <span>{userNickname}</span>님 경기장 입장! 🥳
            </h3>
          </UserInfoBox>
        )}
        {isSpinnerOn ? (
          <Comment
            visible={true}
            height="70"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          />
        ) : (
          <Button
            type="button"
            onClick={loginOutHandler}
            backgroundColor="#E1FFB1"
            color="#f266ab"
            top="4rem"
            border="white"
          >
            {isLoggedIn ? "LOGOUT" : "LOGIN"}
          </Button>
        )}
      </LoginUserInfoBox>
    </HeaderWrapper>
  );
};
export default Header;
