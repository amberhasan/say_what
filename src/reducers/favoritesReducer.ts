import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  SET_DEVICE_ID,
} from '../actions/favoritesActions';

const initialState = {
  favorites: [],
  deviceId: null,
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          caption => caption !== action.payload,
        ),
      };
    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload,
      };
    default:
      return state;
  }
};
