import { Box, Stack } from "@mui/material";
import Container from "@mui/material/Container";
import React, { useState } from "react";

type RoomCategory = "BEDROOM" | "LIVING_ROOM" | "DINING_ROOM" | "OFFICE" | "OUTDOOR";

type FurnitureItem = {
  id: number;
  name: string;
  price: number;
  rating: number;
  room: RoomCategory;
  image: string;
};

const furnitureData: FurnitureItem[] = [
  { id: 1, name: "Shell Curve Chair", price: 12500, rating: 4, room: "LIVING_ROOM", image: "/img/livingR.png" },
  { id: 2, name: "Modern Office Chair", price: 11500, rating: 5, room: "OFFICE", image: "/img/office.png" },
  { id: 3, name: "Rattan Lounger", price: 12500, rating: 5, room: "OUTDOOR", image: "/img/outdoor.png" },
  { id: 4, name: "Petal Throne", price: 12500, rating: 5, room: "BEDROOM", image: "/img/bedroom.png" },
  { id: 5, name: "Butterfly Lounge", price: 12500, rating: 5, room: "LIVING_ROOM", image: "/img/diningRoom.jpeg" },
  { id: 6, name: "C Swirl Chair", price: 12500, rating: 4, room: "DINING_ROOM", image: "/img/diningRoom.jpeg"},
];

const categories: { label: string; value: RoomCategory | "ALL"; img: string }[] = [
  { label: "All", value: "ALL", img: "/img/all.png" },
  { label: "Bedroom", value: "BEDROOM", img: "/img/bedroom.png" },
  { label: "Living Room", value: "LIVING_ROOM", img: "/img/livingR.png" },
  { label: "Dining Room", value: "DINING_ROOM", img: "/img/kitchen.png" },
  { label: "Office", value: "OFFICE", img: "/img/office.png"  },
  { label: "Outdoor", value: "OUTDOOR", img: "/img/outdoor.png" },
];

const FurnitureList: React.FC = () => {
  const [filter, setFilter] = useState<RoomCategory | "ALL">("ALL");

  const filteredFurniture =
    filter === "ALL" ? furnitureData : furnitureData.filter((item) => item.room === filter);

  return (
    <div className="furniture-list-container">
      <h2 className="section-title">Best Selling Items</h2>

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
          <div key={item.id} className="furniture-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">₩{item.price.toLocaleString()}</p>
            <div className="stars">{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</div>
            <button>Add to Cart</button>
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
