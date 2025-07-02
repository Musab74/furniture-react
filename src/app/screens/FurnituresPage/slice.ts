import { createSlice } from "@reduxjs/toolkit";
import { furnituresPageState } from "../../../lib/types/screen";

const initialState: furnituresPageState = {
    store: null,
    chosenfurniture:null,
    furnitures: [],
    
};

const furniturePageSlice = createSlice({
    name: "furniturePage",
    initialState,
    reducers: {
        setStore: (state, action) => {
            state.store = action.payload;
        },
        setChosenFurniture: (state, action) => {
            state.chosenfurniture = action.payload;
        },
        setFurnitures: (state, action) => {
            state.furnitures = action.payload;
        },
    },
});

export const {setStore, setChosenFurniture, setFurnitures} = 
furniturePageSlice.actions;

const FurniturePageReducer = furniturePageSlice.reducer;
export default FurniturePageReducer;