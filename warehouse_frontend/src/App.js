import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/root/fragments/header/Header";
import Home from "./components/root/home/Home";
import SignUp from "./components/root/users/signUp/SignUp";
import RegisterBusiness from "./components/root/users/signUp/RegisterBusiness";
import Login from "./components/root/users/login/Login";
import UserHome from "./components/root/users/UsersHome";
import TheWarehouse from "./components/root/users/business/Offer/TheWarehouse";
import AccountUser from "./components/root/users/user/accountUser/AccountUser";
import AccountBusiness from "./components/root/users/business/AccountBusiness/AccountBusiness";
import TestForm from "./components/root/users/user/test/TestForm";
import CreateOffer from "./components/root/users/business/Offer/CreateOffer";
import MyTheWarehouses from "./components/root/users/user/MyTheWarehouses";
import ProtectedRoutesGuest from "./components/protectedRoutes/ProtectedRoutesGuest";
import ProtectedRoutesUser from "./components/protectedRoutes/ProtectedRoutesUser";
import ProtectedRoutesBusiness from "./components/protectedRoutes/ProtectedRoutesBusiness";
import EditUserProfile from "./components/root/users/user/accountUser/EditUserProfile";
import EditBusinessProfile from "./components/root/users/business/AccountBusiness/EditBusinessProfile";
import UpdateOffer from "./components/root/users/business/Offer/UpdateOffer";
import PasswordChange from "./components/root/users/login/forgottenPassword/PasswordChange";
import SetUpNewPassword from "./components/root/users/login/forgottenPassword/SetUpNewPassword";
import { Container } from "@mui/material";
import Footer from "./components/root/fragments/footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Container
          maxWidth="xl"
          style={{
            paddingTop: "64px",
            marginTop: "20px",
          }}>
          <Routes>
            <Route element={<ProtectedRoutesGuest />}>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/register-business" element={<RegisterBusiness />} />
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<PasswordChange />} />
              <Route path="/password/:id" element={<SetUpNewPassword />} />
            </Route>
            <Route element={<ProtectedRoutesUser />}>
              <Route path="/edit-profile" element={<EditUserProfile />} />
              <Route path="/user-home" element={<UserHome />} />
              <Route path="/account-user" element={<AccountUser />} />
              <Route path="/test" element={<TestForm />} />
              <Route path="/my-theWarehouses" element={<MyTheWarehouses />} />
              <Route path="/theWarehouse/:id" element={<TheWarehouse />} />
            </Route>

            <Route element={<ProtectedRoutesBusiness />}>
              <Route
                path="/edit-business-profile"
                element={<EditBusinessProfile />}
              />
              <Route path="/edit-offer" element={<UpdateOffer />} />
              <Route path="/business-home" element={<UserHome />} />
              <Route path="/account-business" element={<AccountBusiness />} />
              <Route path="/create-offer" element={<CreateOffer />} />
              <Route path="/account-business" element={<AccountBusiness />} />
              <Route path="/offer/:id" element={<TheWarehouse />} />
            </Route>
          </Routes>
        </Container>

        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
