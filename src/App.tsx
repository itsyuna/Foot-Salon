import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./compoents/organisms/Header";
import Navigation from "./compoents/organisms/Navigation";

const Wrapper = styled.div`
  border: 1px solid white;
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
    </Wrapper>
  );
}

export default App;
