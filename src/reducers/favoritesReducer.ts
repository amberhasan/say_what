import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '../actions/favoritesActions';

const initialState = {
  favorites: [],
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
    default:
      return state;
  }
};
