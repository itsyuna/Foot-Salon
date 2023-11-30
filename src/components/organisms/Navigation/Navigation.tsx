import styled, { css } from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

import { media } from "../../../ui/MediaQuery/mediaQuery";

const NavWrapper = styled.nav<{ extendNavBar: boolean }>`
  background-color: #33aa30;
  border-radius: 20px;
  width: 100%;
  height: 45px;
  line-height: 50%;
  position: relative;
  margin: 10px 0;

  div:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  svg {
    opacity: 0;
  }

  @media screen and (max-width: 767px) {
    svg {
      z-index: 999;
    }
    svg:hover {
      cursor: pointer;
    }

    ${({ extendNavBar }) =>
      extendNavBar
        ? css`
            border-radius: 0;
            background-color: #79ac78;

            ul {
              background-color: #79ac78;
            }

            div:last-child svg:nth-child(2) {
              opacity: 1;
              margin-right: 5%;
            }
          `
        : css`
            ul {
              transform: translateX(100vh);
            }

            div:last-child svg:nth-child(1) {
              opacity: 1;
              margin-left: 5%;
            }
          `}

    ul {
      position: fixed;
      top: 18%;
      left: 10%;
      width: 80vw;
      height: 81vh;
      margin: 0;
      z-index: 999;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: top;
    }

    height: 30px;
  }
`;

const IconBox = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.small`
    width: 25%;
    display: none;
  `}
`;

const GoalpostIcon = styled.img`
  width: 8vw;
  margin-left: 3%;
`;

const SonnyCelebrationIcon = styled.img`
  width: 55px;
  margin-right: 40px;
`;

const Ul = styled.ul`
  position: absolute;

  width: 100%;
  justify-content: space-around;

  top: 0;
`;

const HomeMenu = styled(NavLink)`
  font-family: "Orelega One", cursive;
  font-size: 1.5rem;
  color: black;

  ${media.small`
    font-size: 1.5rem;
  `}
`;

const Menu = styled(NavLink)`
  display: grid;
  grid-template-columns: repeat(10%, auto);
  font-family: "Swanky and Moo Moo", cursive;
  height: 100%;

  font-size: 1.8rem;

  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  color: white;
`;

const GoalPost = `${process.env.PUBLIC_URL}/assets/icons/goalpost.svg`;
const SonnyCelebration = `${process.env.PUBLIC_URL}/assets/icons/sonny-celebration.svg`;

const MenuList = [
  ["/line-up", "Line-Up"],
  ["/play", "Play"],
  ["/half-time", "Half-Time"],
  ["/stats", "Stats"],
  ["/photos", "Photos"],
];

const Navigation = () => {
  const [extendNavBar, setExtendNavBar] = useState(false);

  return (
    <NavWrapper extendNavBar={extendNavBar}>
      <IconBox>
        <GoalpostIcon src={GoalPost} alt="Goalpost icon" />
        <SonnyCelebrationIcon
          src={SonnyCelebration}
          alt="Sonny's celebration icon"
        />
      </IconBox>

      <Ul>
        <li onClick={() => setExtendNavBar(!extendNavBar)}>
          <HomeMenu to="/">Home</HomeMenu>
        </li>
        {MenuList.map((list, idx) => (
          <li key={idx} onClick={() => setExtendNavBar(!extendNavBar)}>
            <Menu to={list[0]}>{list[1]}</Menu>
          </li>
        ))}
      </Ul>
      <div>
        <HiMenu
          size="30"
          color="white"
          onClick={() => setExtendNavBar(!extendNavBar)}
        />
        <MdClose
          size="30"
          color="white"
          onClick={() => setExtendNavBar(!extendNavBar)}
        />
      </div>
    </NavWrapper>
  );
};

export default Navigation;
