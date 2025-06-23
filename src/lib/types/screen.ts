import { Member } from "./member";
import { Furniture } from "./furniture";
import { Order } from "./order";

// React App State

export interface AppRootState {
    homepage:HomePageState;
    furniturePage: furniturePageState;
    ordersPage: OrdersPageState;
}
//HOMEPAGE
export interface HomePageState {
    comingSoon: Furniture[];
    popularFurnitures: Furniture[];
}

//furniture PAGE
export interface furniturePageState {
    store: Member | null;
    furnitures:Furniture[];
    chosenfurniture:Furniture | null;
    
}

//ORDERS PAGE
export interface OrdersPageState{
    pausedOrders:Order[];
    processOrders:Order[];
    finishedOrders:Order[];
}