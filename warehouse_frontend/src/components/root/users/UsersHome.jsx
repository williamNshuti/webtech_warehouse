import React from "react";
import BackgroundHome from "../fragments/background/BackgroundHome";
import HomeDataService from "../../../api/warehouse/HomeDataService";
import AuthenticationService from "../../../api/authentication/AuthenticationService";
import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../../../css/UserHome.module.css";
import style from "../../../css/Footer.module.css";
import Footer from "../fragments/footer/Footer";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import WareHouseCard from "../../../util/WareHouseCard";
import { styled } from "styled-components";

const UserHome = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  const isBusinessLoggedIn = AuthenticationService.isBusinessLoggedIn();
  const [theWarehouses, setTheWarehouses] = useState([]);

  const [welcomeDiv, setWelcomeDiv] = useState({ showDiv: false });

  const handleSort = (value) => (event) => {
    event.preventDefault();

    if (isUserLoggedIn) {
      navigate(`/theWarehouse/${value}`, { state: { id: value } });
    } else if (isBusinessLoggedIn) {
      navigate(`/offer/${value}`, { state: { id: value } });
    }
  };

  useLayoutEffect(() => {
    let unmounted = false;

    HomeDataService().then((response) => {
      if (!unmounted) {
        const updatedData = response?.data.map((location) => {
          const locationImages = [];

          locationImages.push({
            id: location.profileImg_id,
            url: location.profileImgUrl,
          });

          for (let i = 1; i <= 3; i++) {
            const galleryImgUrl = location[`galleryImgUrl${i}`];
            if (galleryImgUrl) {
              locationImages.push({
                id: location[`galleryImg${i}_id`],
                url: galleryImgUrl,
              });
            }
          }

          return {
            ...location,
            locationImages,
          };
        });

        setTheWarehouses(updatedData || []);
        // setTheWarehouses(response?.data || []);
        setWelcomeDiv({ showDiv: false });
      }
      if (!Object.keys(response.data).length) {
        setWelcomeDiv({ showDiv: true });
      }
    });

    return () => {
      unmounted = true;
    };
  }, [isBusinessLoggedIn, isUserLoggedIn]);

  return (
    <Container>
      <CssBaseline />

      <BackgroundHome />

      {theWarehouses && theWarehouses?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            // height: 100,
            overflowY: "scroll",
          }}>
          <Container maxWidth="xl" sx={{ mb: 3 }}>
            <TitleContainer maxWidth="xl">
              <CustomTitle>Offer Lists</CustomTitle>
            </TitleContainer>
            <WareHouseCard data={theWarehouses} handleSort={handleSort} />
          </Container>
        </Box>
      )}
      <main className={styles.theWarehouse_main}>
        <section className={styles.theWarehouse_container_home}>
          {/* {theWarehouses && theWarehouses?.length > 0 && (
            <>
              <section className={styles.cards}>
                {theWarehouses.map((warehouse) => (
                  <div
                    data-testid={warehouse.id}
                    key={warehouse.id}
                    className={styles.rapper}>
                    <Link
                      to="#"
                      onClick={handleSort(warehouse.id)}
                      className={styles.card}
                      id={warehouse.id}>
                      <section className={styles.card_image_container}>
                        <img src={warehouse.profileImgUrl} alt="warehouse" />
                      </section>

                      <section className={styles.card_content}>
                        <p className={styles.card_title}>{warehouse.name}</p>
                        <div className={styles.card_info}>
                          <p className={styles.text_medium}>
                            {" "}
                            Find out more...
                          </p>
                          <p className={styles.card_price}>
                            {warehouse.price} RWF
                          </p>
                        </div>
                      </section>
                    </Link>
                  </div>
                ))}
              </section>
            </>
          )} */}

          {/* {welcomeDiv.showDiv && (
            <div>
              <article className={styles.introduction_home}>
                <div className={styles.intro_text}>
                  {isUserLoggedIn && (
                    <div>
                      <p className={styles.intro}>
                        You have no Warehouse matches.
                      </p>
                      <div className={styles.buttuns}>
                        <button className={styles.link}>
                          <Link to="/test" className={styles.btn}>
                            Discover
                          </Link>
                        </button>
                      </div>
                    </div>
                  )}
                  {isBusinessLoggedIn && (
                    <div>
                      <p className={styles.intro}>You have no offers.</p>
                      <div className={styles.buttuns}>
                        <button className={styles.link}>
                          <Link to="/create-offer" className={styles.btn}>
                            Create Offer
                          </Link>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>
          )} */}
          <>
            {welcomeDiv.showDiv && (
              <CenteredContainer>
                <StyledArticle>
                  <IntroductionText>
                    {isUserLoggedIn && (
                      <>
                        <MessageInformation>
                          You have no Warehouse matches!
                        </MessageInformation>
                        <IntroductionButtons>
                          <CustomButton component={Link} to="/test">
                            Discover
                          </CustomButton>
                        </IntroductionButtons>
                      </>
                    )}
                    {isBusinessLoggedIn && (
                      <>
                        <MessageInformation>
                          You have no offers!
                        </MessageInformation>

                        <IntroductionButtons>
                          <CustomButton component={Link} to="/create-offer">
                            Create Offer
                          </CustomButton>
                        </IntroductionButtons>
                      </>
                    )}
                  </IntroductionText>
                </StyledArticle>
              </CenteredContainer>
            )}
          </>
        </section>
      </main>
    </Container>
  );
};

export default UserHome;

const TitleContainer = styled(Container)`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CustomTitle = styled.h4`
  font-size: 22px;
  font-weight: 900;
  color: #333;
  margin-bottom: 8px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const StyledArticle = styled.article`
  background-color: #ffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IntroductionText = styled.div`
  text-align: center;
`;

const IntroductionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CustomButton = styled(Button)`
  && {
    background-color: #4caf50;
    color: #fff;
  }
  &:hover {
    background-color: rgba(76, 175, 80, 0.8);
  }
`;

const MessageInformation = styled.p`
  font-style: italic;
  color: #2196f3;
  font-size: 16px;
`;
