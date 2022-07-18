import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { data } from "../../components/Sidebar/SidebarData";

const initialState = {
  token: "",
  id: "",
};

export const loginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    submitLogin: (state, action) => {
      Cookies.set("token", action.payload.token, { expires: 2 });
      Cookies.set("id", action.payload.id, { expires: 2 });
      // data.left[3].link = "/profile";
      return { ...state, token: action.payload.token, id: action.payload.id };
    },
  },
});

export const { submitLogin } = loginReducer.actions;

export default loginReducer.reducer;
