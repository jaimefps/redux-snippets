import React from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "./state";
import {
  useAsyncSubmission,
  useMessageErrorSelector,
  useMessageLoadingSelector,
  useMessageTextSelector,
  useSubmitted,
} from "./state/reducers/messageReducer";

const App = () => {
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

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
