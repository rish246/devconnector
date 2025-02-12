import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./pages/App";

import { store } from "./store";

const root = createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
