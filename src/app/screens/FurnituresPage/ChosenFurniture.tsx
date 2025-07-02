import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Furniture } from "../../../lib/types/furniture";
import FurnitureService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";
import { setChosenFurniture, setStore } from "./slice";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveChosenFurniture, retrieveStore } from "./selector";
import { CartItem } from "../../../lib/types/search";
import MemberService from "../../services/memberService";

const actionDispatch = (dispatch: any) => ({
  setStore: (data: Member) => dispatch(setStore(data)),
  setChosenFurniture: (data: Furniture) => dispatch(setChosenFurniture(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenFurniture,
  (chosenFurniture) => ({ chosenFurniture })
);
const storeRetriever = createSelector(
  retrieveStore,
  (store) => ({ store })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenFurniture(props: ChosenProductProps) {
  const { onAdd } = props;
  const { furnitureId } = useParams<{ furnitureId: string }>();
  const { setStore, setChosenFurniture } = actionDispatch(useDispatch());
  const { chosenFurniture } = useSelector(chosenProductRetriever);
  const { store } = useSelector(storeRetriever);

  const [selectedImg, setSelectedImg] = useState<string>("");

  useEffect(() => {
    if (!furnitureId) return;

    const furniture = new FurnitureService();
    furniture.getFurniture(furnitureId).then(data => {
      setChosenFurniture(data);
      if (data.furnitureImages.length > 0) {
        setSelectedImg(`${serverApi}/${data.furnitureImages[0]}`);
      }
    }).catch((err) => console.log(err));

    const member = new MemberService();
    member.getStore().then(data => setStore(data))
      .catch((err) => console.log(err));
  }, [furnitureId]);

  const furniture = chosenFurniture;

  if (!furniture) return <div>Loading furniture details...</div>;

  return (
    <div className="product-detail-container">
      <h1 className="title">FURNITURE DETAIL</h1>
      <div className="product-main">
        <div className="product-image">
          <img src={selectedImg} alt="Main" className="main-img" />
          <div className="thumbnails">
            {furniture.furnitureImages.map((img, index) => (
              <img
                key={index}
                src={`${serverApi}/${img}`}
                alt={`thumb-${index}`}
                className={`thumbnail ${selectedImg === `${serverApi}/${img}` ? "active" : ""}`}
                onClick={() => setSelectedImg(`${serverApi}/${img}`)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h2>{furniture.furnitureName}</h2>
          <p className="collection">FURNITURE COLLECTION</p>
          <p className="category">{furniture.furnitureCollection}</p>
          <p className="views">👁️ {furniture.furnitureViews} views</p>
          <p className="desc-title">FURNITURE DESCRIPTION</p>
          <p className="desc">{furniture.furnitureDesc}</p>
          <p className="price">${furniture.furniturePrice.toLocaleString()}</p>
          <button
            className="add-btn"
            onClick={(e) => {
              onAdd({
                _id: furniture._id,
                quantity: 1,
                name: furniture.furnitureName,
                price: furniture.furniturePrice,
                image: furniture.furnitureImages?.[0] ?? "", // safer here
              });
              e.stopPropagation();
            }}
          >
            ADD TO BASKET
          </button>


        </div>
      </div>
    </div>
  );
}
