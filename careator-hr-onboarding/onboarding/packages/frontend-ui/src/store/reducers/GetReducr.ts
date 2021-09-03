import { Action } from "redux";
import GetActions from "../actions/GetAction";

export default function getReducer(store: boolean = false, action: Action) {
  switch (action.type) {
    case GetActions.ActionTypes.DONT_GET:
      return false;
    case GetActions.ActionTypes.DO_GET:
      return true;
    default:
      return store;
  }
}
