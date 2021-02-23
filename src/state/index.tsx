import { Provider } from "react-redux";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { MessageState, messageReducer } from "./reducers/messageReducer";
import { NumberState, numberReducer } from "./reducers/numberReducer";

export interface AppState {
  MessageState: MessageState;
  NumberState: NumberState;
}

export const reducers: Reducer<AppState> = combineReducers({
  MessageState: messageReducer,
  NumberState: numberReducer,
});

export const store = configureStore({ devTools: true, reducer: reducers });

export type AppDispatch = typeof store.dispatch;

export const StateProvider: React.FunctionComponent = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
