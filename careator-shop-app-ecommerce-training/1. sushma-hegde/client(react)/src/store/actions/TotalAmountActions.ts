const ActionTypes = {
  UPDATE_TOTAL: "[Total] Update Total",
};

const updateTotal = (total: number) => {
  return {
    type: ActionTypes.UPDATE_TOTAL, // required, unique
    total,
  };
};

export default { updateTotal, ActionTypes };
