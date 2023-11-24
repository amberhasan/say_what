// Action Types
export const SET_DEVICE_ID = 'SET_DEVICE_ID';

// Action Creators
export const setDeviceId = (id: string) => ({
  type: SET_DEVICE_ID,
  payload: id,
});
