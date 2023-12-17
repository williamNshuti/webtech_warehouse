import { Container } from "@mui/material";
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin: 0;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <Container maxWidth="xl">
      <FooterContainer>
        <FooterText>© Warehouse 2024. All rights reserved.</FooterText>
      </FooterContainer>
    </Container>
  );
};

export default Footer;
