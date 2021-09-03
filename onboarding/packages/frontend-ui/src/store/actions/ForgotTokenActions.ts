const ActionTypes = {
    MAIL_SUCCESS: "[Forgot] Mail Success",
    
  };
  const mailSuccess = (forgot: object) => {
    return {
      type: ActionTypes.MAIL_SUCCESS,
      forgot,
    };
  };
  
const ForgotTokenActions = {mailSuccess,ActionTypes };
export default ForgotTokenActions;
