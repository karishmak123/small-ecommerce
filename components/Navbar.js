import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { logout } from '../store/authSlice'; 
import { FaUser } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import styles from '../styles/Navbar.module.css';
import CartIcon from './CartIcon';  

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout()); 
    router.push('/login'); 
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <div className={styles.leftSide}>
            <div className={styles.logo}>
             <p>LOGO</p>
            </div>
        </div>
        <div className={styles.rightSide}>
        <CartIcon style={{ color: 'black !important' }} />
          {!isAuthenticated ? (
            <button onClick={() => router.push('/login')} className={styles.navButton}>
              Sign Up
            </button>
          ) : (
            <>
              <button onClick={handleLogout} className={styles.navButton}>
                <RiLogoutCircleLine size={24} />
                <span className={styles.navText}>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
