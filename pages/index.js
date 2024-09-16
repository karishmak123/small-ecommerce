import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addItem, setCartItems } from '../store/cartSlice';
import axios from 'axios';
import Link from 'next/link';
import Head from 'next/head';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const cartItems = useSelector(state => state.cart.items);
  const [products, setProducts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      dispatch(setCartItems(JSON.parse(savedCart)));
    }
    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    axios.get('https://fake-api-eight-mu.vercel.app/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('You need to log in to add items to the cart.');
      return;
    }
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Product Listing - My Store</title>
        <meta name="description" content="Browse and purchase products from My Store. Find the best deals and quality items." />
        <meta name="keywords" content="products, shopping, ecommerce" />
      </Head>
      <div style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Product Listing
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.shortdesc}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px 16px' }}>
                  {isProductInCart(product.id) ? (
                    <Button variant="contained" color="success" disabled>
                      Added
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <Link href={`/products/${product.id}`} passHref>
                    <Button variant="outlined" color="secondary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>

  );
};

export default Home;
