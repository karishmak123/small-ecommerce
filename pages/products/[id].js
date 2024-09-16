import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Grid, Typography, Button, CircularProgress, Alert, Card, CardMedia, CardContent } from '@mui/material';
import { addItem } from '../../store/cartSlice'; 
import styles from '../../styles/ProductDetail.module.css';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); 
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (id) {
      axios.get(`https://small-ecommerce-tau.vercel.app/products/${id}`)
        .then(response => {
          setProduct(response.data);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
          setError('Failed to load product details.');
        });
    }
  }, [id]);

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('You need to log in to add items to the cart.');
      return;
    }
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  if (error) {
    return (
      <Container maxWidth="md" className={styles.container}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" className={styles.container}>
        <CircularProgress />
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Typography variant="h3" component="h1" gutterBottom align="center" className={styles.header}>
        Product Details
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card className={styles.imageCard}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              className={styles.cardMedia}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ${product.price}
              </Typography>

              {isProductInCart(product.id) ? (
                <Button variant="contained" color="success" disabled>
                  Added
                </Button>
              ) : (
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
