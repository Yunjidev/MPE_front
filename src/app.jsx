/* eslint-disable no-unused-vars */
// src/App.js
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom, Provider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import { userAtom } from './store/user';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { UserProvider } from './context/UserContext';
import ScrollToTop from './context/Scrolltotop';

// Components
import ParticlesDemo from './components/ParticlesDemo';
import NavBar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import SocialLinks from './components/SocialLinks/sociallinks';
import UserChoiceModal from './components/home/UserChoiceModal';
import Signup from './components/user/signup';
import Signin from './components/user/signin';

// Pages
import Home from './pages/home/home';
import HomeClient from './pages/home/HomeClient';
import HomeEnterprise from './pages/home/HomeEntreprise';
import Team from './pages/team/team';
import Contact from './pages/contact/contact';
import FAQ from './pages/FAQ/FAQ';
import RegisterCompany from './pages/user/registercompany';
import Pricing_page from './components/pricing_page/pricing_page';

// New components
import Dashboard from './pages/Dashboard/Dashboard';
import EditProfileForm from './components/DashboardUser/EditProfilForm'; // Importez ici si nécessaire
import SearchEntreprise from './pages/searchentreprises/SearchEntreprise';

const MainLayout = ({ children }) => (
  <>
    <NavBar />
    <ToastContainer />
    <ParticlesDemo />
    <main className="container mx-auto lg:w-5/6 w-full">
      {children}
      <SocialLinks />
    </main>
    <Footer />
  </>
);

function App() {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  return (
    <Provider>
      <UserProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainLayout>
            <Routes>
              <Route path="/" element={<UserChoiceModal />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home-client" element={<HomeClient />} />
              <Route path="/home-enterprise" element={<HomeEnterprise />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/about" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/register-company" element={<RegisterCompany />} />
              <Route path="/pricing" element={<Pricing_page />} />
              <Route path="/dashboard/:id" element={<Dashboard />}>
                <Route path="user" element={<EditProfileForm />} /> {/* Remplacez Dashboard par EditProfileForm */}
                <Route path="register-company" element={<RegisterCompany />} />
                <Route path="security" element={<Team />} />
              </Route>
              <Route path="/searchentreprise" element={<SearchEntreprise />} />
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
