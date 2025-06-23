import React, { useEffect } from "react";
import "../../../css/home.css";

import { setPopularFurnitures, setComingSoon } from "./slice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

import { FurnitureCollection, FurnitureStatus } from "../../../lib/enums/furniture.enum"; // Or appropriate enums
import { Furniture } from "../../../lib/types/furniture";
import FurnitureService from "../../services/ProductService";
import PopularFurnitures from "./popularFurnitures";
import HowItWorks from "./howItWorks";
import Statistics from "./statistics";
import Rooms from "./rooms";
import ClientReview from "./clientReview";
import ComingSoon from "./comingSoon";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularFurnitures: (data: Furniture[]) => dispatch(setPopularFurnitures(data)),
  setComingSoon: (data: Furniture[]) => dispatch(setComingSoon(data)),
});

export default function HomePage() {
  const { setPopularFurnitures, setComingSoon } = actionDispatch(useDispatch());

  useEffect(() => {
    const furnitureService = new FurnitureService();

    furnitureService
    .getFurnitures({
        page: 1,
        limit: 4,
        order: "productPrice",
    })
        .then(data => {
            console.log("data passed here", data);

            setPopularFurnitures(data);
        })
        .catch((err) => { throw err })


    // Fetch coming soon furnitures sorted by date or status
    
    furnitureService.getComingSoon(4)
    .then((data) => {
      setComingSoon(data);  // Redux action to store coming soon furnitures
    })
    .catch(err => {
      console.error("Error fetching coming soon furnitures:", err);
    });
  }, [setPopularFurnitures, setComingSoon]);

  return (
    <div className={"homepage"}>
      <Statistics />
      <Rooms />
      <PopularFurnitures />
      <HowItWorks />
      <ClientReview />
      <ComingSoon />
    </div>
  );
}
function dispatch(arg0: { payload: any; type: "homePage/setPopularFurnitures"; }) {
    throw new Error("Function not implemented.");
}

