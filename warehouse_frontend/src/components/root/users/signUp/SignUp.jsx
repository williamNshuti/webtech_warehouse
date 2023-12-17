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
import SignUpAppClientService from "../../../../api/signup/SignUpAppClientService";
import LoadingDotsDark from "../login/animation/LoadingDotsDark";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Background from "../../fragments/background/Background";
import { styled } from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    username: "",
    fullName: "",
    gender: "OTHER",
    email: "",
    password: "",
    repeatpassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.username) {
      errors.username = "Required";
    } else if (info.username.length < 2) {
      errors.username = "Minimum 2 characters";
    }

    if (!info.fullName) {
      errors.fullName = "Required";
    } else if (info.fullName.length < 2 || info.fullName.length > 20) {
      errors.fullName = "2 to 20 characters";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid email address";
    }

    if (!info.password) {
      errors.password = "Required";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Required";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
    }

    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await SignUpAppClientService(info)
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
            sx={{ mb: 2, fontSize: "1.4rem" }}>
            SIGNUP
          </Typography>

          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              id="name"
              label="Username"
              variant="outlined"
              margin="normal"
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />

            <TextField
              fullWidth
              id="fullName"
              label="Full Name"
              variant="outlined"
              margin="normal"
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
            />

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={info.gender === "MALE"}
                      onChange={() => setInfo({ ...info, gender: "MALE" })}
                    />
                  }
                  label="Male"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={info.gender === "FEMALE"}
                      onChange={() => setInfo({ ...info, gender: "FEMALE" })}
                    />
                  }
                  label="Female"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={info.gender === "OTHER"}
                      onChange={() => setInfo({ ...info, gender: "OTHER" })}
                    />
                  }
                  label="Other"
                />
              </Grid>
            </Grid>

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
              </InputLabel>
              <OutlinedInput
                fullWidth
                id="ressetpassword"
                placeholder="Comfirm Password"
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
                  This username or email already exists.
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

export default SignUp;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: rgba(76, 175, 80, 0.8);
  font-size: 15px;
`;
