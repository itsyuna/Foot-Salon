import { createGlobalStyle } from "styled-components";

const backgroundImg = `${process.env.PUBLIC_URL}/assets/img/soccer-ground.svg`;

export default createGlobalStyle` 
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-image: url(${backgroundImg})
  }
`;
