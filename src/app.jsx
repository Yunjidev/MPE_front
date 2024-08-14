/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useAtom, Provider } from "jotai";
import { ToastContainer } from "react-toastify";
import { userAtom } from "./store/user";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";
import ScrollToTop from "./context/Scrolltotop";

import ParticlesDemo from "./components/ParticlesDemo";
import NavBar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import SocialLinks from "./components/SocialLinks/sociallinks";
import UserChoiceModal from "./components/home/UserChoiceModal";
import Signup from "./components/user/signup";
import Signin from "./components/user/signin";

import Home from "./pages/home/home";
import HomeClient from "./pages/home/HomeClient";
import HomeEnterprise from "./pages/home/HomeEntreprise";
import Team from "./pages/team/team";
import Contact from "./pages/contact/contact";
import FAQ from "./pages/FAQ/FAQ";
import RegisterCompany from "./pages/user/registercompany";
import Pricing_page from "./components/pricing_page/pricing_page";
import User_db from "./pages/DashboardUser/User_db";
import OffersList from "./components/DashboardUser/OffersList";

import Dashboard from "./pages/Dashboard/Dashboard";
import AcceptCompanyPage from "./pages/DashboardAdmin/Accept_company";
import Company from "./pages/DashboardAdmin/ValidatedCompaniesPage";
import ManageUser from "./pages/DashboardAdmin/UsersPage";
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
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

  return (
    <Provider>
      <UserProvider>
        <ModalProvider>
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
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="user-db" element={<User_db />} />
                  <Route
                    path="register-company"
                    element={<RegisterCompany />}
                  />
                  <Route path="enterprise/:id/services" element={<OffersList />} />
                  <Route path="security" element={<Team />} />
                  <Route path="accept-company" element={<AcceptCompanyPage />} />
                  <Route path="manage-companies" element={<Company />} />
                  <Route path="manage-users" element={<ManageUser />} />

                </Route>
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </ModalProvider>
      </UserProvider>
    </Provider>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
