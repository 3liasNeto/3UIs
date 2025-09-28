"use client";
import { Toast as ToastPrimitive } from "@base-ui-components/react/toast";

const useToast = () => {
    const manager = ToastPrimitive.useToastManager();

    if (!manager) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return manager;
}

const ToastProvider = ({ ...props } : React.ComponentProps<typeof ToastPrimitive.Provider>) => {
    const manager = ToastPrimitive.createToastManager();
    return <ToastPrimitive.Provider toastManager={manager} {...props} />;
}

const ToastPortal = ToastPrimitive.Portal;
const ToastViewport = ToastPrimitive.Viewport;
const ToastRoot = ToastPrimitive.Root;
const ToastTitle = ToastPrimitive.Title;
const ToastDescription = ToastPrimitive.Description;
const ToastAction = ToastPrimitive.Action;
const ToastClose = ToastPrimitive.Close;

export {
    useToast,
    ToastProvider,
    ToastPortal,
    ToastViewport,
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose
};