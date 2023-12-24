import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  user: [
    {
      name: "Baker Vai",
      email: " example@gmail.com",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUser: (state, action) => {
      console.log(action);
      const data = {
        id: nanoid(),
        name: action.name,
        email: action.email,
      };
      state.user.push(data);
    },
  },
});

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
