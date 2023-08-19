import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

import Header from "./compoents/organisms/Header";
import Navigation from "./compoents/organisms/Navigation";
import Footer from "./compoents/organisms/Footer";
import { ToastContainer } from "react-toastify";

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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ fontFamily: '"Do Hyeon", sans-serif', color: "black" }}
      />
    </Wrapper>
  );
}

export default App;
