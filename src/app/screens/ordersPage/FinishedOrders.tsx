import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Furniture } from "../../../lib/types/furniture";
import { Order, OrderItem } from "../../../lib/types/order";

/** REDUX SLICE & SELECTOR */
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersRetriever);

    return (
        <TabPanel value="3">
            <Stack>
                {finishedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className="order-main-box" style={{ marginRight: "-100px" }}>
                            <Box className="order-box-scroll">
                                {order?.orderItems?.map((item: OrderItem) => {
                                    const furniture: Furniture = order.furnitureDate.filter(
                                        (ele: Furniture) => item.furnitureId === ele._id
                                    )[0];
                                    const imagePath = `${serverApi}/${furniture.furnitureImages[0]}`;

                                    return (
                                        <Box key={item._id} className="orders-name-price">
                                            <img
                                                src={imagePath}
                                                className="order-dish-img"
                                            />
                                            <p className="title-dish">{furniture.furnitureName}</p>
                                            <Box className="price-box">
                                            <p>{"$" + item.itemPrice}</p>                                      
                                            <img src={"/icons/close.svg"} />
                                            <p>${item.itemQuantity}</p>                                    
                                            <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className="total-price-box">
                                <Box className="box-total">
                                    <p>Furniture price</p>
                                    <p>${order.orderTotal - order.orderDelivery}</p>
                                    <img
                                        src={"/icons/plus.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}

                {!finishedOrders || finishedOrders.length === 0 && (
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <img
                            src={"/icons/noimage-list.svg"}
                            style={{ width: 300, height: 300 }}
                        />
                    </Box>
                )}


            </Stack>
        </TabPanel>
    );
}
