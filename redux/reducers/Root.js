import { combineReducers } from "redux";
import { surahReducer } from "./Surah";
import { ayahJuzReducer } from "./AyahJuz";
import { quranReducer } from "./Quran";
import { quranDetailsReducer } from "./QuranDetails";

export const rootReducer = combineReducers({
  GET_SURAH: surahReducer,
  GET_AYAHS_JUZ: ayahJuzReducer,
  GET_ALL_QURAN: quranReducer,
  GET_QURAN_DETAILS: quranDetailsReducer,
});
