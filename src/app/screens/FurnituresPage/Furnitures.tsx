import { Box, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Furniture } from "../../../lib/types/furniture";
import FurnitureService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";

// Room category definition


const categories: { label: string; value: RoomCategory | "ALL"; img: string }[] = [
  { label: "All", value: "ALL", img: "/img/all.png" },
  { label: "Bedroom", value: "BEDROOM", img: "/img/bedroom.png" },
  { label: "Living Room", value: "LIVING_ROOM", img: "/img/livingR.png" },
  { label: "Dining Room", value: "DINING_ROOM", img: "/img/kitchen.png" },
  { label: "Office", value: "OFFICE", img: "/img/office.png" },
  { label: "Outdoor", value: "OUTDOOR", img: "/img/outdoor.png" },
];

type RoomCategory = "BEDROOM" | "LIVING_ROOM" | "DINING_ROOM" | "OFFICE" | "OUTDOOR";

const FurnitureList: React.FC = () => {
  const [filter, setFilter] = useState<RoomCategory | "ALL">("ALL");
  const [furnitureData, setFurnitureData] = useState<Furniture[]>([]);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const collection = queryParams.get("collection") as RoomCategory | null;

  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const service = new FurnitureService();
        const response = await service.getFurnitures({
          page: 1,
          limit: 20,
          order: "createdAt",
        });
        setFurnitureData(response);
        if (collection) setFilter(collection);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      }
    };
    fetchFurniture();
  }, [collection]);

  const filteredFurniture =
    filter === "ALL"
      ? furnitureData
      : furnitureData.filter((item) => item.furnitureCollection === filter);

  const handleAddToCart = (item: Furniture) => {
    dispatch(
      addToCart({
        _id: item._id,
        name: item.furnitureName,
        image: item.furnitureImages[0],
        quantity: 1,
        price: item.furniturePrice,
      })
    );
  };

  const handleCardClick = (id: string) => {
    history.push(`/furnitures/${id}`);
  };

  return (
    <div className="furniture-list-container">
      <h2 className="section-title">Furnitures</h2>

      <div className="category-menu">
        {categories.map((cat) => (
          <div
            key={cat.value}
            className={`category-item ${filter === cat.value ? "active" : ""}`}
            onClick={() => setFilter(cat.value)}
          >
            <img src={cat.img} alt={cat.label} />
            <span>{cat.label}</span>
          </div>
        ))}
      </div>

      <div className="furniture-grid">
        {filteredFurniture.map((item) => (
          <div key={item._id} className="furniture-card">
            <img
              src={`${serverApi}/${item.furnitureImages[0]}`}
              alt={item.furnitureName}
              onClick={() => handleCardClick(item._id)}
              style={{ cursor: "pointer" }}
            />
            <h3>{item.furnitureName}</h3>
            <p className="price">₩{item.furniturePrice.toLocaleString()}</p>
            <div className="stars">
              {"★".repeat(item.furnitureRanking)}
              {"☆".repeat(5 - item.furnitureRanking)}
            </div>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26078.425809920423!2d129.06004480000001!3d35.21137005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35689386d85735e5%3A0x30705de360d66384!2sGeumgang%20Park!5e0!3m2!1sen!2skr!4v1745417113716!5m2!1sen!2skr"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default FurnitureList;
function addToCart(arg0: { _id: string; name: string; image: string; quantity: number; price: number; }): any {
  throw new Error("Function not implemented.");
}

