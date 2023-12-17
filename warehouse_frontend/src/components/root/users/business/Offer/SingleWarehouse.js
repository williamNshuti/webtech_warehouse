import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Box, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { FiDownload, FiEdit, FiShare, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { flexBetween, dFlex } from "../../../../../themes/commonStyles";

function SingleWareHouseDetails({ data }) {
  return (
    <div className="scrollable">
      <CssBaseline />

      {data && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Box sx={flexBetween}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: "bold",
                }}
                component="h1"
                fontSize={20}>
                {data.name}
              </Typography>
            </Box>
            <Box sx={flexBetween}>
              <Box sx={{ mt: 1 }}>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Typography component="h6"> Introdution:</Typography>

                    <Typography component="h5"> {data.intro}</Typography>
                  </Box>
                </Box>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Typography component="h6"> Slogan:</Typography>

                    <Typography component="h5"> {data.slogan}</Typography>
                  </Box>
                </Box>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Typography component="h6"> Location:</Typography>

                    <Typography component="h5">
                      {" "}
                      {data?.location?.name}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Typography component="h6"> Price:</Typography>

                    <Typography component="h5">
                      {" "}
                      {`${data?.price} Rwf`}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={dFlex}>
                  <Box sx={dFlex}>
                    <Typography component="h6">
                      {" "}
                      For More Information, Contact Us
                    </Typography>

                    <IconButton color="inherit" aria-label="Edit">
                      <FiDownload style={{ color: "blue" }} size={18} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Box sx={dFlex} alignItems="center">
                  <Box sx={dFlex} className="lnk-underline">
                    <FiEdit style={{ color: "green" }} size={18} />
                    <Link href="#" color="inherit">
                      <Typography fontWeight="bold">Edit</Typography>
                    </Link>
                  </Box>

                  <Box sx={dFlex} className="lnk-underline">
                    <FiTrash2 style={{ color: "red" }} size={18} />
                    <Link href="#" color="inherit">
                      <Typography fontWeight="bold">Delete</Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid
                item
                xs={12}
                md={6}
                style={{ display: "flex", justifyContent: "center" }}>
                <Paper>
                  <img
                    src={data.profileImgUrl}
                    alt="Meal-khuj"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <Paper>
                      <img
                        src={data.galleryImgUrl1}
                        alt="Meal-khuj"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <Paper>
                      <img
                        src={data.galleryImgUrl2}
                        alt="Meal-khuj"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <Paper>
                      <img
                        src={data.galleryImgUrl3}
                        alt="Meal-khuj"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ display: "flex", justifyContent: "center" }}>
                    <Paper>
                      <img
                        src={data.profileImgUrl}
                        alt="Meal-khuj"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>{" "}
            </Grid>

            <Box sx={(flexBetween, { mt: 3 })}>
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: "bold",
                }}
                component="h1"
                fontSize={16}>
                WareHouse Description
              </Typography>

              <Box sx={{ mt: 1, mb: 2 }}>
                <Typography component="h3"> {data.description}</Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </div>
  );
}

export default SingleWareHouseDetails;
