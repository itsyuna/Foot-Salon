import styled from "styled-components";
import Header from "./compoents/organisms/Header";
import Navigation from "./compoents/organisms/Navigation";

const Wrapper = styled.div`
  border: 3px solid yellow;
  width: 80vw;
  height: 97vh;
  margin: 15px auto;
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Navigation />
    </Wrapper>
  );
}

export default App;
