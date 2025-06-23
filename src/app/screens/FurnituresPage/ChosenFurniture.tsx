import React, { useEffect, useState } from 'react';
import {Dispatch} from 'redux'
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
import { serverApi } from '../../../lib/config';

const actionDispatch = (dispatch: Dispatch) => ({
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

const ChosenFurniture: React.FC<ChosenFurnitureProps> = ({ onAdd }) => {
  const { furnitureId } = useParams<{ furnitureId: string }>();
  const { setStore, setChosenFurniture } = actionDispatch(useDispatch());
  const { ChosenFurniture } = useSelector(chosenFurnitureRetriever);
  const { store } = useSelector(storeRetreiver);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(0);

  useEffect(() => {
    const productService = new ProductService();
    const memberService = new MemberService();

    productService.getFurniture(furnitureId).then(data => {
      setChosenFurniture(data);
      setSelectedImage(`${serverApi}/${data.furnitureImages[0]}`);
    }).catch(console.error);

    memberService.getStore().then(setStore).catch(console.error);
  }, [furnitureId]);

  if (!ChosenFurniture) return null;

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      _id: ChosenFurniture._id,
      name: ChosenFurniture.furnitureName,
      price: ChosenFurniture.furniturePrice,
      quantity,
      image: `${serverApi}/${ChosenFurniture.furnitureImages[0]}`,
    };
    onAdd(cartItem);
  };

  return (
    <div className="FurnitureFurniture-container">
      <div className='FurnitureFurniture-box'>
        <div className="image-section">
          <img src={selectedImage} alt={ChosenFurniture.furnitureName} className="main-image" />
          <div className="thumbnail-row">
            {ChosenFurniture.furnitureImages.map((img, idx) => (
              <img
                key={idx}
                src={`${serverApi}/${img}`}
                alt={`thumb-${idx}`}
                className={`thumbnail ${selectedImage === `${serverApi}/${img}` ? 'selected' : ''}`}
                onClick={() => setSelectedImage(`${serverApi}/${img}`)}
              />
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2 className="title">{ChosenFurniture.furnitureName}</h2>
          <h3 className="price">₩{ChosenFurniture.furniturePrice.toLocaleString()}</h3>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} sx={{ color: i < 4 ? '#FFD700' : '#ddd', fontSize: 16 }} />
            ))}
            <span className="rating-text">4.6 / 5.0</span>
          </div>

          <p className="description">{ChosenFurniture.furnitureDesc}</p>

          <div className="quantity-controls">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button className="add-button" onClick={handleAddToCart}>Add to Cart</button>
          <div className="shipping-note">
            Free 3–5 day shipping · Tool-free assembly · 30-day trial
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChosenFurniture;
