import { Provider } from 'react-redux';
import { store } from '../store';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { loadUserFromStorage } from '../store/authSlice'; 
import useHideNavbar from '../utils/useHideNavbar';

function MyApp({ Component, pageProps }) {
  const hideNavbar = useHideNavbar();
  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  return (
    <Provider store={store}>
    { !hideNavbar && <Navbar /> }
    <Component {...pageProps} />
  </Provider>
  );
}

export default MyApp;
