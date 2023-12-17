import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// 3rd party
import SwipeableViews from "react-swipeable-views";

// react icons
import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "../themes/commonStyles";
import { Link } from "react-router-dom";

const CarouselCard = ({ location, handleSort }) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = location.locationImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
      }}>
      {location.locationImages.length && (
        <SwipeableViews
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents>
          {location.locationImages.map((step, index) => {
            return (
              <div key={step.id}>
                <Box
                  component="img"
                  sx={carouselImage}
                  src={step.url}
                  alt={step.id}></Box>
              </div>
            );
          })}
        </SwipeableViews>
      )}

      <Box sx={fixedBottom}>
        <MobileStepper
          sx={{ backgroundColor: "transparent" }}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              sx={carouselDot}
              onClick={handleBack}
              disabled={activeStep === 0}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </Box>
      <Link onClick={handleSort(location.id)}>
        <Box sx={flexBetween}>
          <Box sx={{ mt: 2 }}>
            <Typography
              component="h3"
              data-testid="carousel-cards-data"
              sx={createTypographyStyles(16, "monospace")}>
              {" "}
              {location.name}
            </Typography>
            <Typography
              component="h4"
              sx={createTypographyStyles(16, "monospace")}>
              {" "}
              {location?.slogan}
            </Typography>
            <Typography
              component="h4"
              sx={createTypographyStyles(16, "monospace")}>
              {" "}
              {location.location?.name}
            </Typography>
            <Typography
              component="h5"
              sx={createTypographyStyles(16, "monospace")}>
              {" "}
              {`${location?.price?.toLocaleString()} Rwf`}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default CarouselCard;

const createTypographyStyles = () => ({
  fontFamily: "Raleway",
  textTransform: "none",
  fontSize: 13,
});
