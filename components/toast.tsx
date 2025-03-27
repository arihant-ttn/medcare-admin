"use client";

import React from "react";
import { Toaster, toast } from "sonner";

// Accept 'message' as a prop
interface MyComponentProps {
  message: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
  const notify = () => {
    toast.success(message); // ✅ Pass message correctly
  };

  return (
    <div>
      <button onClick={notify}>Show Notification</button>
      <Toaster position="top-right" />
    </div>
  );
};

export default MyComponent;
