import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticlesDemo from "./components/ParticlesDemo";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import UserChoiceModal from "./components/home/UserChoiceModal";
import Home from "./pages/home/home";
import HomeClient from "./pages/home/HomeClient";
import HomeEnterprise from "./pages/home/HomeEntreprise";
import Signup from "./components/user/signup";
import Signin from "./components/user/signin";
import Team from "./pages/team/team"
import SocialLinks from "./components/SocialLinks/sociallinks";
import { UserProvider } from './context/UserContext'; // Importer UserProvider

const MainLayout = ({ children }) => {
  return (

    <>
      <NavBar />
      <ParticlesDemo />
      <main>{children}
      <SocialLinks />
      </main>
      <Footer />
      </>
  );
};


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<UserChoiceModal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-client" element={<HomeClient />} />
          <Route path="/home-enterprise" element={<HomeEnterprise />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
    </UserProvider>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
