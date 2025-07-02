import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import FurniturePageReducer from "./screens/FurnituresPage/slice";
import OrdersPageReducer from "./screens/ordersPage/slice";

export const store = configureStore({
  reducer: {
    homepage: HomePageReducer, 
    furniturePage:FurniturePageReducer,
    ordersPage:OrdersPageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
