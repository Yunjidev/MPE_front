import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Signup from "./components/user/signup";
import Signin from "./components/user/signin";
import SocialLinks from "./components/SocialLinks/sociallinks";
import Pricing from "./components/pricing/pricing";


function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <Pricing />
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
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
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
