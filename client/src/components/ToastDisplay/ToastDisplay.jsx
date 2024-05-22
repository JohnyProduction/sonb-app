/* eslint-disable default-case */
import { toast } from "react-toastify";

export const toastDisplay = (type, message) => {
  const toastObj = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  switch (type) {
    case "success":
      toast.success(message, toastObj);
      break;
    case "error":
      toast.error(message, toastObj);
      break;
    case "warn":
      toast.warn(message, toastObj);
      break;
  }
};
