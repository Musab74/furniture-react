import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import { ReviewsPage } from "./screens/reviewsPage";
import '../css/app.css';
import '../css/navbar.css';
import '../css/footer.css'
import FurnituresPage from "./screens/FurnituresPage";
import UserPage from "./screens/userPage";
import OrdersPage from "./screens/ordersPage";


function App() {
  const location = useLocation(); // qaytarishi object 

  return (
    <div>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path="/furnitures">
          <FurnituresPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/reviews">
          <ReviewsPage />
        </Route>
        <Route exact path="/"> 
          <HomePage />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App;
