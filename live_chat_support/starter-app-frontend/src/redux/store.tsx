import { configureStore } from "@reduxjs/toolkit";
import confirmModalReducer from "./actions/confirmationModalSlice";

const store = configureStore({
  reducer: {
    confirmation_modal: confirmModalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;