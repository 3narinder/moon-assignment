import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center bg-white/50 backdrop-blur-md z-50">
      <span className="sr-only">Loading...</span>
      <div className="w-16 h-16 border-4 border-binge-peach border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
