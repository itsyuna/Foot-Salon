import styled from "styled-components";
import { Link } from "react-router-dom";
import { TfiSpray } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 15%;

  display: flex;
  justify-content: space-between;
`;

const LeftSection = styled.section`
  width: 15vw;
  margin: 2rem 0 0 4rem;
`;

const RightSection = styled.section`
  width: 30vw;
  margin-top: 2rem;

  svg {
    transform: rotate(40deg);
  }
`;

const SprayLineBox = styled.div`
  display: flex;

  svg {
    transform: rotate(40deg);
  }
`;

const NoticeBox = styled.section`
  width: 12vw;
  height: 6vh;
  margin-left: 0.6rem;

  display: flex;
  flex-direction: column;
`;

const NoticeSmallBox = styled.div`
  width: 12vw;
  height: 50%;
  margin-left: 2.5rem;
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
  margin-left: 3.5rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <LeftSection>
        <NoticeBox>
          <NoticeSmallBox>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/contact-info-background.png`}
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
              src={`${process.env.PUBLIC_URL}/assets/img/copyright-background.png`}
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
            src={`${process.env.PUBLIC_URL}/assets/img/spray-line.png`}
            alt="Spray line"
            width="90%"
          />
        </SprayLineBox>
      </LeftSection>
      <RightSection>
        <FamousFootballQuotes>
          Form is temporary, Class is permanant. - Bill Shankly
        </FamousFootballQuotes>
        <TfiSpray size="35" color="white" />
        <img
          src={`${process.env.PUBLIC_URL}/assets/img/spray-line.png`}
          alt="Spray line"
          width="90%"
        />
      </RightSection>
    </FooterWrapper>
  );
};

export default Footer;
