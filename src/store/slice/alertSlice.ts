import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

export type ToastTypes = "info" | "warning" | "success" | "error"
export interface Alert {
    id:string ,
    msg:string,
    type:ToastTypes
    paramMessage?:any[]
}
export interface AlertState{
    list:Alert[]
}

const initialState: AlertState ={
    list:[]
}

const alertsSlice = createSlice({
    name:'alerts',
    initialState,
    reducers:{
        setAlert:(state,action: PayloadAction<{msg:string , type:ToastTypes, paramMessage?:any[]}>) => {
            state.list =[...state.list,{id:uuidv4(), ...action.payload}]
        },
        removeAlert: (state,action: PayloadAction<string>)=>{
            state.list = state.list.filter(alert => alert.id !== action.payload)
        }
    }

})

export default alertsSlice.reducer
export const {setAlert,removeAlert} = alertsSlice.actions