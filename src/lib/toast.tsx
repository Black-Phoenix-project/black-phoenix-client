"use client";

import { toast as toastify } from "react-toastify";
import type { ToastContent, ToastIcon, ToastOptions } from "react-toastify";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

const baseClass =
  "!rounded-xl !min-h-0 !p-2 !px-3.5 !text-sm !font-semibold !shadow-lg";

const classes: Record<ToastType, string> = {
  success: `${baseClass} !bg-[#22c55e] !text-white`,
  error: `${baseClass} !bg-error !text-error-content`,
  warning: `${baseClass} !bg-warning !text-warning-content`,
  info: `${baseClass} !bg-info !text-info-content`,
};

const icons: Record<ToastType, ToastIcon> = {
  success: <CheckCircle2 className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
};

const render = (method: ToastType, message: ToastContent, options?: ToastOptions) =>
  toastify[method](message, { ...options, className: classes[method], icon: icons[method] });

export const toast = {
  success: (message: ToastContent, options?: ToastOptions) => render("success", message, options),
  error: (message: ToastContent, options?: ToastOptions) => render("error", message, options),
  warning: (message: ToastContent, options?: ToastOptions) => render("warning", message, options),
  info: (message: ToastContent, options?: ToastOptions) => render("info", message, options),
};

export const showToast = (message: ToastContent, type: ToastType = "success") =>
  toast[type](message);

export default toast;
