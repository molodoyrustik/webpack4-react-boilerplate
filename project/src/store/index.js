import storeProd from './configureStore.prod';
import storeDev from './configureStore.dev';

let store = {};
if (process.env.NODE_ENV === 'production') {
  store = storeProd;
} else {
  store = storeDev;
}

export default store;
