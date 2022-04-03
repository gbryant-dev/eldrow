import { FC } from "react";
import Toast, { ToastProps } from "./Toast/Toast";
import { ToastContainer } from "./Toaster.style";


interface Props {
    toasts: ToastProps[],
}

const Toaster: FC<Props> = ({ toasts }) => {

    return (
        <ToastContainer>
            {(toasts ?? []).map((toast, i) => <Toast {...toast} key={i} />)}
        </ToastContainer>
    )
}

export default Toaster