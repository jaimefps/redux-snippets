import { createReducer } from "@reduxjs/toolkit";
import {
  makeReduxHook,
  useAppSelector,
  makeActionCreatorFactory,
  useGetState,
} from "../helpers";

/***********************************
 * State
 ***********************************/

export interface NumberState {
  count: number;
}

export const initialState: NumberState = {
  count: 0,
};

/***********************************
 * ActionCreator Factory
 ***********************************/

const numberActionCreator = makeActionCreatorFactory("number");

/***********************************
 * Action Creators
 ***********************************/

type SubmittedPayload = { count: number };
const submitted = numberActionCreator<SubmittedPayload>("submitted");
export const useSubmitted = makeReduxHook<SubmittedPayload>(submitted);

/***********************************
 * Async Action-Creator (non-thunk)
 ***********************************/

export const useAsyncMutator = () => {
  const getState = useGetState();
  const submitted = useSubmitted();
  return async (num: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    submitted({ count: num });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const count2 = getState().NumberState.count;
    submitted({ count: count2 + 4 });
    await new Promise((resolve) => setTimeout(resolve, 500));
    const count3 = getState().NumberState.count;
    submitted({ count: count3 + 4 });
  };
};

/***********************************
 * Selectors
 ***********************************/

export const useNumberCountSelector = () =>
  useAppSelector((state) => state.NumberState.count);

/***********************************
 * Reducer
 ***********************************/

// Uses "immer" proxy under the hood to ensure immutable state slices:
export const numberReducer = createReducer(initialState, (builder) => {
  builder.addCase(submitted, (state, action) => {
    state.count = action.payload.count;
  });
});
