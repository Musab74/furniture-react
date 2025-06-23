import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
popularFurnitures: [],
comingSoon: [], 
};

const homePageSlice = createSlice ({
name: "homePage",
initialState,
reducers: {
    setPopularFurnitures : (state, action) => {
        state.popularFurnitures = action.payload // storeda saqlamoqchi bolgan datamiz keladi
    },
    setComingSoon : (state, action) => {
        state.comingSoon = action.payload
    },
   
}
})

export const {setComingSoon, setPopularFurnitures} 
= homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer
export default HomePageReducer;