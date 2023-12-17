import React from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateBusinessDataService from "../../../../../api/users/UpdateBusinessDataService";
import styles from "../../../../../css/Forms.module.css";
import style from "../../../../../css/Footer.module.css";
import { useLocation } from "react-router-dom";
import LoadingDotsDark from "../../login/animation/LoadingDotsDark";
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const EditBusinessProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    id: location.state.id,
    businessName: location.state.businessName,
    address: location.state.address,
    username: location.state.username,
    email: location.state.email,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.username) {
      errors.username = "Invalid username";
    } else if (info.username.length < 5) {
      errors.username = "Minimum 5 char";
    }

    if (!info.businessName) {
      errors.businessName = "Required";
    } else if (info.businessName.length < 2 || info.businessName.length > 90) {
      errors.businessName = "2 to 90 char";
    }

    if (!info.address) {
      errors.address = "Address is required";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid Email";
    }
    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(info);
      setLoading(true);
      await UpdateBusinessDataService(info)
        .then((response) => {
          if (response.status === 201) {
            navigate("/account-business");
          }
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setLoading(false);
      console.log(errors);
    }
  };

  return (
    <>
      <Footer class={style.footer} />
      <Background />

      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            background: "#fff",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 2, fontSize: "1.4 rem" }}>
            Update Profile
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={info.username}
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />

            <TextField
              fullWidth
              id="businessName"
              label="Business Name"
              variant="outlined"
              margin="normal"
              value={info.businessName}
              onChange={(e) =>
                setInfo({ ...info, businessName: e.target.value })
              }
              error={Boolean(errors.businessName)}
              helperText={errors.businessName}
            />

            <TextField
              fullWidth
              id="address"
              label="Address"
              variant="outlined"
              margin="normal"
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              error={Boolean(errors.address)}
              helperText={errors.address}
            />

            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              value={info.email}
              margin="normal"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            {error && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={3}>
                <Typography color="error" align="center" gutterBottom>
                  This business is not exist.
                </Typography>
              </Box>
            )}

            <Grid container justifyContent="center">
              {loading && <LoadingDotsDark />}
              {!loading && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="info"
                  type="submit"
                  sx={{ mt: 2 }}>
                  Save
                </Button>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default EditBusinessProfile;
