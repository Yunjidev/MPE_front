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
import { UserProvider } from './context/UserContext'; // Importer UserProvider

function App() {
  return (
    <UserProvider> {/* Envelopper l'application avec UserProvider */}
      <BrowserRouter>
        <NavBar />
        <SocialLinks />
        <Routes>
          <Route path="/" element={<UserChoiceModal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-client" element={<HomeClient />} />
          <Route path="/home-enterprise" element={<HomeEnterprise />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
