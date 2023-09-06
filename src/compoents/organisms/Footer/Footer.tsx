import styled from "styled-components";
import { Link } from "react-router-dom";
import { TfiSpray } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 15%;
`;

const FooterTop = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    transform: rotate(40deg);
  }
`;

const LineImg = styled.img`
  width: 97%;
  text-align: center;
`;

const FooterBottom = styled.section`
  width: 90%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoticeBox = styled.section`
  width: 12vw;
  height: 6vh;

  display: flex;
  flex-direction: column;
`;

const NoticeSmallBox = styled.div`
  height: 50%;
  position: relative;
`;

const DeveloperInfo = styled.div`
  color: white;
  width: 75%;
  height: 100%;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  a {
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      margin-right: 0.2rem;
    }
  }

  a:visited {
    color: inherit;
  }

  p {
    margin: 0;
  }
`;

const CopyrightText = styled.p`
  font-family: "Bebas Neue", sans-serif;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 12%;
  left: 40%;
  transform: translate(-40%, -50%);
  color: white;
`;

const FamousFootballQuotes = styled.p`
  font-family: "Fontdiner Swanky", cursive;
  font-size: 1.2rem;
  color: #def8d6;
  text-shadow: #def8d6 1px 0 10px;
  margin: 0;
  margin-left: 3rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterTop>
        <TfiSpray size="45" color="white" />
        <LineImg
          src={`${process.env.PUBLIC_URL}/assets/icon/line-2.svg`}
          alt="line"
        />
      </FooterTop>
      <FooterBottom>
        <NoticeBox>
          <NoticeSmallBox>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/football-contact.png`}
              alt="index"
              width="100%"
              height="100%"
            />
            <DeveloperInfo>
              <a
                href="https://github.com/itsyuna"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size="30" color="white" />
                <p>Github</p>
              </a>
              <Link to="/email">
                <MdEmail size="25" />
                <p>Email</p>
              </Link>
            </DeveloperInfo>
          </NoticeSmallBox>
          <NoticeSmallBox>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/football-notice.png`}
              alt="index"
              width="100%"
              height="100%"
            />
            <CopyrightText>
              © COPYRIGHT 2023 Yuna Lee. ALL RIGHTS RESERVED.
            </CopyrightText>
          </NoticeSmallBox>
        </NoticeBox>
        <FamousFootballQuotes>
          Form is temporary, Class is permanant. - Bill Shankly
        </FamousFootballQuotes>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
