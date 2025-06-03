import React from "react";


const products = [
  {
    name: "LED Work Lamp",
    price: "$40",
    image: "/img/black-chair.png",
    rating: 5,
  },
  {
    name: "FEJKA Potted Plant",
    price: "$24",
    image: "https://i.ibb.co/TmDHd2P/plant.png",
    rating: 5,
  },
  {
    name: "FEJKA Potted Plant",
    price: "$80",
    image: "https://i.ibb.co/M87fVmy/chair.png",
    rating: 5,
  },
  {
    name: "MICKE Desk, Black",
    price: "$120",
    image: "https://i.ibb.co/YRjRmDc/desk.png",
    rating: 5,
  },
];

const BestSellingProducts = () => {
  return (
    <section className="bsp-section">
      <h2 className="bsp-title">Best Selling Product</h2>
      <div className="bsp-products">
        {products.map((product, index) => (
          <div className="bsp-card" key={index}>
            <img src={product.image} alt={product.name} className="bsp-img" />
            <h4 className="bsp-name">{product.name}</h4>
            <p className="bsp-price">{product.price}</p>
            <div className="bsp-stars">
              {"★".repeat(product.rating)}
            </div>
          </div>
        ))}
      </div>
      <div className="bsp-more">
        <a href="#">More Product <span className="arrow">→</span></a>
      </div>
    </section>
  );
};

export default BestSellingProducts;
