import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectFurniturePage = (state: AppRootState) => state.furniturePage;

export const retrieveStore = createSelector(
    selectFurniturePage,
    (FurnituresPage) => FurnituresPage.store);

export const retrieveChosenFurniture = createSelector(
    selectFurniturePage,
    (FurnituresPage) => FurnituresPage.chosenfurniture);

export const retrieveFurnitures = createSelector(
    selectFurniturePage,
    (FurnituresPage) => FurnituresPage.furnitures);