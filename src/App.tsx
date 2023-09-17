import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/organisms/Header";
import Navigation from "./components/organisms/Navigation";
import Footer from "./components/organisms/Footer";

const pitchLine = `${process.env.PUBLIC_URL}/assets/images/pitch-line.png`;

const PitchLineWrapper = styled.div`
  background-image: url(${pitchLine});
  background-repeat: no-repeat;
  background-size: 85vw 102vh;
  background-position: 46% 65%;
`;

const ContentWrapper = styled.div`
  width: 80vw;
  height: 97vh;
  margin: 15px auto;
`;

function App() {
  return (
    <PitchLineWrapper>
      <ContentWrapper>
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
      </ContentWrapper>
    </PitchLineWrapper>
  );
}

export default App;
