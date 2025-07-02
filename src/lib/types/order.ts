import { OrderStatus } from "../enums/order.enum";
import { Furniture } from "./furniture";

export interface OrderItem {
    _id: string;
    itemQuantity:number;
    itemPrice: number;
    orderId: string;
    furnitureId: string;
    createAt:Date;
    updatedAt:Date;
}

export interface Order{
    _id: string;
    orderTotal: number;
    orderDelivery: number;
    ordetStatus: OrderStatus;
    memberId: string;
    createAt: Date;
    updatedAt: Date;
    // From aggregations
    orderItems:[];
    furnitureDate: Furniture[];
}

export interface OrderItemInput {
    itemQuantity: number,
    itemPrice: number,
    furnitureId:string,
    orderId?:string;
}

export interface OrderInquiry {
    page:number,
    limit:number,
    orderStatus: OrderStatus;
}

export interface OrderUpdateInput {
    orderId: string;
    orderStatus: OrderStatus;
}