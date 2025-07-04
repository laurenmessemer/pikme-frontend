import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminConsole from "./admin/AdminConsole";
import AdminLogin from "./admin/AdminLogin";
import ManageCompetitions from "./admin/Competitions";
import CreateContest from "./admin/CreateContest";
import CreateTheme from "./admin/CreateTheme";
import Engagement from "./admin/Engagement";
import Financial from "./admin/Financial";
import ListAllContests from "./admin/ListAllContests";
import ManageContests from "./admin/ManageContests";
import ManageThemes from "./admin/ManageThemes";
import Platform from "./admin/Platform";
import Reports from "./admin/Reports";
import UX from "./admin/UX";
import Users from "./admin/Users";
import StepFourInviteWrapper from "./competition/StepFourInviteWrapper";
import StepThreeInviteWrapper from "./competition/StepThreeInviteWrapper";
import StepTwoInviteWrapper from "./competition/StepTwoInviteWrapper";
import Join from "./components/Sections/Join";
import MenuSettings from "./components/Sections/MenuSettings";
import TestBackground from "./pages/MobileTest";

import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import ResetPasswordRequest from "./components/Auth/ResetPasswordRequest";
import Signup from "./components/Auth/Signup";
import AuthWarningHandler from "./components/Auth/AuthWarningHandler";
import Live from "./components/Cards/LiveJackpot";
import MySubmissions from "./components/Cards/MySubmission";
import Winners from "./components/Cards/Winners";
import TabsLayout from "./components/Navigation/TabsLayout";
import WalletLanding from "./components/Wallet/WalletLanding";
import PublicRoute from "./components/Routes/PublicRoute";

// ✅ Import Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CompetitionProvider } from "./context/CompetitionContext";
import { WalletProvider } from "./context/WalletContext";

import VerifyEmail from "./components/Auth/VerifyEmail";

import Admin from "./pages/Admin";
import Compete from "./pages/Compete";
import LandingPage from "./pages/LandingPage";
import Leaderboard from "./pages/Leaderboard";
import Vote from "./pages/Vote";
import NotFound from "./pages/NotFound";
import UtilityTemplate from "./utils/UtilityTemplate";

// ✅ Footer Pages
import About from "./components/Sections/About";
import Alerts from "./components/Sections/Alerts";
import FAQ from "./components/Sections/Faq";
import Privacy from "./components/Sections/Privacy";
import Terms from "./components/Sections/Terms";

// ✅ Mobile + Footer
import Mobile from "./pages/Mobile";

// ✅ GeoBlocker
import GeoBlocker from "./components/GeoBlocker";

// ** Third Party Import
import { Toaster } from "react-hot-toast";
import FlaggedUserDetails from "./admin/FlaggedUserDetails";
import ReportDetails from "./admin/ReportDetails";
import ReportedSubmission from "./components/Cards/ReportedSubmission";

function App() {
  return (
    <Router>
      <GeoBlocker />
      <AuthProvider>
        <WalletProvider>
          <CompetitionProvider>
            <AuthWarningHandler />
            <div className="app-shell">
              <Mobile />

              <main className="main-content main-all-page-content-wrapper">
                <Routes>
                  {/* ✅ Main App with Tabs and Footer rendered together */}
                  <Route
                    path="/"
                    element={
                      <>
                        <TabsLayout />
                      </>
                    }
                  >
                    <Route index element={<LandingPage />} />
                    <Route path="compete" element={<Compete />} />
                    <Route path="vote" element={<Vote />} />
                    <Route path="leaderboard" element={<Leaderboard />}>
                      <Route path="MySubmissions" element={<MySubmissions />} />
                      <Route path="Live" element={<Live />} />
                      <Route path="Winners" element={<Winners />} />
                      <Route path="ReportedSubmission" element={<ReportedSubmission />} />
                    </Route>
                    <Route path="admin" element={<Admin />} />
                  </Route>

                  <Route path="/test-bg" element={<TestBackground />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />

                  {/* ✅ Admin Console */}
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route path="/admin-console/*" element={<AdminConsole />}>
                    <Route index element={<ManageThemes />} />
                    <Route path="themes" element={<ManageThemes />} />
                    <Route path="themes/create" element={<CreateTheme />} />
                    <Route path="contests" element={<ManageContests />} />
                    <Route path="contests/create" element={<CreateContest />} />
                    <Route
                      path="competitions"
                      element={<ManageCompetitions />}
                    />
                    <Route path="list-contests" element={<ListAllContests />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="reports/:UserId" element={<ReportDetails />} />
                    <Route path="reports/flagged-user/:UserId" element={<FlaggedUserDetails />} />
                    <Route path="users" element={<Users />} />
                    <Route path="metrics/engagement" element={<Engagement />} />
                    <Route path="metrics/ux" element={<UX />} />
                    <Route path="metrics/financial" element={<Financial />} />
                    <Route path="metrics/platform" element={<Platform />} />
                  </Route>

                  {/* ✅ Auth */}
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <PublicRoute>
                        <Signup />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/reset-password-request"
                    element={<ResetPasswordRequest />}
                  />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />

                  {/* ✅ Footer Pages */}
                  <Route
                    path="/about"
                    element={
                      <UtilityTemplate>
                        <About />
                      </UtilityTemplate>
                    }
                  />
                  <Route
                    path="/faq"
                    element={
                      <UtilityTemplate>
                        <FAQ />
                      </UtilityTemplate>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <UtilityTemplate>
                        <Terms />
                      </UtilityTemplate>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <UtilityTemplate>
                        <Privacy />
                      </UtilityTemplate>
                    }
                  />
                  <Route path="/settings" element={<MenuSettings />} />
                  <Route
                    path="/alerts"
                    element={
                      <UtilityTemplate>
                        <Alerts />
                      </UtilityTemplate>
                    }
                  />

                  {/* ✅ Join Entry Flow */}
                  <Route
                    path="/join"
                    element={
                      <UtilityTemplate>
                        <Join />
                      </UtilityTemplate>
                    }
                  />

                  <Route
                    path="/join/upload/:inviteCode"
                    element={<TabsLayout />}
                  >
                    <Route index element={<StepTwoInviteWrapper />} />
                    <Route
                      path="confirm"
                      element={<StepThreeInviteWrapper />}
                    />
                    <Route path="done" element={<StepFourInviteWrapper />} />
                  </Route>

                  {/* ✅ Wallet Page */}
                  <Route
                    path="/wallet"
                    element={
                      <UtilityTemplate>
                        <WalletLanding />
                      </UtilityTemplate>
                    }
                  />

                  {/* ✅ 404 Not Found Page - Catch all unmatched routes */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            
            <Toaster
              position={"top-center"}
              toastOptions={{ className: "react-hot-toast" }}
              containerClassName="toast-new-container"
              containerStyle={{
                zIndex: "999999999999",
              }}
              reverseOrder={false}
            />
          </CompetitionProvider>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import AdminConsole from "./admin/AdminConsole";
// import AdminLogin from "./admin/AdminLogin";
// import ManageCompetitions from "./admin/Competitions";
// import CreateContest from "./admin/CreateContest";
// import CreateTheme from "./admin/CreateTheme";
// import Engagement from "./admin/Engagement";
// import Financial from "./admin/Financial";
// import ListAllContests from "./admin/ListAllContests";
// import ManageContests from "./admin/ManageContests";
// import ManageThemes from "./admin/ManageThemes";
// import Platform from "./admin/Platform";
// import Reports from "./admin/Reports";
// import UX from "./admin/UX";
// import Users from "./admin/Users";
// import StepFourInviteWrapper from "./competition/StepFourInviteWrapper";
// import StepThreeInviteWrapper from "./competition/StepThreeInviteWrapper";
// import StepTwoInviteWrapper from "./competition/StepTwoInviteWrapper";
// import Join from "./components/Sections/Join";
// import MenuSettings from "./components/Sections/MenuSettings";
// import TestBackground from "./pages/MobileTest";

// import Login from "./components/Auth/Login";
// import ResetPassword from "./components/Auth/ResetPassword";
// import ResetPasswordRequest from "./components/Auth/ResetPasswordRequest";
// import Signup from "./components/Auth/Signup";
// import Live from "./components/Cards/LiveJackpot";
// import MySubmissions from "./components/Cards/MySubmission";
// import Winners from "./components/Cards/Winners";
// import TabsLayout from "./components/Navigation/TabsLayout";
// import WalletLanding from "./components/Wallet/WalletLanding";

// // ✅ Import Context Providers
// import { AuthProvider } from "./context/AuthContext";
// import { CompetitionProvider } from "./context/CompetitionContext";
// import { WalletProvider } from "./context/WalletContext";

// import VerifyEmail from "./components/Auth/VerifyEmail";

// import Admin from "./pages/Admin";
// import Compete from "./pages/Compete";
// import LandingPage from "./pages/LandingPage";
// import Leaderboard from "./pages/Leaderboard";
// import Vote from "./pages/Vote";
// import UtilityTemplate from "./utils/UtilityTemplate";

// // ✅ Footer Pages
// import About from "./components/Sections/About";
// import Alerts from "./components/Sections/Alerts";
// import FAQ from "./components/Sections/Faq";
// import Privacy from "./components/Sections/Privacy";
// import Terms from "./components/Sections/Terms";

// // ✅ Mobile
// import Mobile from "./pages/Mobile";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <WalletProvider>
//           <CompetitionProvider>
//             <div className="app-shell">
//               <Mobile />

//               <main className="main-content">
//                 <Routes>
//                   {/* ✅ Main App with Tabs */}
//                   <Route path="/" element={<TabsLayout />}>
//                     <Route index element={<LandingPage />} />
//                     <Route path="compete" element={<Compete />} />
//                     <Route path="vote" element={<Vote />} />
//                     <Route path="leaderboard" element={<Leaderboard />}>
//                       <Route path="MySubmissions" element={<MySubmissions />} />
//                       <Route path="Live" element={<Live />} />
//                       <Route path="Winners" element={<Winners />} />
//                     </Route>
//                     <Route path="admin" element={<Admin />} />
//                   </Route>

//                   <Route path="/test-bg" element={<TestBackground />} />
//                   <Route path="/verify-email" element={<VerifyEmail />} />

//                   {/* ✅ Admin Console (Separate from Main App) */}
//                   <Route path="/admin-login" element={<AdminLogin />} />
//                   <Route path="/admin-console/*" element={<AdminConsole />}>
//                     <Route index element={<ManageThemes />} />
//                     <Route path="themes" element={<ManageThemes />} />
//                     <Route path="themes/create" element={<CreateTheme />} />
//                     <Route path="contests" element={<ManageContests />} />
//                     <Route path="contests/create" element={<CreateContest />} />
//                     <Route path="competitions" element={<ManageCompetitions />} />
//                     <Route path="list-contests" element={<ListAllContests />} />
//                     <Route path="reports" element={<Reports />} />
//                     <Route path="users" element={<Users />} />
//                     <Route path="metrics/engagement" element={<Engagement />} />
//                     <Route path="metrics/ux" element={<UX />} />
//                     <Route path="metrics/financial" element={<Financial />} />
//                     <Route path="metrics/platform" element={<Platform />} />
//                   </Route>

//                   {/* ✅ Auth */}
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<Signup />} />
//                   <Route path="/reset-password-request" element={<ResetPasswordRequest />} />
//                   <Route path="/reset-password/:token" element={<ResetPassword />} />

//                   {/* ✅ Footer Pages */}
//                   <Route path="/about" element={<UtilityTemplate><About /></UtilityTemplate>} />
//                   <Route path="/faq" element={<UtilityTemplate><FAQ /></UtilityTemplate>} />
//                   <Route path="/terms" element={<UtilityTemplate><Terms /></UtilityTemplate>} />
//                   <Route path="/privacy" element={<UtilityTemplate><Privacy /></UtilityTemplate>} />
//                   <Route path="/settings" element={<MenuSettings />} />
//                   <Route path="/alerts" element={<UtilityTemplate><Alerts /></UtilityTemplate>} />

//                   {/* ✅ Join Entry Flow */}
//                   <Route path="/join" element={<UtilityTemplate><Join /></UtilityTemplate>} />

//                   <Route path="/join/upload/:inviteCode" element={<TabsLayout />}>
//                     <Route index element={<StepTwoInviteWrapper />} />
//                     <Route path="confirm" element={<StepThreeInviteWrapper />} />
//                     <Route path="done" element={<StepFourInviteWrapper />} />
//                   </Route>

//                   {/* ✅ Wallet Page */}
//                   <Route path="/wallet" element={<UtilityTemplate><WalletLanding /></UtilityTemplate>} />
//                 </Routes>
//               </main>
//             </div>
//           </CompetitionProvider>
//         </WalletProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
