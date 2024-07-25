import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Signup from "./components/user/signup";
import Signin from "./components/user/signin";

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
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
