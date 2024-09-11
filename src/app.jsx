import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Provider } from "jotai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateRefreshToken } from "./services/checkToken";
import { useSocketIo } from "./services/UseSocketIo";

// Context Providers
import { UserProvider } from "./context/UserContext";
import { ModalProvider } from "./context/ModalContext";
import ScrollToTop from "./context/Scrolltotop";

// Components
import ParticlesDemo from "./components/ParticlesDemo";
import NavBar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import SocialLinks from "./components/SocialLinks/sociallinks";
import UserChoiceModal from "./components/home/UserChoiceModal";
import Pricing_page from "./components/pricing_page/pricing_page";
// Pages
import HomeClient from "./pages/home/HomeClient";
import HomeEnterprise from "./pages/home/HomeEntreprise";
import Team from "./pages/team/team";
import Contact from "./pages/contact/contact";
import SearchEntreprise from "./pages/searchentreprises/SearchEntreprise";
import FAQ from "./pages/FAQ/FAQ";
import RegisterCompany from "./pages/user/registercompany";
import EnterprisePage from "./pages/EnterpriseShow/EnterpriseShow";
import CookieBanner from "./pages/NotificationBanner/NotificationBanner";
import CookiePolicies from "./pages/Policies/CookiePolicies";
import LegalNotices from "./pages/Policies/LegalNotices";
import ConfidentialityPolicies from "./pages/Policies/ConfidentialityPolicies";
import UsagePolicies from "./pages/Policies/UsagePolicies";

// User Pages
import Signup from "./components/User/signup";
import Signin from "./components/User/signin";
import UpdateCompany from "./pages/user/updatecompany";

// Dashboard Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import User_db from "./pages/DashboardUser/User_db";
import AcceptCompanyPage from "./pages/DashboardAdmin/Accept_company";
import Company from "./pages/DashboardAdmin/ValidatedCompaniesPage";
import ManageUser from "./pages/DashboardAdmin/UsersPage";
import DeleteAccount from "./components/DashboardUser/DeleteAccount";
import UpdatePassWord from "./components/DashboardUser/UpdatePassword";
import ForgotPasswordForm from "./pages/user/ForgotPassword.jsx";
import ResetPassword from "./pages/user/ResetPassword";
import Planning from "./pages/user/Planning";
import StatsEnterprises from "./pages/DashboardEnterprise/StatsEnterprises";
import Admindb from "./pages/DashboardAdmin/Admin_db";
import CreateJobsandCountry from "./pages/DashboardAdmin/CreateJobsandCountry";
import AdminDashboard from "./pages/DashboardAdmin/Admin_db";
import SubscriptionManagement from "./pages/DashboardAdmin/SubscriptionManagement";

// Protected Routes
import AuthenticatedRoute from "./context/AuthenticatedRoute";
import EntrepreneurRoute from "./context/EntrepreneurRoute";
import AdminRoute from "./context/AdminRoute";
import OfferList from "./components/DashboardEnterprise/OffersList";
import ReservationsList from "./components/DashboardEnterprise/ReservationsList";

function App() {
  useSocketIo();

  useEffect(() => {
    const checkAuth = async () => {
      await validateRefreshToken();
    };
    checkAuth();
  }, []);

  return (
    <Provider>
      <UserProvider>
        <ModalProvider>
          {/* BrowserRouter doit encapsuler tout le rendu */}
          <BrowserRouter>
            <ScrollToTop />
            <AppContent /> {/* Déplacement du contenu principal ici */}
            <ToastContainer />
          </BrowserRouter>
        </ModalProvider>
      </UserProvider>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();
  const [isDashboardRoute, setIsDashboardRoute] = useState(false);

  // Utilise useEffect pour surveiller les changements de route
  useEffect(() => {
    // Vérifie si la route commence par '/dashboard'
    setIsDashboardRoute(location.pathname.startsWith("/dashboard"));
  }, [location.pathname]); // Dépendance : déclenche lorsque location.pathname change

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <ParticlesDemo />
      <CookieBanner />
      <main
        className={
          isDashboardRoute
            ? ""
            : "flex-1 lg:container mx-auto 2xl:w-5/6 w-full "
        }
      >
        <Routes>
          <Route path="/" element={<UserChoiceModal />} />
          <Route path="/home-client" element={<HomeClient />} />
          <Route path="/home-enterprise" element={<HomeEnterprise />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/about" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/searchentreprise" element={<SearchEntreprise />} />
          <Route path="/cookie-policies" element={<CookiePolicies />} />
          <Route path="/legal-notices" element={<LegalNotices />} />
          <Route
            path="/condifentiality-policies"
            element={<ConfidentialityPolicies />}
          />
          <Route path="/usage-policies" element={<UsagePolicies />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/pricing" element={<Pricing_page />} />
          <Route path="/enterprise/:id" element={<EnterprisePage />} />
          <Route path="forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Routes protégées pour les utilisateurs authentifiés */}
          <Route element={<AuthenticatedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="user-db" element={<User_db />} />
              <Route path="register-company" element={<RegisterCompany />} />
              <Route path="update-password" element={<UpdatePassWord />} />
              <Route path="deleteAccount" element={<DeleteAccount />} />
              {/* Routes protégées pour les entrepreneurs */}
              <Route element={<EntrepreneurRoute />}>
                <Route
                  path="enterprise/:enterpriseId/edit"
                  element={<UpdateCompany />}
                />
                <Route path="enterprise/:id/offer" element={<OfferList />} />
                <Route path="enterprise/:id/planning" element={<Planning />} />
                <Route path="enterprise/:id/reservations" element={<ReservationsList />} />
                <Route
                  path="enterprise/:id/dashboard"
                  element={<StatsEnterprises />}
                />
              </Route>
              {/* Routes protégées pour les administrateurs */}
              <Route element={<AdminRoute />}>
                <Route path="accept-company" element={<AcceptCompanyPage />} />
                <Route path="manage-companies" element={<Company />} />
                <Route path="manage-users" element={<ManageUser />} />
                <Route
                  path="jobsandcountrycreate"
                  element={<CreateJobsandCountry />}
                />
                <Route path="admin-overview" element={<AdminDashboard />} />
                <Route path="admin-db" element={<Admindb />} />
                <Route
                  path="jobsandcountrycreate"
                  element={<CreateJobsandCountry />}
                />
                <Route path="subscriptionmanagement" element={<SubscriptionManagement />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
      <SocialLinks />
    </div>
  );
}

export default App;
