import * as React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Box } from '@mui/material';
import { Favorite, ThumbDown, Star, StarBorder } from '@mui/icons-material';

type ReviewCardProps = {
  productName: string;
  customerName: string;
  customerProfilePic?: string;
  productImage: string;
  rating: number;
  description: string;
};

export default function ReviewCard({
  productName,
  customerName,
  customerProfilePic,
  productImage,
  rating,
  description,
}: ReviewCardProps) {
  const [liked, setLiked] = React.useState<boolean | null>(null); // null, true (liked), false (disliked)

  const handleLike = () => {
    if (liked === null) setLiked(true);
  };

  const handleDislike = () => {
    if (liked === null) setLiked(false);
  };

  const renderStars = (count: number) => {
    return [...Array(5)].map((_, index) =>
      index < count ? <Star key={index} sx={{ color: '#FFD700' }} /> : <StarBorder key={index} sx={{ color: '#ccc' }} />
    );
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative', borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        avatar={
          <Avatar
            src={customerProfilePic || 'https://via.placeholder.com/150'}
            sx={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #eee' }}
          />
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {customerName}
          </Typography>
        }
        subheader={
          <Typography variant="body2" sx={{ color: '#888' }}>
            {productName}
          </Typography>
        }
      />

      <CardMedia component="img" height="180" image={productImage} alt={productName} />

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>{renderStars(rating)}</Box>
        <Typography variant="body2" sx={{ color: '#444' }}>
          {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={handleLike} disabled={liked !== null} aria-label="like">
          <Favorite sx={{ color: liked === true ? 'red' : 'gray' }} />
        </IconButton>
        <IconButton onClick={handleDislike} disabled={liked !== null} aria-label="dislike">
          <ThumbDown sx={{ color: liked === false ? 'blue' : 'gray' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
