import { User } from "./user.model";

export interface TaskUserInterface {
    id: string;
    task: string;
    description: string;
    status: boolean;
    user?: User | null;
  }
export interface UpdateTaskUserInterface {
    id?: string;
    task?: string;
    description?: string;
    status?: boolean;
    user?: User | null;
  }