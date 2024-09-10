import { configureStore } from "@reduxjs/toolkit";
import confirmModalReducer from "./actions/confirmationModalSlice";
import userReducer from "./actions/userSlice";

const store = configureStore({
  reducer: {
    confirmation_modal: confirmModalReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
