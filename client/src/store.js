import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./actions/alerts"; // change them to alertSlice and export the reducer
import authReducer from "./actions/auth";
import profileReducer from "./reducers/profileReducer"; // Lets try and fix the auth reducer
import postReducer from "./reducers/postReducer";
import { reducer as formReducer} from "redux-form";
const store = configureStore({
    reducer: {
        alert: alertReducer,
        form: formReducer,
        auth: authReducer,
        profile: profileReducer,
        post: postReducer
    }
});

export { store };