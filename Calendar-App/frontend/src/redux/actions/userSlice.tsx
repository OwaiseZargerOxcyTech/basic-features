import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the decoded token
interface DecodedToken {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

// Define the initial state
interface UserState {
  decodedToken: DecodedToken | null;
}

const initialState: UserState = {
  decodedToken: null,
};

// Create the userSlice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDecodedToken: (state, action: PayloadAction<DecodedToken>) => {
      state.decodedToken = action.payload;
    },
    clearToken: (state) => {
      state.decodedToken = null;
    },
  },
});

// Export the actions
export const { setDecodedToken, clearToken } = userSlice.actions;

// Selector to get the decoded token from the state
export const selectDecodedToken = (state: { user: UserState }) =>
  state.user.decodedToken;

export default userSlice.reducer;
