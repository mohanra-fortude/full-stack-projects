import { EmailSessionType } from "./../../types";
import { Action } from "redux";
import EmailActions from "../actions/EmailAction";

interface IAction extends Action {
  error?: string;
}

const initialState: EmailSessionType = { error: null };

function emailReducer(
  storeData: EmailSessionType = initialState,
  action: IAction
): any {
  switch (action.type) {
    case EmailActions.ActionTypes.Email_ERROR:
      return { error: action.error };
    default:
      return storeData;
  }
}

export default emailReducer;
