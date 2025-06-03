import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AnalogClock from "./AnalogClock";


export function HomeNavbar() {
    const AuthMember = 1;
    return (
        <div className="home-navbar">
            <Container className="navbar-container">
                <Stack className="menu"
                >
                    <Box>
                        <NavLink to="/">
                            <p className="brand-name">Auro</p>
                        </NavLink>
                    </Box>
                    
                    <Stack
                        className="links"
                    >
                        <Box className={"hover-line"}>
                            <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
                        </Box>
                        <Box className={"hover-line"}>
                            <NavLink to="/furnitures" activeClassName={"underline"}>Furniture</NavLink>
                        </Box>
                        {AuthMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
                            </Box>
                        ) : null}
                        {AuthMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/member-page" activeClassName={"underline"}>My Page</NavLink>
                            </Box>
                        ) : null}
                    
                        <Box className={"hover-line"}>
                            <NavLink to="/reviews" activeClassName={"underline"}>Reviews</NavLink>
                        </Box>

                        {/* Basket */}

                        {!AuthMember ? (<Box><Button variant="contained" className="login-button">Login</Button></Box>) : (
                            <img className="user-avatar"
                                src={"/img/black-chair.png"}
                                aria-haspopup={"true"}
                            />
                        )}

                    </Stack>
                </Stack>
                <Stack className="header-frame">
                    <Stack className="detail">
        
                        <Box className="signup" ></Box>
                        {!AuthMember ? (
                            <Button variant={"contained"}
                                className="signup-button"
                            >
                                Sign Up</Button>) : null}

                    </Stack>
                    <Box>
                        <AnalogClock></AnalogClock>
                    </Box>
                    <Box className="logo-frame">
                        <div className="logo-header">
                            Make a room<br />comfortable &<br />elegant
                        </div>
                    </Box>
                    <Box className="featured-products-container">
                        <Typography className="featured-title">Featured</Typography>

                        <Box className="featured-card">
                            <img src="/img/black-sofa.png" alt="Black Sofa" />
                            <Typography className="featured-item-name">Black Sofa</Typography>
                            <Typography className="featured-item-price">$250</Typography>
                        </Box>

                        <Box className="featured-card">
                            <img src="/img/black-chair.png" alt="Black Chair" />
                            <Typography className="featured-item-name">Black Chair</Typography>
                            <Typography className="featured-item-price">$100</Typography>
                        </Box>

                        <Button className="featured-more-button" variant="contained">
                            More Product
                        </Button>
                    </Box>

                </Stack>
            </Container>
        </div>
    );
}
