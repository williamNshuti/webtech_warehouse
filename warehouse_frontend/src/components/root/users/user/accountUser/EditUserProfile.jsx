import React from "react";
import Footer from "../../../fragments/footer/Footer";
import Background from "../../../fragments/background/Background";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../../../css/Forms.module.css";
import style from "../../../../../css/Footer.module.css";
import { useLocation } from "react-router-dom";
import UpdateUserDataService from "../../../../../api/users/UpdateUserDataService";
import LoadingDotsDark from "../../login/animation/LoadingDotsDark";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [error, setError] = useState(false);
  const [checked, setCheckBoxChecked] = useState("other");
  const [info, setInfo] = useState({
    id: location.state.id,
    fullName: location.state.fullName,
    gender: location.state.gender,
    username: location.state.username,
    email: location.state.email,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!info.fullName) {
      errors.fullName = "Required";
    } else if (info.fullName.length < 2 || info.fullName.length > 70) {
      errors.fullName = "2 and 70 char";
    }

    if (!info.username) {
      errors.username = "Required";
    } else if (info.username.length < 2) {
      errors.username = "Minimum 2 characters";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let errors = validate(info);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await UpdateUserDataService(info)
        .then((response) => {
          if (response.status === 201) {
            navigate("/account-user");
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
      {/* <main className={styles.form_style}>
        <h2>Edit account</h2>

        <form id="userInfo" onSubmit={submitHandler}>
          <section className={styles.form_field}>
            <input
              defaultValue={location.state.fullName}
              type="text"
              name="name"
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
            />
            <label htmlFor="name" className={styles.label_name}>
              <span className={styles.content_name}>Full Name</span>
              {errors.fullName && (
                <small className={styles.errors}>Invalid Full Name</small>
              )}
            </label>
          </section>

          <section className={styles.form_field_radio}>
            <section className={styles.name_section}>
              <label id="gender" className={styles.label_name}>
                <span className={styles.content_name}>Gender</span>
              </label>
            </section>
            <section className={styles.checkbox_choice_section}>
              <input
                onClick={() => setCheckBoxChecked("male")}
                onChange={(e) => setInfo({ ...info, gender: "MALE" })}
                checked={checked === "male"}
                type="checkbox"
                id="checkbox1"
              />
              <label className={styles.checkbox} htmlFor="checkbox1">
                Male
              </label>
              <input
                onClick={() => setCheckBoxChecked("female")}
                onChange={(e) => setInfo({ ...info, gender: "FEMALE" })}
                checked={checked === "female"}
                type="checkbox"
                id="checkbox2"
              />
              <label className={styles.checkbox} htmlFor="checkbox1">
                Female
              </label>
              <input
                onClick={() => setCheckBoxChecked("other")}
                onChange={(e) => setInfo({ ...info, gender: "OTHER" })}
                checked={checked === "other"}
                type="checkbox"
                id="checkbox3"
              />
              <label className={styles.checkbox} htmlFor="checkbox1">
                Other
              </label>
            </section>
          </section>

          <article className={styles.form_field}>
            {loading && <LoadingDotsDark />}

            {!loading && (
              <button id="button" type="submit" className={styles.button}>
                Save
              </button>
            )}
          </article>
        </form>
      </main> */}

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
              id="fullName"
              label="Full Names"
              variant="outlined"
              margin="normal"
              value={info.fullName}
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
                  This User does not exist.
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
      <Footer class={style.footer} />
      <Background />
    </>
  );
};

export default EditUserProfile;
