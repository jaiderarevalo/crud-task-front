import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../services/Api";
import { setAlert } from "../slice/alertSlice";
import { TaskUserInterface } from "../../models/task.model";

export const TaskUser = createAsyncThunk(
  "auth/TaskUser",
  async (Task: TaskUserInterface, { rejectWithValue, dispatch }) => {
    try {
      const response = await Api.post("/crud/create", {
        task: Task.task,
        description: Task.description,
        status: Task.status,
      });
      dispatch(
        setAlert({
          type: "success",
          msg: "Tarea creada correctamente",
        })
      );

      console.log(response.data);
      console.log(response.data);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/UpdateTask",
  async (
    { id, body }: { id: string; body: TaskUserInterface },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await Api.patch(`/crud/${id}`, {
        task: body.task,
        description: body.description,
        status: body.status,
      });
      dispatch(
        setAlert({
          type: "success",
          msg: "Tarea actualizada correctamente",
        })
      );

        return response.data;
     
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/tasksUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/crud");
      console.log(response.data);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getTask = createAsyncThunk(
  "task/taskUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await Api.get(`/crud/${id}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const deleteTask = createAsyncThunk(
  "taskDelete/taskUserDelete",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await Api.delete(`/crud/${id}`);
      dispatch(
        setAlert({
          type: "success",
          msg: "Tarea eliminada correctamente",
        })
      );

      return id;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
