import React, { useEffect, useState } from "react";
import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import AnalogClock from "./AnalogClock";
import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import axios from "axios";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/types/search";
import { Furniture } from "../../../lib/types/furniture";

// Define the interface for a furniture item


interface HomeNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    onRemove: (item: CartItem) => void;
    setSignUpOpen: (setSignUpOpen: boolean) => void;
    setLoginOpen: (setLoginOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
}

export function HomeNavbar(props: HomeNavbarProps) {
    const {
        cartItems, onAdd, onDelete, onDeleteAll, onRemove,
        handleCloseLogout, handleLogoutClick, anchorEl, handleLogoutRequest,
        setSignUpOpen, setLoginOpen
    } = props;

    const { authMember } = useGlobals();

    const [featuredFurnitures, setFeaturedFurnitures] = useState<Furniture[]>([]);

    useEffect(() => {
        const getRandomFurnitures = async () => {
            try {
                const response = await axios.get(`${serverApi}/furniture/random`);
                setFeaturedFurnitures(response.data.furnitures); 
            } catch (error) {
                console.error("Failed to fetch random furnitures:", error);
            }
        };

        getRandomFurnitures();
    }, []);

    return (
        <div className="home-navbar">
            <Container className="navbar-container">
                <Stack className="menu">
                    <Box>
                        <NavLink to="/">
                            <p className="brand-name">Auro</p>
                        </NavLink>
                    </Box>

                    <Stack className="links">
                        <Box className={"hover-line"}>
                            <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
                        </Box>
                        <Box className={"hover-line"}>
                            <NavLink to="/furnitures" activeClassName={"underline"}>Furniture</NavLink>
                        </Box>
                        {authMember && (
                            <>
                                <Box className={"hover-line"}>
                                    <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
                                </Box>
                                <Box className={"hover-line"}>
                                    <NavLink to="/member-page" activeClassName={"underline"}>My Page</NavLink>
                                </Box>
                            </>
                        )}
                        <Box className={"hover-line"}>
                            <NavLink to="/reviews" activeClassName={"underline"}>Reviews</NavLink>
                        </Box>

                        <Basket
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            onDeleteAll={onDeleteAll}
                            onRemove={onRemove}
                        />

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClick={handleCloseLogout}
                            onClose={handleCloseLogout}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}                        >
                            <MenuItem
                                onClick={handleLogoutRequest}

                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: 'blue' }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>


                        {!authMember ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={() => setLoginOpen(true)}
                                    className="login-button"
                                >
                                    Login
                                </Button>
                            </Box>
                        ) : (
                            <img
                                className="user-avatar"
                                src={authMember?.memberImage
                                    ? `${serverApi}/${authMember.memberImage}`
                                    : "/img/black-chair.png"}
                                aria-haspopup="true"
                                onClick={handleLogoutClick}
                                alt="User avatar"
                            />
                        )}
                    </Stack>
                </Stack>

                <Stack className="header-frame">
                    <Stack className="detail">
                        <Box className="signup" />
                        {!authMember && (
                            <Button
                                variant="contained"
                                className="signup-button"
                                onClick={() => setSignUpOpen(true)}
                            >
                                Sign Up
                            </Button>
                        )}
                    </Stack>

                    <Box>
                        <AnalogClock />
                    </Box>

                    <Box className="logo-frame">
                        <div className="logo-header">
                            Make a room<br />comfortable &<br />elegant
                        </div>
                    </Box>

                    <Box className="featured-products-container">
                        <Typography className="featured-title">Featured</Typography>

                        {featuredFurnitures.map((item) => (
                            <Box className="featured-card" key={item._id.toString()}>
                                <img className="featured-item-img"
                                    src={`${serverApi}/${item.furnitureImages && item.furnitureImages.length > 0 ? item.furnitureImages[0] : 'default-image.png'}`}
                                    alt={item.furnitureName}
                                />
                                <Typography className="featured-item-name">
                                    {item.furnitureName}
                                </Typography>
                                <Typography className="featured-item-price">
                                    ${item.furniturePrice}
                                </Typography>
                            </Box>
                        ))}

                        <Button className="featured-more-button" variant="contained">
                            More Product
                        </Button>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
