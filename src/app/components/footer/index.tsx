import React from "react";
import { Box, Container, Stack, Typography, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const FooterWrapper = styled(Box)`
  width: 100%;
  background: linear-gradient(145deg, #2f2f2f, #3a3a3a);
  color: #e3c08d;
  padding: 60px 0;
`;

const FooterLink = styled(Link)`
  color: #e3c08d;
  text-decoration: none;
  font-size: 16px;
  line-height: 32px;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: translateX(4px);
  }
`;

const SocialIcon = styled(IconButton)`
  color: #e3c08d;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: scale(1.2);
  }
`;

export default function Footer() {
  const authMember = null;

  return (
    <FooterWrapper>
      <Container>
        <Stack direction={{ xs: "column", md: "row" }} spacing={6}>
          <Box flex={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: "#fff" }}>
              Contact Auro
            </Typography>
            <Typography variant="h4" sx={{ mt: 2, fontWeight: 700, color: "#e3c08d" }}>
              Feel free to ask, <br /> we are here for you
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "#c5c8c9", maxWidth: 350 }}>
              We have a passion to deliver furniture for all. Bringing you quality furniture at the best value.
            </Typography>
            <Stack direction="row" spacing={2} mt={3}>
              <SocialIcon>
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon>
                <YouTubeIcon />
              </SocialIcon>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>Sections</Typography>
            <Stack spacing={1}>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/furniture">Furnitures</FooterLink>
              {authMember && <FooterLink to="/orders">Orders</FooterLink>}
              <FooterLink to="/review">Reviews</FooterLink>
              <FooterLink to="/help">My Page</FooterLink>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>Find Us</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>L.</strong> Downtown, Busan
              </Typography>
              <Typography variant="body2">
                <strong>P.</strong> +82 50 678 6574
              </Typography>
              <Typography variant="body2">
                <strong>E.</strong> rmcbaxt@gmail.com
              </Typography>
              <Typography variant="body2">
                <strong>H.</strong> Open 24 hours
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ mt: 6, backgroundColor: "#c5c8c9", opacity: 0.2 }} />

        <Typography
          variant="body2"
          sx={{ textAlign: "center", mt: 3, color: "#c5c8c9" }}
        >
          © {new Date().getFullYear()} Musab Global, All rights reserved.
        </Typography>
      </Container>
    </FooterWrapper>
  );
}
