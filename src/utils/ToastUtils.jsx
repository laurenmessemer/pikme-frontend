// Toast.js

import { toast } from "react-hot-toast";

const ToastUtils = {
  success: (message) => {
    toast.success(message);
  },
  error: (message) => {
    toast.error(message);
  },
  warning: (message) => {
    toast(message, {
      icon: "⚠️",
      style: {
        borderRadius: "10px",
      },
    });
  },
  customError: (message) => {
    toast.error(message, {
      position: "top-center",
      duration: 1000,
      style: { width: "150%", wordBreak: "break-all" },
    });
  },
};

export default ToastUtils;
