import axios from "axios";
import { REACT_HOST_API, REACT_EDITION } from "@env";
import { GET_ALL_QURAN, GET_AYAHS_BY_JUZ, GET_SURAHS } from "../types/Types";

export const getAllData = (_) => {
  return async (dispatch) => {
    const res = await axios.get(`${REACT_HOST_API}/v1/meta`);

    dispatch({
      type: GET_ALL_QURAN,
      payload: res.data.data,
    });
  };
};

export const getSurah = (num) => {
  return async (dispatch) => {
    const response = await axios.get(
      `${REACT_HOST_API}/v1/surah/${num}/${REACT_EDITION}`
    );

    dispatch({
      type: GET_SURAHS,
      payload: response.data.data,
    });
  };
};

export const getJuz = (juzNumber) => {
  return async (dispatch) => {
    const res = await axios.get(
      `${REACT_HOST_API}/v1/juz/${juzNumber}/${REACT_EDITION}`
    );

    dispatch({
      type: GET_AYAHS_BY_JUZ,
      payload: res.data.data,
    });
  };
};
