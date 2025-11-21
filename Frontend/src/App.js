import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./Register";
import Login from "./Login";
import ForgetPassword from "./userService/Forget";
import ResetPassword from "./userService/ResetPassword";
import ChangePassword from "./userService/ChangePassword";
import VerifyEmail from "./userService/VerifyEmail";
import { Home } from "lucide-react";



function App() {
  const navigate = useNavigate();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/verify" element={<VerifyEmail />} />

      </Routes>
    </>
  );
}

export default App;
