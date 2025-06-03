import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
// import Basket from "./Basket";

export default function OtherNavbar() {
    const AuthMember = 1;
    return (
        <div className="other-navbar">
            <Container className="navbar-container">
                <Stack className="menu">
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
                            <NavLink to="/furniture" activeClassName={"underline"}>Furniture</NavLink>
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
                            <NavLink to="/about" activeClassName={"underline"}>Reviews</NavLink>
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
            </Container>
        </div>
    );
}
