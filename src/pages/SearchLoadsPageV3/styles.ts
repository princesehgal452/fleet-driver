
import { fetchRandomValueFromArr } from 'utils/utility';
import searchLoadsLandingPageBg from 'assets/images/searchLoadsLandingPageBg';

const styles = () => ({
  root: {
    backgroundImage: `url(${fetchRandomValueFromArr(searchLoadsLandingPageBg)})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  rootGrandient: {
    background:
    'linear-gradient(360deg, rgba(255,255,255,0) 0%, rgba(26,47,64,0.06) 32.14%, rgba(0,0,0,0.72) 62.23%, #010409 100%)',
  },
});

export default styles;
