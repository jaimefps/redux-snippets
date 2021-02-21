import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  createAction,
} from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, AppState } from ".";

/**
 * Function factory for defining action prefix just once.
 */
export const makeAppCreateAction = (prefix: string) => <P = void>(
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
 * Creates Redux hook for actions WITH payload
 */
export function makeReduxHook<P>(
  actionCreator: ActionCreatorWithPayload<P, string>
) {
  return () => {
    const dispatch = useAppDispatch();
    return (payload: P) => dispatch(actionCreator(payload));
  };
}

/**
 * Creates Redux hook for actions WITHOUT payload
 */
export function makeSimpleReduxHook(
  actionCreator: ActionCreatorWithoutPayload<string>
) {
  return () => {
    const dispatch = useAppDispatch();
    return () => {
      dispatch(actionCreator());
    };
  };
}
