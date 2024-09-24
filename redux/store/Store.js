import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../reducers/Root";
import { thunk } from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(thunk));
