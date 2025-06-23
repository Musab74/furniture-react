import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverApi } from "../../../lib/config";
import { Furniture } from "../../../lib/types/furniture";


const ComingSoonFurnitures = () => {
  const [Furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch coming soon Furnitures from backend
    axios
      .get(`${serverApi}/furniture/coming?limit=4`)
      .then((response) => {
        setFurnitures(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load Furnitures.");
        setLoading(false);
        console.error("Error fetching coming soon Furnitures:", err);
      });
  }, []);

  if (loading) {
    return <div>Loading Furnitures...</div>;
  }
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bsp-section">
      <h2 className="bsp-title">Coming Soon ...</h2>
      <div className="bsp-products">
        {Furnitures.map((Furniture) => (
          <div className="bsp-card" key={Furniture._id}>
            <img
              src={`${serverApi}/${Furniture.furnitureImages[0]}`}
              alt={Furniture.furnitureName}
              className="bsp-img"
            />
            <h4 className="bsp-name">{Furniture.furnitureName}</h4>
            <p className="bsp-price">${Furniture.furniturePrice}</p>
            <div className="bsp-stars">{/* You can add stars if needed */}</div>
          </div>
        ))}
      </div>
      <div className="bsp-more">{/* Optional more Furnitures link */}</div>
    </section>
  );
};

export default ComingSoonFurnitures;
