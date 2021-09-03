import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index";
import logger from "redux-logger";

const appStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export default appStore;
