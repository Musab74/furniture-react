import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homepage;

export const retrievePopularFurnitures = createSelector(
  selectHomePage,
  (homepage) => homepage.popularFurnitures
);
 
export const retrieveComingSoon = createSelector(
  selectHomePage,
  (homepage) => homepage.comingSoon
);


