import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { registerReducer } from '../components/auth/register/reducer';
import { loginReducer } from '../components/auth/login/reducer';
import { panelReducer } from '../components/panel/reducer';
import { panelCoursesReducer } from '../components/panelCourses/reducer';
import { panelStudentReducer } from '../components/student/reducer';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
export const history = createBrowserHistory({ basename: baseUrl });

export default function configureStore(history, initialState) {
  const reducers = {
    register: registerReducer,
    login: loginReducer,
    panel: panelReducer,
    panelCourses: panelCoursesReducer,
    panelStudent: panelStudentReducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODEENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    window.devToolsExtension = window.REDUXDEVTOOLSEXTENSION;
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
