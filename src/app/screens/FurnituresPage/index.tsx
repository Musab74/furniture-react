import { Container } from "@mui/material";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import React from "react";
import "../../../css/furnitures.css";
import Furnitures from "./Furnitures";
import ProductDetailPage from "./ChosenFurniture";

export default function FurnituresPage() {
    const furniture = useRouteMatch();

    return (
        <div className="products-page">
            <Switch>
                <Route path={`${furniture.path}/:productId`}>
                    <ProductDetailPage></ProductDetailPage>
                </Route> 
                <Route path={`${furniture.path}`}>
                    <Furnitures />
                </Route>
            </Switch>
        </div> 
    );
}
;