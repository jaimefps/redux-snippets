import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  createAction,
} from "@reduxjs/toolkit";
import { useCallback } from "react";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
  useStore,
} from "react-redux";
import { AppDispatch, AppState } from ".";

/**
 * Function factory for defining action prefix just once.
 */
export const makeActionCreatorFactory = (prefix: string) => <P = void>(
  suffix: string
) => createAction<P>(`${prefix.toUpperCase()}/${suffix.toLowerCase()}`);

/**
 * Use this instead of vanilla useDispatch()
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Use this instead of vanilla useSelector()
 */
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

/**
 * Avoid need for redux thunks for access to getState().
 * Any hook can get access to non-stale store state.
 */
export const useGetState = (): (() => AppState) => useStore().getState;

/**
 * Merge the 2 possible scenarios into a single Factory
 */
export function makeReduxHook<P = void>(
  actionCreator:
    | ActionCreatorWithoutPayload<string>
    | ActionCreatorWithPayload<P, string>
) {
  return () => {
    const dispatch = useAppDispatch();
    return useCallback(
      (payload?: P) => {
        if (payload) {
          dispatch(actionCreator(payload));
        } else {
          dispatch(actionCreator(undefined as any));
        }
      },
      [dispatch]
    );
  };
}

// /**
//  * Creates Redux hook for actions WITH payload
//  */
// export function makeReduxHook<P>(
//   actionCreator: ActionCreatorWithPayload<P, string>
// ) {
//   return () => {
//     const dispatch = useAppDispatch();
//     return useCallback((payload: P) => dispatch(actionCreator(payload)), [
//       dispatch,
//     ]);
//   };
// }

// /**
//  * Creates Redux hook for actions WITHOUT payload
//  */
// export function makeSimpleReduxHook(
//   actionCreator: ActionCreatorWithoutPayload<string>
// ) {
//   return () => {
//     const dispatch = useAppDispatch();
//     return useCallback(() => dispatch(actionCreator()), [dispatch]);
//   };
// }
