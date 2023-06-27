import { createGlobalStyle } from "styled-components";

const backgroundImg = `${process.env.PUBLIC_URL}/assets/img/soccer-ground.svg`;

export default createGlobalStyle` 
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-image: url(${backgroundImg})
  }

  ul {
    padding-left: 0;
    list-style: none;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li {
    cursor: pointer;
  }

  a { 
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
  }
`;
