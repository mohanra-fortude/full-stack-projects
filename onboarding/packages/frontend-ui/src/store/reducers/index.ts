import { combineReducers } from "redux";
import { AppType } from "../../types";
import userReducer from "./UserReducer";
import loadingReducer from "./LoadingReducer";
import emailReducer from "./EmailReducer";
import forgotReducer from "./ForgotTokenReducer";
import getReducer from "./GetReducr";

const rootReducer = combineReducers<AppType>({
  userSession: userReducer,
  loading: loadingReducer,
  emailError: emailReducer,
  forgotToken: forgotReducer,
  getapi: getReducer,
});

export default rootReducer;
