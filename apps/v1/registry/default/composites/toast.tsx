"use client";
import { XIcon } from "lucide-react";
import {
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  useToast,
} from "../ui/toast";

const Toast = () => {
  const { toasts } = useToast();

  return toasts.map((toast) => (
    <ToastRoot
      key={toast.id}
      toast={toast}
      className="absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] mr-0 w-full [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+calc(min(var(--toast-index),10)*-15px)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))] rounded-lg border border-gray-200 bg-gray-50 bg-clip-padding p-4 shadow-lg transition-all [transition-property:opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-[ending-style]:opacity-0 data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y)))] data-[limited]:opacity-0 data-[starting-style]:[transform:translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)] data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))] data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))] data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))] data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]"
      style={{
        ["--gap" as string]: "1rem",
        ["--offset-y" as string]:
          "calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))",
      }}
    >
      <ToastTitle className="text-[0.975rem] leading-5 font-medium" />
      <ToastDescription className="text-[0.925rem] leading-5 text-gray-700" />
      <ToastClose
        className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded border-none bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        aria-label="Close"
      >
        <XIcon className="h-4 w-4" />
      </ToastClose>
    </ToastRoot>
  ));
};


const TestToast = () => {
    const { add } = useToast();
    return <button onClick={() => add({ title: "Hello", description: "This is a toast message!" })}>Show Toast</button>;
}

export { Toast, TestToast };