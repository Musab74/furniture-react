import React from "react";
import { useSelector } from "react-redux";
import { retrievePopularFurnitures } from "./selector";
import { serverApi } from "../../../lib/config";
import { Furniture } from "../../../lib/types/furniture";

import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function PopularFurnitures() {
  const furnitures: Furniture[] = useSelector(retrievePopularFurnitures) || [];

  return (
    <CssVarsProvider>
      <section className="bsp-section">
        <Container>
          <Stack
            className="bsp-products"
            spacing={3}
            alignItems="center"
            sx={{ textAlign: "center" }}
          >
            <h2 className="bsp-title">Recommended Furnitures</h2>
            <Stack
              className="bsp-cards-frame"
              direction="row"
              flexWrap="wrap"
              spacing={4}
              justifyContent="center"
            >
              {furnitures.length > 0 ? (
                furnitures.map((furniture) => {
                  const imagePath = `${serverApi}/${furniture.furnitureImages[0]}`;
                  return (
                    <Link
                      to={`/furnitures/${furniture._id}`}
                      key={furniture._id}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        className="bsp-card"
                        sx={{
                          width: 250,
                          cursor: "pointer",
                          "&:hover .hover-overlay": {
                            opacity: 1,
                          },
                        }}
                      >
                        <CardCover
                          sx={{
                            position: "relative",
                            height: 220,
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={imagePath}
                            alt={furniture.furnitureName}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <Box
                            className="hover-overlay"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              backgroundColor: "#F1F5F1",
                              color: "#000",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 1,
                              height: 40,
                              opacity: 0,
                              transition: "opacity 0.5s ease",
                            }}
                          >
                            <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                              ${furniture.furniturePrice.toLocaleString()}
                            </Typography>
                            <AttachMoneyIcon sx={{ fontSize: 20 }} />
                          </Box>
                        </CardCover>

                        <CardContent
                          sx={{
                            paddingTop: 1,
                            paddingBottom: 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            level="h2"
                            textColor="#000"
                            textAlign="center"
                            sx={{ fontSize: "1.125rem", fontWeight: 600 }}
                            className="bsp-name"
                          >
                            {furniture.furnitureName}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })
              ) : (
                <Box className="no-data">Recommended Furnitures are not available!</Box>
              )}
            </Stack>
            <div className="bsp-more" style={{ textAlign: "center", marginTop: 20 }}>
              <Link to="/furnitures">
                More Products <span className="arrow">→</span>
              </Link>
            </div>
          </Stack>
        </Container>
      </section>
    </CssVarsProvider>
  );
}
