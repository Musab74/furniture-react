import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Member } from '../../../lib/types/member';
import { Furniture } from '../../../lib/types/furniture';
import { createSelector } from '@reduxjs/toolkit';
import { setChosenFurniture, setStore } from './slice';
import { retrieveChosenFurniture, retrieveStore } from './selector';
import { CartItem } from '../../../lib/types/search';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import MemberService from '../../services/memberService';

// 🔧 Declare dummy data for thumbnails & related items (replace with actual data later)
const imageArray = [
  "/img/livingR.png",
  "/img/living2.png",
  "/img/living3.png"
];

const relatedFurnitureFurnitures = [
  { image: "/img/related1.png", title: "Modern Chair", price: "$129.99" },
  { image: "/img/related2.png", title: "Wooden Table", price: "$199.99" },
  { image: "/img/related3.png", title: "Cozy Sofa", price: "$299.99" }
];

// Redux dispatcher
const actionDispatch = (dispatch: ReturnType<typeof useDispatch>) => ({
  setStore: (data: Member) => dispatch(setStore(data)),
  setChosenFurniture: (data: Furniture) => dispatch(setChosenFurniture(data)),
});

const chosenFurnitureRetriever = createSelector(
  retrieveChosenFurniture,
  (ChosenFurniture) => ({ ChosenFurniture })
);
const storeRetreiver = createSelector(
  retrieveStore,
  (store) => ({ store })
);

interface ChosenFurnitureProps {
  onAdd: (item: CartItem) => void;
}

const ChosenProduct: React.FC<ChosenFurnitureProps> = ({ onAdd }) => {
  const [selectedImage, setSelectedImage] = useState<string>(imageArray[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviews, setReviews] = useState([
    { user: "John", comment: "Very comfortable and stylish!", rating: 5 },
    { user: "Sara", comment: "Love it, just what I needed.", rating: 4 },
  ]);

  const { furnitureId } = useParams<{ furnitureId: string }>();
  const { setStore, setChosenFurniture } = actionDispatch(useDispatch());
  const { ChosenFurniture } = useSelector(chosenFurnitureRetriever);
  const { store } = useSelector(storeRetreiver);

  useEffect(() => {
    const productService = new ProductService();
    productService.getFurniture(furnitureId)
      .then(data => setChosenFurniture(data))
      .catch(err => console.log(err));

    const memberService = new MemberService();
    memberService.getStore()
      .then(data => setStore(data))
      .catch(err => console.log(err));
  }, [furnitureId]);

  const handleReviewSubmit = () => {
    if (reviewText && reviewRating > 0) {
      setReviews([...reviews, {
        user: "You",
        comment: reviewText,
        rating: reviewRating
      }]);
      setReviewText('');
      setReviewRating(0);
      setShowReviewForm(false);
    }
  };

  if (!ChosenFurniture) return null;

  return (
    <div className="FurnitureFurniture-container">
      <div className='FurnitureFurniture-box'>
        <div className="image-section">
          <img src={selectedImage} alt="FurnitureFurniture" className="main-image" />
          <div className="thumbnail-row">
            {imageArray.map((img, idx) => (
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

          <button className="add-button" onClick={() => onAdd({
            _id: ChosenFurniture._id,
            quantity,
            name: ChosenFurniture.furnitureName,
            price: ChosenFurniture.price,
            image: ChosenFurniture.image,
          })}>Add to Cart</button>

          <div className="shipping-note">
            Free 3–5 day shipping · Tool-free assembly · 30-day trial
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="customer-reviews">
        <h3>Customer Reviews</h3>
        {showReviewForm ? (
          <div className="review-form">
            <h4>Write Your Review</h4>
            <div className="star-input">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  sx={{ cursor: 'pointer', color: i < reviewRating ? '#FFD700' : '#ddd', fontSize: 20 }}
                  onClick={() => setReviewRating(i + 1)}
                />
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              rows={4}
            />
            <div className="form-buttons">
              <button onClick={handleReviewSubmit}>Submit</button>
              <button onClick={() => setShowReviewForm(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet</p>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="review">
                  <strong>{r.user}</strong> - {[...Array(5)].map((_, j) => (
                    <StarIcon key={j} sx={{ color: j < r.rating ? '#FFD700' : '#ddd', fontSize: 16 }} />
                  ))}
                  <p>{r.comment}</p>
                </div>
              ))
            )}
            <button className="write-review-button" onClick={() => setShowReviewForm(true)}>Write a review</button>
          </>
        )}
      </div>

      {/* Related Furniture */}
      <div className="related-FurnitureFurnitures">
        <h3>Related Furnitures</h3>
        <div className="related-grid">
          {relatedFurnitureFurnitures.map((item, idx) => (
            <div className="related-card" key={idx}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.price}</p>
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

export default ChosenProduct;
