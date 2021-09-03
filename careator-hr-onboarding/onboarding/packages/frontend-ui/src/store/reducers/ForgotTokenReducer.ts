import { mailTokenTypes } from "../../types";
import { Action } from "redux";
import ForgotTokenActions from "../actions/ForgotTokenActions";

interface IAction extends Action {
  forgot?: object;
}
const initialState: mailTokenTypes = { forgot: {} };

function forgotReducer(
  storeMailData: mailTokenTypes = initialState,
  action: IAction
): any {
  switch (action.type) {
    case ForgotTokenActions.ActionTypes.MAIL_SUCCESS:
      return { forgot: action.forgot };

    default:
      return storeMailData;
  }
}

export default forgotReducer;
