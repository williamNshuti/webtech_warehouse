import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CarouselCard from "./CourselCard";
import { Typography } from "@mui/material";

const WareHouseCard = ({ data, handleSort }) => {
  return (
    <Box sx={{ mx: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {data.map((res, index) => (
          <React.Fragment key={index}>
            <Grid key={index} item xs={12} sm={4} md={4} lg={3}>
              <CarouselCard location={res} handleSort={handleSort} />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default WareHouseCard;
