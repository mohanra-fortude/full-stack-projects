const ActionTypes = {
  DO_GET: "[Loading] get",
  DONT_GET: "[Loading] dont",
};

const doGet = () => {
  return { type: ActionTypes.DO_GET };
};

const dontGet = () => {
  return { type: ActionTypes.DONT_GET };
};

const GetActions = {
  doGet,
  dontGet,
  ActionTypes,
};
export default GetActions;
