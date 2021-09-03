import { Action } from "redux";
import TotalAmountActions from "../actions/TotalAmountActions";

interface IAction extends Action {
  total: number;
}

function TotalAmountReducer(store: number = 0, action: IAction): any {
  switch (action.type) {
    case TotalAmountActions.ActionTypes.UPDATE_TOTAL:
      return action.total;
    default:
      //return current_store_data;
      return store;
  }
}
export default TotalAmountReducer;
