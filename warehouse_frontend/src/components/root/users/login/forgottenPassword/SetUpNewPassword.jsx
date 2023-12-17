import React, { useState } from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import styles from "../../../../../css/Forms.module.css";
import UpdatePasswordService from "../../../../../api/login/forgottenPassword/UpdatePasswordService";
import LoadingDotsDark from "../animation/LoadingDotsDark";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Box,
  CssBaseline,
  Grid,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SetUpNewPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const id = params.id;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState({
    password: "",
    repeatpassword: "",
  });

  const validate = () => {
    const errors = {};

    if (!info.password) {
      errors.password = "A password is required";
    }
    if (!info.repeatpassword) {
      errors.repeatpassword = "Repeat password";
    }
    if (info.password !== info.repeatpassword) {
      errors.repeatpassword = "Passwords don't match";
    }

    return errors;
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const response = await UpdatePasswordService(id, info.password);

      if (response.status === 201) {
        navigate("/login");
      } else {
        setLoading(false);
        console.log(response);
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
            sx={{ mb: 2, fontSize: "1.3rem" }}>
            SET UP NEW PASSWORD
          </Typography>

          <form>
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

            {loading && <LoadingDotsDark />}

            {!loading && (
              <Button
                className={styles.button}
                onClick={updatePassword}
                fullWidth
                variant="contained"
                color="info"
                sx={{ mt: 2 }}>
                Submit
              </Button>
            )}
          </form>
          <Grid container justifyContent="end" alignItems="center">
            <Grid item marginTop={1}>
              <StyledLink to="/login">Back to Login</StyledLink>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer class={styles.footer_cover} />
    </>
  );
};

export default SetUpNewPassword;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: rgba(76, 175, 80, 0.8);
  font-size: 15px;
`;
