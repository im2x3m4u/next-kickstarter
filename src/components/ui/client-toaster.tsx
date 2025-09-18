"use client";

import { Toaster } from "sonner";

export default function ClientToaster() {
  return (
    <Toaster 
      position="top-center" 
      richColors 
      expand={true}
      closeButton={true}
      toastOptions={{
        style: {
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        className: 'toast-custom',
      }}
    />
  );
}


