import {SET_DEVICE_ID} from '../actions/appActions';

const initialState = {
  deviceId: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload,
      };
    default:
      return state;
  }
};
