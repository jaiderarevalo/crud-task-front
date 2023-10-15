import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
import { LoginUser, registerUser, verifyToken } from "../actions/auth.action";
import { handlePending } from "../actions/base.action";

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLogin: boolean;
  isRegister:boolean
  token: string | null;
}
const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
  isRegister:false,
  isLogin: false,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, { payload }: any) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.accessToken;
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.token = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.user = payload.user;
        state.isRegister = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(LoginUser.pending, handlePending)
      .addCase(LoginUser.fulfilled, (state, { payload }: any) => {
        state.loading = false;
				state.user = payload.user;
				state.token = payload.accessToken;
				state.isLogin = true;
				window.localStorage.setItem('token', payload.accessToken);
      })
      .addCase(LoginUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(verifyToken.pending, handlePending)
      .addCase(verifyToken.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.accessToken;
        state.isLogin = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isLogin = false;
        window.localStorage.removeItem("token");
      });
    //   .addCase(loginUser.pending, handlePending)
    //   .addCase(loginUser.fulfilled, (state, { payload }: any) => {
    //     state.loading = false;
    //     state.user = payload.user;
    //     state.token = payload.accessToken;
    //     state.isLogin = true;
    //     window.localStorage.setItem("token", payload.accessToken);
    //   })
    //   .addCase(loginUser.rejected, (state, action) => {
    //     state.loading = false;
    //     state.user = null;
    //     state.token = null;
    //   });
  },
});
export default authSlice.reducer;
export const { setLogout, setLogin } = authSlice.actions;
