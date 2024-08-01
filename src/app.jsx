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
import Team from "./pages/team/team";
import Contact from "./pages/contact/contact"
import SocialLinks from "./components/SocialLinks/sociallinks";
import { UserProvider } from './context/UserContext'; // Importer UserProvider

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <NavBar />
      <SocialLinks />
      <ParticlesDemo />
      <main className="relative z-10">{children}</main>
      <Footer />
      
    </div>
  );
};


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserChoiceModal />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home-client" element={<HomeClient />} />
          <Route path="/home-enterprise" element={<HomeEnterprise />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </UserProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
