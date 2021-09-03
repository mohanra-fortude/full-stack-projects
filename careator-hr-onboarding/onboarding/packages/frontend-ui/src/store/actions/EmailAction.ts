const ActionTypes = {
  Email_ERROR: "[Email] Login Error",
};
const emailError = (error: string) => {
  return {
    type: ActionTypes.Email_ERROR,
    error,
  };
};
const EmailActions = { ActionTypes, emailError };
export default EmailActions;
