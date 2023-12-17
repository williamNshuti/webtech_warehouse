import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import AuthenticationService from "../../../../api/authentication/AuthenticationService";
import LoginService from "../../../../api/login/LoginService";
import AuthenticateUserDataService from "../../../../api/authentication/AuthenticateUserDataService";
import LoadingDotsDark from "./animation/LoadingDotsDark";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Background from "../../fragments/background/Background";
import { styled } from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "warehouse1",
    password: "password",
  });
  const [loginState, setLoginState] = useState({
    hasLoginFailed: false,
    showSuccessMessage: false,
  });

  const validate = () => {
    const errors = {};

    if (!credentials.username) {
      errors.username = "Username required";
    } else if (credentials.username.length < 4) {
      errors.username = "Minimum 4 characters";
    }

    if (!credentials.password) {
      errors.password = "A password is required";
    }

    return errors;
  };

  const loginClicked = async (event) => {
    event.preventDefault();
    let errors = validate(credentials);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      try {
        const res = await AuthenticateUserDataService(
          credentials.username,
          credentials.password
        );

        if (res.status !== 200) {
          setLoading(false);
          setLoginState((prevState) => ({
            ...prevState,
            hasLoginFailed: true,
          }));
          setLoginState((prevState) => ({
            ...prevState,
            showSuccessMessage: false,
          }));
        } else {
          let jwtToken = res.data.jwtToken;
          const token = `Bearer ${jwtToken}`;
          AuthenticationService.setUpToken(token);

          const response = await LoginService(credentials.username, jwtToken);

          if (response.status !== 200) {
            setLoading(false);
            setLoginState((prevState) => ({
              ...prevState,
              hasLoginFailed: true,
            }));
            setLoginState((prevState) => ({
              ...prevState,
              showSuccessMessage: false,
            }));
          } else if (response.data === "USER") {
            AuthenticationService.registerSuccessfulLoginUser(
              credentials.username
            );
            navigate("/user-home");
          } else if (response.data === "BUSINESS_USER") {
            AuthenticationService.registerSuccessfulLoginBusiness(
              credentials.username
            );
            navigate("/business-home");
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Background />

      <CssBaseline />
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
          sx={{ p: 3, width: "100%", background: "rgba(173, 216, 230, 0.7)" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 2, fontSize: "1.4rem" }}>
            LOGIN
          </Typography>

          <form>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              error={Boolean(errors.username)}
              helperText={errors.username}
            />

            <FormControl fullWidth>
              <InputLabel htmlFor="comfirmpassword">Password</InputLabel>
              <OutlinedInput
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
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
                label="Password"
                margin="normal"
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>

            {loginState.hasLoginFailed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={3}>
                <Typography color="error" gutterBottom>
                  Invalid credentials
                </Typography>
              </Box>
            )}

            {loginState.showSuccessMessage && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop={3}>
                <Typography color="success" gutterBottom>
                  Login successful
                </Typography>
              </Box>
            )}
            <Grid container justifyContent="end">
              <Grid item marginTop={2}>
                <StyledLink to="/change-password">Forget Password?</StyledLink>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={loginClicked}
              disabled={loading}
              sx={{
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}>
              {loading ? <LoadingDotsDark /> : "Login"}
            </Button>
          </form>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item marginTop={2}>
              <StyledLink to="/signup">Sign Up?</StyledLink>
            </Grid>
            <Grid item marginTop={2}>
              <StyledLink to="/register-business">
                Register Warehouse ?
              </StyledLink>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Login;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: rgba(76, 175, 80, 0.8);
  font-size: 15px;
`;
