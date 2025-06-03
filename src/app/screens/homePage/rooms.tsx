import React from "react";

const rooms = [
  {
    name: "Living Room",
    image: "/img/livingRoom.jpeg",
    bgColor: "#2C2C2C",
  },
  {
    name: "Dining Room",
    image: "/img/diningRoom.jpeg",
    bgColor: "#4C5C45",
  },
  {
    name: "Office Room",
    image: "/img/OfficeRoom.jpeg",
    bgColor: "#2C2C2C",
  },
];

const RoomsSection = () => {
  return (
    <div className="rooms-container">
      <div className="rooms-left">
        {rooms.map((room, index) => (
          <div
            key={room.name}
            className={`room-card ${index === 1 ? "middle-card" : ""}`}
            style={{ backgroundColor: room.bgColor }}
          >
            <img src={room.image} alt={room.name} className="room-img" />
            <span className="room-title">{room.name}</span>
          </div>
        ))}
      </div>
      <div className="rooms-right">
        <h2>Shop by room</h2>
        <p>
          Having a home you love means having furnishing that you’re proud of.
          We are proud to bring you trendy furniture for every room in the
          house, with the added bonus.
        </p>
        <a href="#" className="show-link">
          Show all kinds <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
};

export default RoomsSection;
