import { useRouter } from 'next/router';

const useHideNavbar = () => {
  const router = useRouter();
  const path = router.pathname;
  
  // Add paths for pages where the navbar should be hidden
  const hiddenNavbarPaths = ['/login', '/register'];
  
  return hiddenNavbarPaths.includes(path);
};

export default useHideNavbar;
