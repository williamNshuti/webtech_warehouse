import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundHome from "../../../fragments/background/BackgroundHome";
import profileImg from "../../../../../img/2.jpg";
import styles from "../../../../../css/Account.module.css";
import style from "../../../../../css/Footer.module.css";
import layout from "../../../../../css/UserHome.module.css";
import Footer from "../../../fragments/footer/Footer";
import UserDataService from "../../../../../api/users/UserDataService";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import DeleteUserService from "../../../../../api/users/DeleteUserService";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AuthenticationService from "../../../../../api/authentication/AuthenticationService";
import { styled } from "styled-components";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AccountUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleDelete = (event) => {
    event.preventDefault();
    confirmAlert({
      title: "Delete Profile",
      message: "Are you sure you want to delete your profile?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const response = await DeleteUserService(user.id);
            if (response.data !== null) {
              AuthenticationService.logout();
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    let path = "/edit-profile";
    navigate(path, {
      state: {
        id: user.id,
        gender: user.gender,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserDataService();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching business data", error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  return (
    <>
      {/* <main className={layout.theWarehouse_main}>
        <section className={layout.theWarehouse_container_home}>
          <section className={styles.account_container}>
            <img
              className={styles.account_cover}
              src={profileImg}
              alt="profilepic"
            />
            <div className={styles.account_content}>
              <span className={styles.account_title}>
                <b>Account info</b>
              </span>
              <hr className={styles.account_hr}></hr>
              <br></br>
              <p> Username: {user.username} </p>
              <p> Email: {user.email}</p>
              <p> Full Name: {user.fullName} </p>
              <p> Gender: {user.gender} </p>
              <p> Change password: **** </p>
              <br></br>
              <article className={styles.account_buttons}>
                <Link
                  to="#"
                  onClick={handleDelete(user)}
                  className={styles.account_btn}>
                  Delete
                </Link>
                <Link
                  to="#"
                  onClick={handleEdit(user)}
                  className={styles.account_btn}>
                  Edit
                </Link>
              </article>
            </div>
          </section>

          <BackgroundHome />
        </section>
      </main> */}

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
                  <strong>Username:</strong> {user.username}
                </Typography>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Full Name:</strong> {user.fullName}
                </Typography>
                <Typography variant="body1" style={{ margin: "1rem 0rem " }}>
                  <strong>Gender:</strong> {user.gender}
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

export default AccountUser;

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
