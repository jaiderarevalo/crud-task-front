import React,{useContext} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SweetAlertContext, {
  PropsAlertConfirmation,
  PropsAlertCountRegresive,
  PropsShowConfirmationAlert,
} from "./SweetAlert.context";
const BaseSwal = withReactContent(Swal);

type Props = {
  children: React.ReactNode;
};

export const SweetAlertProvider = ({ children }: Props) => {
  const alertConfirmation = ({
    title,
    text,
    confirmButtonText = "si",
    cancelButtonText = "cancelar",
    callback,
    icon = "warning",
  }: PropsAlertConfirmation) => {
    BaseSwal.fire({
      title: title || "",
      text: text || "",
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText ?? "",
      cancelButtonText: cancelButtonText ?? "",
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  const alertCountRegresive = ({
    title,
    timeLeft = 10,
    text,
    icon = "warning",
    confirmButtonText = "actions.yes",
    cancelButtonText = "actions.no",
    callback,
  }: PropsAlertCountRegresive) => {
    let timerInterval: any = 0;
    Swal.fire({
      title: title || "",
      text: text ?? "",
      icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText ?? "",
      cancelButtonText: cancelButtonText ?? "",
      showLoaderOnConfirm: true,
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.disabled = true;
          confirmButton.innerText = `actions.wait_seconds ${timeLeft}`;

          timerInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
              //finish
              confirmButton.disabled = false;
              confirmButton.innerText = "confirms.delete_confirm_male";
              clearInterval(timerInterval);
            } else {
              confirmButton.innerText = `actions.wait_seconds ${timeLeft}`;
            }
          }, 1000);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  };

  const showConfirmationAlert = ({
    title,
    denyButtonText = "actions.cancel",
    confirmButtonText = "actions.yes",
    cancelButtonText = "actions.cancel",
    onConfirm,
    onDeny,
    paramsTitle,
    icon = "warning",
  }: PropsShowConfirmationAlert) => {
    Swal.fire({
      title: title ?? "",
      icon,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: confirmButtonText ?? "",
      denyButtonText: denyButtonText ?? "",
      cancelButtonText: cancelButtonText ?? "",
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
      if (result.isDenied && onDeny) {
        onDeny();
      }
    });
  };
  return (
    <SweetAlertContext.Provider
      value={{
        alertConfirmation,
        alertCountRegresive,
        showConfirmationAlert,
      }}
    >
      {children}
    </SweetAlertContext.Provider>
  );
};

export const useSweetAlert = () =>{
    return useContext(SweetAlertContext)
}