import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

const ChosenFurniture: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>("/img/livingR.png");
  const [quantity, setQuantity] = useState<number>(1);
  const reviews = [
    {
      user: "John",
      comment: "Very comfortable and stylish!",
      rating: 5,
    },
    {
      user: "Sara",
      comment: "Love it, just what I needed.",
      rating: 4,
    },
  ];

  const images: string[] = [
    "/img/livingR.png",
    "/img/kitchen.png",
    "/img/livingR.png",
    "/img/livingR.png",
    "/img/livingR.png",
  ];

  const colors: string[] = ['#90a4ae', '#cfd8dc', '#ef9a9a', '#bcaaa4'];

  const relatedProducts = [
    { image: '/img/camera.png', title: 'Camera', price: '$11.70' },
    { image: '/img/headphones.png', title: 'Wireless headphones', price: '$11.70' },
    { image: '/img/controller.png', title: 'Play game', price: '$11.70' },
    { image: '/img/laptop.png', title: 'Tablet as a laptop', price: '$11.70' },
  ];

  return (
    <div className="product-container">
      <div className='product-box'>
      <div className="image-section">
        <img src={selectedImage} alt="Product" className="main-image" />
        <div className="thumbnail-row">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`thumbnail ${selectedImage === img ? 'selected' : ''}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="info-section">
        <h2 className="title">Meryl Lounge Chair</h2>
        <h3 className="price">$149.99</h3>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} sx={{ color: i < 4 ? '#FFD700' : '#ddd', fontSize: 16 }} />
          ))}
          <span className="rating-text">4.6 / 5.0 (556)</span>
        </div>

        <p className="description">
          The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at.
          Also, there’s a tilt and height-adjusting mechanism that’s built to outlast years of ups and downs.
        </p>

        <div className="quantity-controls">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <button className="add-button">Add to Cart</button>
        <div className="shipping-note">
          Free 3–5 day shipping · Tool-free assembly · 30-day trial
        </div>
      </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="customer-reviews">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className="review">
              <strong>{r.user}</strong> - {r.rating}⭐<br />
              <p>{r.comment}</p>
            </div>
          ))
        )}
        <button className="write-review-button">Write a review</button>
      </div>

      {/* Related Products Section */}
      <div className="related-products">
        <h3>Related product</h3>
        <div className="related-grid">
          {relatedProducts.map((product, idx) => (
            <div className="related-card" key={idx}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>{product.price}</p>
              <div className="related-stars">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ color: '#ddd', fontSize: 16 }} />
                ))}
              </div>
              <button className="add-to-cart-button">Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChosenFurniture;
