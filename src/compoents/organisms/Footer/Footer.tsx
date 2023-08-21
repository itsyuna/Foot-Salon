import styled from "styled-components";
import { GiSpray } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 15%;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LineImg = styled.img`
  width: 97%;
  text-align: center;
`;

const FooterBottom = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-family: "Fontdiner Swanky", cursive;
    color: #def8d6;
    text-shadow: #def8d6 1px 0 10px;
  }
`;

const NoticeBox = styled.div`
  width: 18%;
  height: 7vh;
  display: flex;
  flex-direction: column;

  margin-top: 2rem;
`;

const NoticeSmallBox = styled.div`
  height: 50%;
  position: relative;

  div {
    a {
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

    color: white;
    width: 75%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h4 {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 40%;
    transform: translate(-40%, -50%);
    font-family: "Bebas Neue", sans-serif;
    color: white;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterTop>
        <GiSpray size="50" color="white" />
        <LineImg
          src={`${process.env.PUBLIC_URL}/assets/icon/line.svg`}
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
            <div>
              <a
                href="https://github.com/itsyuna"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size="30" color="white" />
                github
              </a>
            </div>
          </NoticeSmallBox>
          <NoticeSmallBox>
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/football-notice.png`}
              alt="index"
              width="100%"
              height="100%"
            />
            <h4>© COPYRIGHT 2023 Yuna Lee. ALL RIGHTS RESERVED.</h4>
          </NoticeSmallBox>
        </NoticeBox>
        <h3>Form is temporary, Class is permanant. - Bill Shankly</h3>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
