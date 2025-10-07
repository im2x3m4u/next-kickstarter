import { toast } from "sonner";

export const notify = {
  success: (msg: string, description?: string) => {
    if (description) {
      return toast.success(msg, { description, duration: 3000 });
    }
    return toast.success(msg, { duration: 3000 });
  },
  error: (msg: string, description?: string) => {
    if (description) {
      return toast.error(msg, { description, duration: 4000 });
    }
    return toast.error(msg, { duration: 4000 });
  },
  info: (msg: string, description?: string) => {
    if (description) {
      return toast.info(msg, { description, duration: 3000 });
    }
    return toast.info(msg, { duration: 3000 });
  },
};