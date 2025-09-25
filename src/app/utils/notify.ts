import { toast } from "sonner";

export const notify = {
  success: (msg: string, description?: string) =>
    toast.success(msg, { description, duration: 3000 }),
  error: (msg: string, description?: string) =>
    toast.error(msg, { description, duration: 4000 }),
  info: (msg: string, description?: string) =>
    toast.info(msg, { description, duration: 3000 }),
};
