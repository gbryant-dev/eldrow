import { FC, useEffect, useState } from "react";
import { StyledToast } from "./Toast.style";

export interface ToastProps {
    text: string,
    duration: number
}

const Toast: FC<ToastProps> = ({ text, duration }) => {
    const [visible, setVisible] = useState(true)
    const [removing, setRemoving] = useState(false)

    useEffect(() => {
        let timeout = null
        setRemoving(true)
        timeout = setTimeout(() => setVisible(false), duration)
        return () => timeout && clearTimeout(timeout)
    }, [duration])

    return visible ? <StyledToast $fade={removing}>{text}</StyledToast> : null
}

export default Toast