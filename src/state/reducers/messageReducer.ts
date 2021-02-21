import { createReducer } from "@reduxjs/toolkit";
import {
  makeReduxHook,
  makeSimpleReduxHook,
  useAppDispatch,
  useAppSelector,
  makeAppCreateAction,
} from "../helpers";

/***********************************
 * State
 ***********************************/

export interface MessageState {
  text: string | null;
  error: string | null;
  loading: boolean;
}

export const initialState: MessageState = {
  text: null,
  error: null,
  loading: false,
};

/***********************************
 * Events (Action Creators)
 ***********************************/

// with prefix for this file's reducer:
const createAppAction = makeAppCreateAction("message");

type SubmittedPayload = { text: string };
const submitted = createAppAction<SubmittedPayload>("submitted");
export const useSubmitted = makeReduxHook<SubmittedPayload>(submitted);

type FailedPayload = { error: string };
const failed = createAppAction<FailedPayload>("failed");
export const useFailed = makeReduxHook<FailedPayload>(failed);

const started = createAppAction("started");
export const useStarted = makeSimpleReduxHook(started);

const reset = createAppAction("reset");
export const useReset = makeSimpleReduxHook(reset);

/***********************************
 * Thunks (Async Action Creators)
 ***********************************/

export const useAsyncSubmission = () => {
  const dispatch = useAppDispatch();
  const submitted = useSubmitted();
  const started = useStarted();
  const failed = useFailed();
  return (/* inputs */) =>
    dispatch(async (/* dispatch, getState */) => {
      started();

      // mock async delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // mock 200 or 500 response:
      if (Math.random() > 0.5) {
        submitted({
          text: "async message received",
        });
      } else {
        failed({
          error: "catastrophic error",
        });
      }
    });
};

/***********************************
 * Selectors
 ***********************************/

export const useMessageTextSelector = () =>
  useAppSelector((state) => state.MessageState.text);

export const useMessageErrorSelector = () =>
  useAppSelector((state) => state.MessageState.error);

export const useMessageLoadingSelector = () =>
  useAppSelector((state) => state.MessageState.loading);

/***********************************
 * Reducers
 ***********************************/

// Uses "immer" proxy under the hood to ensure immutable state slices:
export const messageReducer = createReducer(initialState, (builder) => {
  builder.addCase(started, (state) => {
    state.loading = true;
  });

  builder.addCase(submitted, (state, action) => {
    state.text = action.payload.text;
    state.error = null;
    state.loading = false;
  });

  builder.addCase(failed, (state, action) => {
    state.text = null;
    state.error = action.payload.error;
    state.loading = false;
  });

  builder.addCase(reset, (state) => {
    state = initialState;
  });
});
