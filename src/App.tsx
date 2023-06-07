import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./compoents/organisms/Header";
import Navigation from "./compoents/organisms/Navigation";
import Footer from "./compoents/organisms/Footer";

const Wrapper = styled.div`
  border: 1px solid white;
  width: 80vw;
  height: 97vh;
  margin: 15px auto;
`;

export const MainWrapper = styled.main`
  width: 100%;
  height: 65vh;
  border: 2px solid yellow;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Navigation />
      <Outlet />
      <Footer />
    </Wrapper>
  );
}

export default App;
