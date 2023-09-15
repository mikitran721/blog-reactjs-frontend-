import { legacy_createStore as createStore } from "redux";
import appReducers from "./redux/reducers/reducers";

const store = createStore(appReducers);
// doi so la 1 reducer

export default store;
