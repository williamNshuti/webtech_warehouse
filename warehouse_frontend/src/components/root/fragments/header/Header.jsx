import React from "react";
import styles from "../../../../css/Header.module.css";
import Navbar from "./navbar/Navbar";
import Logo from "./logo/Logo";
import { AppBar, Toolbar, Container, Box, Typography } from "@mui/material";
import { flexCenter } from "../../../../themes/commonStyles";
import { SiHotelsdotcom } from "react-icons/si";
import { pink } from "@mui/material/colors";
import { FaShopware } from "react-icons/fa6";

const Header = () => {
  return (
    <AppBar
      position="fixed"
      elevation={3}
      style={{
        background: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Logo />
          {/* <FaShopware size={20} color="red" /> */}

          <Navbar />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
