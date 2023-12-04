import { createStore } from 'redux';
import weatherReducer from './reducers/weatherReducer';

const store = createStore(weatherReducer);

export default store;
