import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "./compoents/organisms/Header";
import Navigation from "./compoents/organisms/Navigation";
import Footer from "./compoents/organisms/Footer";

const Wrapper = styled.div`
  border: 5px solid white;
  width: 80vw;
  height: 97vh;
  margin: 15px auto;
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
