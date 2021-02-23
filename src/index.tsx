import React, { useState } from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "./state";
import {
  useAsyncSubmission,
  useMessageErrorSelector,
  useMessageLoadingSelector,
  useMessageTextSelector,
  useSubmitted,
} from "./state/reducers/messageReducer";
import {
  useAsyncMutator,
  useNumberCountSelector,
} from "./state/reducers/numberReducer";

const MessageSampler = () => {
  // selectors
  const text = useMessageTextSelector();
  const error = useMessageErrorSelector();
  const loading = useMessageLoadingSelector();
  // events
  const asyncSubmission = useAsyncSubmission();
  const submitted = useSubmitted();

  if (loading) {
    return <div>...loading random outcome...</div>;
  }

  return (
    <div>
      <div>current message: {text || "-"}</div>
      <div>current error: {error || "-"}</div>
      <button onClick={() => submitted({ text: "sync message" })}>sync</button>
      <button onClick={() => asyncSubmission(/* inputs */)}>async</button>
    </div>
  );
};

const AsyncSampler = () => {
  const asyncMutator = useAsyncMutator();
  const count = useNumberCountSelector();
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => asyncMutator(1)}>test</button>
    </div>
  );
};

ReactDOM.render(
  <StateProvider>
    <MessageSampler />
    <AsyncSampler />
  </StateProvider>,
  document.getElementById("root")
);
