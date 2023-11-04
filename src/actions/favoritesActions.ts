// Action Types
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

// Action Creators
export const addToFavorites = (caption: string) => ({
  type: ADD_TO_FAVORITES,
  payload: caption,
});

export const removeFromFavorites = (caption: string) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: caption,
});
