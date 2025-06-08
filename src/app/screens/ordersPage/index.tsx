import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/joy";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";

export default function OrdersPage() {
    const [value, setValue] = useState("1");

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className="order-page">
            <Container className="order-container">
                <Stack className="order-list">
                    <TabContext value={value}>
                        <Box className="order-nav-frame">
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    className="table_list"
                                >
                                    <Tab label="Paused orders" value={"1"} />
                                    <Tab label="Process orders" value={"2"} />
                                    <Tab label="Finished orders" value={"3"} />
                                </Tabs>
                            </Box>
                        </Box>
                        <Stack className="order-main-content">
                            <PausedOrders />
                            <ProcessOrders />
                            <FinishedOrders />
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className="orders-right">
                    {/* User info box */}
                    <Box className="order-info-box">
                        <Box className="member-box">
                            <div className="order-user-img">
                                <img
                                    src="/icons/default-user.svg"
                                    className="order-user-avatar"
                                    alt="User Avatar"
                                />
                                <div className="order-user-icon-box">
                                    <img
                                        src="/icons/user-badge.svg"
                                        className="order-user-prof-img"
                                        alt="User Badge"
                                    />
                                </div>
                            </div>
                            <span className="order-user-name">Justin</span>
                            <span className="order-user-prof">User</span>
                        </Box>
                        <Box className="liner"></Box>
                        <Box className="order-user-address">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <LocationOnIcon />
                                <span style={{ marginLeft: "5px" }}>South Korea, Busan</span>
                            </div>
                        </Box>
                    </Box>

                    {/* Payment info box */}
                    <Box className="payment-info-box">
                        <Box className="payment-input">
                            <input
                                type="text"
                                placeholder="Card number : 5243 4090 2002 7495"
                                className="payment-input-field"
                                readOnly
                            />
                        </Box>
                        <Box className="payment-input-row">
                            <input
                                type="text"
                                placeholder="07 / 24"
                                className="payment-input-half"
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="CVV : 010"
                                className="payment-input-half"
                                readOnly
                            />
                        </Box>
                        <Box className="payment-input">
                            <input
                                type="text"
                                placeholder="Justin Robertson"
                                className="payment-input-field"
                                readOnly
                            />
                        </Box>
                        <Box className="payment-methods">
                            <img src="/icons/western-card.svg" alt="Western Union" className="payment-method-icon" />
                            <img src="/icons/master-card.svg" alt="MasterCard" className="payment-method-icon" />
                            <img src="/icons/paypal-card.svg" alt="PayPal" className="payment-method-icon" />
                            <img src="/icons/visa-card.svg" alt="Visa" className="payment-method-icon" />
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
