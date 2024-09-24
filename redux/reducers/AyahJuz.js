import { GET_AYAHS_BY_JUZ } from "../types/Types";

const initialState = {
  ayahs: [],
};

export const ayahJuzReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AYAHS_BY_JUZ:
      return {
        ayahs: action.payload,
      };
    default:
      return state;
  }
};
