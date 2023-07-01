import styled from "styled-components";
import { GiSpray } from "react-icons/gi";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 15%;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterBottom = styled.div`
  font-family: "Fontdiner Swanky", cursive;
  color: #def8d6;
  text-shadow: #def8d6 1px 0 10px;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LineImg = styled.img`
  width: 97%;
  text-align: center;
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
        <h3>Footer</h3>
        <h3>Form is temporary, Class is permanant. - Bill Shankly</h3>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;
