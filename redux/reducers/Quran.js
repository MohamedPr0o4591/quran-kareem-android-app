import { GET_ALL_QURAN } from "../types/Types";

const initialState = {
  quran: [],
};

export const quranReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_QURAN:
      return {
        quran: action.payload,
      };
    default:
      return state;
  }
};
