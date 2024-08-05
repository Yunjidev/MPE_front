/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
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
import Contact from "./pages/contact/contact";
import FAQ from "./pages/FAQ/FAQ";
import SocialLinks from "./components/SocialLinks/sociallinks";
import { UserProvider } from './context/UserContext'; // Importer UserProvider
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAtom, Provider } from "jotai";
import { userAtom } from "./store/user";
import Pricing_page from "./pages/pricing/pricing_pahe"

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <ParticlesDemo />
      <main className="container mx-auto w-5/6">
        {children}
        <SocialLinks />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    // Charger l'état initial de l'utilisateur à partir du stockage local
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  return (
    <Provider>
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
              <Route path="/contact" element={<Contact />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/pricing" element={<Pricing_page />} />
        </Routes>
          </MainLayout>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
