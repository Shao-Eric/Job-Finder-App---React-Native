import { createStore, compose, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
//import { persistStore, autoRehydrate } from "redux-persist";
import { Location } from 'expo';
import reducers from '../reducers/index';
import * as actions from '../actions/index';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

Location.setApiKey('AIzaSyCpcxNDWenfCYl5TYwgaTc3kx0az0DH87M');
store.dispatch(actions.checkAuth());
export default store;
