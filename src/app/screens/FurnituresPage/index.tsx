import { Container } from "@mui/material";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";
import "../../../css/furnitures.css";
import Furnitures from "./Furnitures";
import ProductDetailPage from "./ChosenFurniture";
import { CartItem } from "../../../lib/types/search";

interface FurnituresPageProps {
    onAdd:(item:CartItem) => void;
}


export default function FurnituresPage(props:FurnituresPageProps) {

    const {onAdd} = props;

    const furniture = useRouteMatch();

    return (
        <div className="products-page">
            <Switch>
                <Route path={`${furniture.path}/:furnitureId`}>
                    <ProductDetailPage
                     onAdd={onAdd}
                     ></ProductDetailPage>
                </Route> 
                <Route path={`${furniture.path}`}>
                    <Furnitures 
                    onAdd={onAdd}
                     />
                </Route>
            </Switch>
        </div> 
    );
}
;