import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #33aa30;
  border-radius: 20px;
  width: 100%;
  height: 5%;
  line-height: 50%;
  position: relative;
`;

const IconBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GoalpostIcon = styled.img`
  margin-left: 40px;
`;

const SonnyCelebrationIcon = styled.img`
  width: 55px;
  margin-right: 40px;
`;

const Nav = styled.nav`
  position: absolute;
  width: 95%;
  top: 10%;
`;

const HomeMenu = styled(Link)`
  font-family: "Orelega One", cursive;
  font-size: 2rem;
  color: black;
  margin-left: 95px;
`;

const Menu = styled(HomeMenu)`
  font-family: "Swanky and Moo Moo", cursive;
  font-size: 2.5rem;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  color: white;
`;

const GoalPost = `${process.env.PUBLIC_URL}/assets/icon/goalpost.svg`;
const SonnyCelebration = `${process.env.PUBLIC_URL}/assets/icon/sonny-celebration.svg`;

const Navigation = () => {
  return (
    <Wrapper>
      <IconBox>
        <GoalpostIcon src={GoalPost} alt="Goalpost icon" />
        <SonnyCelebrationIcon
          src={SonnyCelebration}
          alt="Sonny's celebration icon"
        />
      </IconBox>
      <Nav>
        <ul>
          <li>
            <HomeMenu to="/">Home</HomeMenu>
          </li>
          <li>
            <Menu to="/line-up">Line-Up</Menu>
          </li>
          <li>
            <Menu to="play">Play</Menu>
          </li>
          <li>
            <Menu to="half-time">Half-Time</Menu>
          </li>
          <li>
            <Menu to="stats">Stats</Menu>
          </li>
          <li>
            <Menu to="photos">Photos</Menu>
          </li>
        </ul>
      </Nav>
    </Wrapper>
  );
};

export default Navigation;