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
import Team from "./pages/team/team"
import SocialLinks from "./components/SocialLinks/sociallinks";
import { UserProvider } from './context/UserContext'; // Importer UserProvider

// Définir MainLayout pour rendre la mise en page cohérente
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

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <UserProvider> {/* Envelopper l'application avec UserProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserChoiceModal />} />
          <Route path="/home" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/home-client" element={<MainLayout><HomeClient /></MainLayout>} />
          <Route path="/home-enterprise" element={<MainLayout><HomeEnterprise /></MainLayout>} />
          <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
          <Route path="/signin" element={<MainLayout><Signin /></MainLayout>} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
