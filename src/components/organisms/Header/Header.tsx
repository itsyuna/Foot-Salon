import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../store/user";
import { useAppDispatch, useAppSelector } from "../../../store";
import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Comment } from "react-loader-spinner";

import Button from "../../atoms/Button/Button";
import { media } from "../../../ui/MediaQuery/mediaQuery";

const HeaderWrapper = styled.header`
  width: 100%;
  position: relative;

  ${media.small`
    img {
      width: 90%;   
      margin-left: 5%;
    }
  `}

  ${media.large`
    text-align: center; 
  `}
`;

const LoginUserInfoBox = styled.section`
  width: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 70%;
  right: 0;

  ${media.small`
    top: 90%;

    section {
      font-size: 0.7rem;
      width: 100%;
      height: 2vh;
      line-height: 2vh;
    }

    button {
      width: 30%;
      height: 20%;
      font-size: 0.7rem;
    }
  `}

  ${media.medium`
    section,button {
      font-size: 0.9rem;
    }
  `}
`;

const UserInfoBox = styled.section`
  font-family: "Do Hyeon", sans-serif;
  background-color: #f9f5f6;
  width: auto;
  height: 3vh;
  line-height: 3vh;
  padding: 0 0.7rem;
  border-radius: 10px;
  margin-right: 5px;

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
        toast.success("See ya! ✋🏻");
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
            <span>{userNickname}</span>님 경기장 입장! 🥳
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
            margin="0"
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
