import { configureStore } from "@reduxjs/toolkit"
import alertReducer from "./slices/alerts"; // change them to alertSlice and export the reducer
import authReducer from "./slices/auth";
import postReducer from "./slices/posts";
import profileReducer from './slices/profiles'
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