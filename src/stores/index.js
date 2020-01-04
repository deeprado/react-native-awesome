import {createStore, applyMiddleware, compose} from 'redux';
import {middleware} from '../utils/redux';
import reducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(middleware),
      typeof window.devToolsExtension === 'function'
        ? window.devToolsExtension()
        : f => f,
    ),
  );
  return store;
}
