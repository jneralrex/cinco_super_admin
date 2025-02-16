import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Nav from "./components/Nav";
import DashBoard from "./pages/DashBoard";
import UserManagement from "./pages/UserManagement";
import TheatreAdminManagement from "./pages/TheatreAdminManagement";
import Global from "./components/globalController/Global";
import News from "./pages/News";
import Ads from "./pages/Ads";
import GeneralSettings from "./pages/GeneralSettings";
import Report from "./pages/Report";
import VerifyOtp from "./auth/VerifyOtp";
import ResendOtp from "./auth/ResendOtp";
import ForgotPassword from "./auth/ForgotPassword";
import RecoverPassword from "./auth/RecoverPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/otp" element={<VerifyOtp />} />
      <Route path="/resend-otp" element={<ResendOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<RecoverPassword />} />

      <Route element={<Nav />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/cinema-admin" element={<TheatreAdminManagement />} />        
        <Route path="/news" element={<News />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/report" element={<Report />} />
        <Route path="/settings" element={<GeneralSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </Route>
  )
);

const App = () => {
  return (
    <Global>
      <RouterProvider router={router} />
    </Global>
  );
};

export default App;
