import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Grid,
  CssBaseline,
  Paper,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import RegisterBusinessService from "../../../../api/signup/RegisterBusinessService";
import LoadingDotsDark from "../login/animation/LoadingDotsDark";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Background from "../../fragments/background/Background";
import { styled } from "styled-components";

const RegisterBusiness = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    businessName: "",
    address: "",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.username) {
      errors.username = "Invalid username";
    } else if (info.username.length < 2) {
      errors.username = "Minimum 2 char";
    }

    if (!info.businessName) {
      errors.businessName = "Invalid name";
    } else if (info.businessName.length < 2 || info.businessName.length > 20) {
      errors.businessName = "2 to 20 char";
    }

    if (!info.address) {
      errors.address = "Invalid Address";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid Email";
    }

    if (!info.password) {
      errors.password = "Invalid Password";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Repeate password";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
    }

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await RegisterBusinessService(info)
        .then((response) => {
          if (response.status === 201) {
            navigate("/login");
          }
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Background />
      <CssBaseline />
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            background: "rgba(173, 216, 230, 0.7)",
          }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 2, fontSize: "1.4 rem" }}>
            Register Warehouse
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
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
              margin="normal"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <FormControl
              fullWidth
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <InputLabel htmlFor="password">Password</InputLabel>

              <OutlinedInput
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                value={info.password}
                placeholder="Enter Password"
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                margin="normal"
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>

            <FormControl
              fullWidth
              sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <InputLabel htmlFor="comfirmpassword">
                Comfirm Password
              </InputLabel>{" "}
              <OutlinedInput
                fullWidth
                id="repeatpassword"
                placeholder="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={info.repeatpassword}
                onChange={(e) =>
                  setInfo({ ...info, repeatpassword: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                error={Boolean(errors.repeatpassword)}
                helperText={errors.repeatpassword}
              />
            </FormControl>

            {error && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={3}>
                <Typography color="error" align="center" gutterBottom>
                  This username, business name, or email already exists.
                </Typography>
              </Box>
            )}

            <Grid container justifyContent="center">
              {loading && <LoadingDotsDark />}
              {!loading && (
                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  type="submit"
                  sx={{ mt: 2 }}>
                  Sign up
                </Button>
              )}
            </Grid>
          </form>

          <Grid container justifyContent="center">
            <Grid item marginTop={2}>
              <StyledLink to="/login">Have an account? Login</StyledLink>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default RegisterBusiness;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: rgba(76, 175, 80, 0.8);
  font-size: 15px;
`;
