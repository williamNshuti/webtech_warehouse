import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Grid, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import BackgroundHome from "../../../fragments/background/BackgroundHome";
import Footer from "../../../fragments/footer/Footer";
import BusinessDataService from "../../../../../api/users/BusinessDataService";
import DeleteUserService from "../../../../../api/users/DeleteUserService";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";

const AccountContainer = styled(Paper)`
  padding: 40px;
  margin: 20px auto;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const AccountTitle = styled(Typography)`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 3rem;
  color: #333;
`;

const AccountInfo = styled.div`
  margin-bottom: 30px;
`;

const AccountButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  padding: 10px 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const AccountBusiness = () => {
  const navigate = useNavigate();
  const [business, setBusiness] = React.useState({});

  const handleDelete = async () => {
    try {
      await DeleteUserService(business.id);
      AuthenticationService.logout();
    } catch (error) {
      console.error("Error deleting profile", error);
    }
  };

  const handleEdit = () => {
    let path = "/edit-business-profile";
    navigate(path, {
      state: {
        id: business.id,
        businessName: business.businessName,
        address: business.address,
        username: business.username,
        email: business.email,
      },
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BusinessDataService();
        setBusiness(response.data);
      } catch (error) {
        console.error("Error fetching business data", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <>
      <main>
        <BackgroundHome />
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <AccountContainer elevation={3}>
              <AccountTitle style={{ marginBottom: "1rem" }} variant="h1">
                Account Info
              </AccountTitle>
              <Divider />
              <AccountInfo style={{ marginTop: "2rem" }}>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Username:</strong> {business.username}
                </Typography>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Email:</strong> {business.email}
                </Typography>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Business name:</strong> {business.businessName}
                </Typography>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Business address:</strong> {business.address}
                </Typography>
              </AccountInfo>
              <Divider />
              <AccountButtons>
                <StyledButton
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}>
                  Delete
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}>
                  Edit
                </StyledButton>
              </AccountButtons>
            </AccountContainer>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </>
  );
};

export default AccountBusiness;
