import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeItem, updateQuantity } from '../store/cartSlice';
import { IconButton, Badge, Menu, MenuItem, Typography, Button, Divider, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/CartIcon.module.css';

const CartIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className={styles.cartIconContainer}>
      <Tooltip title="View Cart" arrow>
        <IconButton onClick={handleClick} color="primary" size="large">
          <Badge badgeContent={items.length} color="secondary">
          <ShoppingCartIcon sx={{ color: 'black' }} />    
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Shopping Cart
        </Typography>
        <Divider />
        {items.length === 0 ? (
          <MenuItem>Your cart is empty</MenuItem>
        ) : (
          items.map(item => (
            <div key={item.id}>
              <MenuItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                  {item.name} - {item.quantity}
                </Typography>
                <div>
                  <Button
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    sx={{ minWidth: 'auto' }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    sx={{ minWidth: 'auto', mx: 1 }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleRemoveItem(item.id)}
                    color="error"
                    sx={{ minWidth: 'auto' }}
                  >
                    Remove
                  </Button>
                </div>
              </MenuItem>
              <Divider />
            </div>
          ))
        )}
      </Menu>
    </div>
  );
};

export default CartIcon;
