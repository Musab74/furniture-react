import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ReviewCard from './ReviewCrad';

// Hardcoded array of reviews
const reviews = [
  {
    id: 1,
    productName: 'Modern Sofa',
    customerName: 'Alice Johnson',
    customerProfilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
    productImage:
      'https://images.unsplash.com/photo-1616628181033-eef68e16f91d?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    description: 'Very comfortable and stylish sofa, fits perfectly in my living room.',
  },
  {
    id: 2,
    productName: 'Wooden Dining Table',
    customerName: 'Bob Smith',
    customerProfilePic: '', // no profile pic, fallback to default
    productImage:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
    rating: 4,
    description: 'Sturdy and beautiful dining table. Assembly was easy.',
  },
  {
    id: 3,
    productName: 'Office Chair',
    customerName: 'Carla Green',
    customerProfilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    productImage:
      'https://images.unsplash.com/photo-1581291519195-ef11498d1cf7?auto=format&fit=crop&w=400&q=80',
    rating: 3,
    description: 'Comfortable chair but a bit pricey.',
  },
  {
    id: 4,
    productName: 'Bookshelf',
    customerName: 'David Lee',
    customerProfilePic: 'https://randomuser.me/api/portraits/men/33.jpg',
    productImage:
      'https://images.unsplash.com/photo-1598300055970-cd20cdad97c9?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    description: 'Great bookshelf, perfect for organizing my books.',
  },
  {
    id: 5,
    productName: 'Bed Frame',
    customerName: 'Eva Brown',
    customerProfilePic: '',
    productImage:
      'https://images.unsplash.com/photo-1600585154226-44b18f8a27d7?auto=format&fit=crop&w=400&q=80',
    rating: 4,
    description: 'Solid bed frame, easy to put together and looks amazing.',
  },
  // Add more as needed
];

export default function ReviewsPage() {
    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          padding: 2,
        }}
      >
        {reviews.map((review, index) => (
          <Box key={index} sx={{ flex: '1 1 calc(25% - 16px)', minWidth: '250px' }}>
            <ReviewCard {...review} />
          </Box>
        ))}
      </Box>
  );
}
