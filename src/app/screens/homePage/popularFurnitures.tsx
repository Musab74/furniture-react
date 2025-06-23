import React from "react";
import { useSelector } from "react-redux";
import { retrievePopularFurnitures } from "./selector";
import { serverApi } from "../../../lib/config";
import { Furniture } from "../../../lib/types/furniture";

import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function PopularFurnitures() {
  const furnitures: Furniture[] = useSelector(retrievePopularFurnitures) || [];

  return (
    <section className="bsp-section">
      <Container>
        <Stack className="bsp-products" spacing={3} alignItems="center">
          <h2 className="bsp-title">Recommended Furnitures</h2>
          <Stack className="bsp-cards-frame" direction="row" flexWrap="wrap" spacing={4} justifyContent="center">
            {furnitures.length > 0 ? (
              furnitures.map((furniture) => {
                const imagePath = `${serverApi}/${furniture.furnitureImages[0]}`;
                return (
                  <CssVarsProvider key={furniture._id}>
                    <Card className="bsp-card" sx={{ width: 250, cursor: "pointer" }}>
                      <CardCover
                        sx={{
                          position: "relative",
                          height: 220,
                          borderRadius: "4px",
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
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "#fff",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                            height: 40,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            {furniture.furnitureViews}
                          </Typography>
                          <VisibilityIcon sx={{ fontSize: 20 }} />
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
                          fontSize="lg"
                          textColor="#000"
                          textAlign="center"
                          className="bsp-name"
                        >
                          {furniture.furnitureName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Recommended Furnitures are not available!</Box>
            )}
          </Stack>
          <div className="bsp-more" style={{ textAlign: "center", marginTop: 20 }}>
            <a href="/furniture">
              More Product <span className="arrow">→</span>
            </a>
          </div>
        </Stack>
      </Container>

      <style>
        {`
          .bsp-card:hover .hover-overlay {
            opacity: 1;
          }
        `}
      </style>
    </section>
  );
}
