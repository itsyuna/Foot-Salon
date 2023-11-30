import styled from "styled-components";
import { Link } from "react-router-dom";
import { TfiSpray } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { media } from "../../../ui/MediaQuery/mediaQuery";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 15%;

  display: flex;
  justify-content: space-between;

  p {
    font-size: 0.9rem;
  }

  ${media.small`
    p {
     font-size: 0.6rem;
    }
  `}

  ${media.medium`
    p {
      font-size: 0.8rem;
    }
  `}
`;

const LeftSection = styled.section`
  width: 20%;
  height: 10vh;
  margin: 1.3rem 0 0 4rem;

  ${media.small`
    width: 55%;
    margin: 5% 0 0 0;
  `}

  ${media.medium`
    width: 35%;
    margin: 5% 0 0 0;;
  `}
`;

const RightSection = styled.section`
  width: 25%;
  height: 10vh;
  margin-top: 5%;
  svg {
    transform: rotate(40deg);
  }

  ${media.large`
      width: 30%;
      margin: 1.2rem 2rem 0 0;
  `}
`;

const SprayLineBox = styled.div`
  display: flex;

  svg {
    transform: rotate(40deg);
  }

  svg,
  img {
    display: none;
  }

  ${media.large`
    svg,img {
      display: block;
    }
  `}
`;

const NoticeBox = styled.section`
  width: 100%;
  height: 6vh;
  display: flex;
  flex-direction: column;

  ${media.small`
    height: 4.5vh;

    svg {
      width: 2.5vw;
    }
  `}

  ${media.medium`
    height: 5vh;

    svg {
      width: 2vw;
    }
  `}
`;

const NoticeSmallBox = styled.div`
  height: 50%;
  position: relative;

  ${media.large`
    width: 90%;
    margin-left: 10%;
  `}
`;

const DeveloperInfo = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  cursor: pointer;

  display: flex;
  justify-content: space-around;
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

  ${media.small`
    width: 50%;
  `}

  ${media.medium`
    width: 60%;
  `}
`;

const CopyrightText = styled.p`
  font-family: "Bebas Neue", sans-serif;
  width: 100%;

  text-align: center;
  position: absolute;
  top: 10%;
  left: 40%;
  transform: translate(-40%, -50%);
  color: white;

  ${media.small`
    top: 6%;
  `}

  ${media.medium`
    top: 5%;
  `}
`;

const FamousFootballQuotes = styled.p`
  font-family: "Fontdiner Swanky", cursive;
  color: #def8d6;
  text-shadow: #def8d6 1px 0 10px;
  font-size: 1rem;
  margin: 0;

  ${media.large`   
    margin: 0 0 0 3.5rem;
  `}
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <LeftSection>
        <NoticeBox>
          <NoticeSmallBox>
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/contact-info-background.png`}
              alt="Contact information background"
              width="100%"
              height="100%"
            />
            <DeveloperInfo>
              <a
                href="https://github.com/itsyuna"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size="25" color="white" />
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
              src={`${process.env.PUBLIC_URL}/assets/images/copyright-background.png`}
              alt="Copyright background"
              width="100%"
              height="100%"
            />
            <CopyrightText>
              © COPYRIGHT 2023 Yuna Lee. ALL RIGHTS RESERVED.
            </CopyrightText>
          </NoticeSmallBox>
        </NoticeBox>
        <SprayLineBox>
          <TfiSpray size="35" color="white" />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/spray-line.png`}
            alt="Spray line"
            width="90%"
          />
        </SprayLineBox>
      </LeftSection>
      <RightSection>
        <FamousFootballQuotes>
          Form is temporary, Class is permanant. - Bill Shankly
        </FamousFootballQuotes>
        <SprayLineBox>
          <TfiSpray size="35" color="white" />
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/spray-line.png`}
            alt="Spray line"
            width="90%"
          />
        </SprayLineBox>
      </RightSection>
    </FooterWrapper>
  );
};

export default Footer;
