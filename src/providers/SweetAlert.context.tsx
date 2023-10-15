import { createContext } from "react";

export type PropsAlertConfirmation = {
  title: string | null;
  titleParams?: string[];
  text: null | string;
  textParams?: string[];
  confirmButtonText?: null | string;
  cancelButtonText?: null | string;
  callback: any;
  icon?: "warning" | "success" | "error" | "info" | "question" | undefined;
};

export type PropsAlertCountRegresive = {
  timeLeft?: number;
  title: string | null;
  text:null;
  confirmButtonText?: string | null;
  cancelButtonText?: string | null;
  callback: any;
  icon?: "warning" | "success" | "error" | "info" | "question" | undefined;
};

export type PropsShowConfirmationAlert = {
  title: string;
  paramsTitle?: string[];
  denyButtonText?: string;
  cancelText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: any;
  onDeny: any;
  icon: "warning" | "success" | "error" | "info" | "question" | undefined;
};

const SweetAlertContext = createContext({
  alertConfirmation: ({ title, text }: PropsAlertConfirmation) => { },
  alertCountRegresive: ({ title, text }: PropsAlertCountRegresive) => { },
  showConfirmationAlert: ({ title, denyButtonText, cancelText, confirmButtonText, cancelButtonText, onConfirm, onDeny }: PropsShowConfirmationAlert) => { },
});

export default SweetAlertContext;
