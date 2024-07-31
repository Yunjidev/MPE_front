import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import UserChoiceModal from "./components/home/UserChoiceModal";
import Home from "./pages/home/home";
import HomeClient from "./pages/home/HomeClient";
import HomeEnterprise from "./pages/home/HomeEntreprise";
import Signup from "./components/user/signup";
import Signin from "./components/user/signin";
import SocialLinks from "./components/SocialLinks/sociallinks";


function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <SocialLinks />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<UserChoiceModal />} />
      <Route path="/home" element={<Home />} />
        <Route path="/home-client" element={<HomeClient />} />
        <Route path="/home-enterprise" element={<HomeEnterprise />} />
        <Route
          path="/signup"
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />
        <Route
          path="/signin"
          element={
            <MainLayout>
              <Signin />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
