import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogin, UserRegister } from "../reducer/auth.slice";
import { Api } from "../../services/Api";
import { setAlert } from "../slice/alertSlice";



export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: UserRegister, { rejectWithValue,dispatch }) => {
    try {
      const response = await Api.post("/auth/register", {
        email: user.email,
        name: user.name,
        password: user.password,
        confirmPassword: user.confirmPassword,
      });
      console.log(response.data);
      dispatch(
        setAlert({
          type: "success",
          msg: "usuario registrado correctamente",
        })
      );
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const LoginUser = createAsyncThunk(
  "auth/LoginUser",
  async (user: UserLogin, { rejectWithValue,dispatch }) => {
    try {
      const response = await Api.post("/auth/login", {
        email: user.email,
        password: user.password
      });

      dispatch(
        setAlert({
          type: "success",
          msg: "usuario correcto",
        })
      );
      console.log(response.data);
      
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/validate-token", {
        token,
      });
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
