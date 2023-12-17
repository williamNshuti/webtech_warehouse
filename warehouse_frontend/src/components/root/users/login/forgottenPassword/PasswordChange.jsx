import React, { useState } from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import styles from "../../../../../css/Forms.module.css";
import UserEmailDataService from "../../../../../api/users/UserEmailDataService";
import LoadingDotsDark from "../animation/LoadingDotsDark";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";

const PasswordChange = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [found, setFound] = useState(true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const sentClicked = async (event) => {
    event.preventDefault();
    let errors = validate(email);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const res = await UserEmailDataService(email);
      if (res.status === 200) {
        setSent(true);
        setFound(true);
      } else {
        setLoading(false);
        setFound(false);
      }
    }
  };

  return (
    <>
      <Background />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          overflow: "hidden",
        }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            background: "rgba(173, 216, 230, 0.7)",
          }}>
          {!found && (
            <div className={styles.midErrors}>
              User with this email doesn't exist
            </div>
          )}

          {!sent && (
            <>
              <TextField
                fullWidth
                id="email"
                label="Your email"
                variant="outlined"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />

              {loading && <LoadingDotsDark className={styles.dots} />}

              {!loading && (
                <Button
                  className={styles.button}
                  onClick={sentClicked}
                  fullWidth
                  variant="contained"
                  color="info"
                  sx={{ mt: 2 }}>
                  Submit
                </Button>
              )}
            </>
          )}
          {sent && (
            <div>
              <div className={styles.form_field}>
                <section className={styles.name_section}>
                  <span className={styles.content_name}>
                    Thank you, please check your email.
                  </span>
                </section>
              </div>
            </div>
          )}

          <Grid container justifyContent="center" marginTop={2}>
            <StyledLink to="/login">Have an account? Login</StyledLink>
          </Grid>
        </Paper>
      </Container>
      <Footer class={styles.footer_cover} />
    </>
  );
};

export default PasswordChange;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: rgba(76, 175, 80, 0.8);
  font-size: 15px;
`;
