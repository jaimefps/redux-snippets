import { Provider } from "react-redux";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { MessageState, messageReducer } from "./reducers/messageReducer";

export interface AppState {
  MessageState: MessageState;
}

export const reducers: Reducer<AppState> = combineReducers({
  MessageState: messageReducer,
});

export const store = configureStore({ devTools: true, reducer: reducers });

// type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const StateProvider: React.FunctionComponent = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
