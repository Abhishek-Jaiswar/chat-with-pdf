import React from "react";
import Uploader from "./_components/uploader";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="border-b lg:border-r lg:border-b-0">
        <Uploader />
      </div>
      <div className="min-h-0">{children}</div>
    </div>
  );
};

export default ChatLayout;
