import { GET_QURAN_DETAILS } from "../types/Types";

const initialState = {
  quranDetails: [],
};

export const quranDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QURAN_DETAILS:
      return {
        quranDetails: action.payload,
      };
    default:
      return state;
  }
};
