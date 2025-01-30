import Swal from "sweetalert2";

let msg: string | undefined;

interface AlertOptions {
  type?: "success" | "error" | "warning" | "info" | "question";
  message: string;
  timer?: number;
  cb?: () => void;
}

export const alert = function ({
  type = "success",
  message,
  timer = 5000,
  cb,
}: AlertOptions) {
  function config(
    timer: number,
    { type = "success", message, cb }: AlertOptions
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    msg = message ?? msg;
    Toast.fire({
      icon: type,
      title: msg,
      didDestroy: cb,
    });

    return Toast;
  }
  return config(timer, { type, message, cb });
};
