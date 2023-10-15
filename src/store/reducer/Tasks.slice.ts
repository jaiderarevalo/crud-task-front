import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user.model";
import { handlePending, handleRejected } from "../actions/base.action";
import {
  TaskUser,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../actions/Tasks.action";
import {
  TaskUserInterface,
  UpdateTaskUserInterface,
} from "../../models/task.model";

export interface RegisterState {
  tasks: TaskUserInterface[];
  tasksUpdate: UpdateTaskUserInterface | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  isLogin: boolean;
  token: string | null;
}
const initialState: RegisterState = {
  tasksUpdate: null,
  tasks: [],
  user: null,
  loading: false,
  error: null,
  isLogin: false,
  token: null,
};
const tasksSlice = createSlice({
  name: "Task",
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
    clearTasksEdit: (state) => {
      state.tasksUpdate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TaskUser.pending, handlePending)
      .addCase(TaskUser.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.user = payload.user;
      })
      .addCase(TaskUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(getTasks.pending, handlePending)
      .addCase(getTasks.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.tasks = payload;
       
        
      })
      .addCase(getTasks.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(updateTask.pending, handlePending)
      .addCase(updateTask.fulfilled, (state, { payload }: any) => {
        state.tasks = state.tasks.map((item: TaskUserInterface) => {
          if (item.id === payload.id) {
            return {
              ...item,
              task: payload.task,
              description: payload.description,
              status: payload.status,
            };
          }
          return item;
        });
        state.loading = true;
        state.tasksUpdate = payload;
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(getTask.pending, handlePending)
      .addCase(getTask.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.tasksUpdate = payload;
        
      })
      .addCase(getTask.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (item: TaskUserInterface) => item.id !== payload
        );
      })
      .addCase(deleteTask.rejected, handleRejected);
  },
});
export default tasksSlice.reducer;
export const { setLogout, setLogin } = tasksSlice.actions;
