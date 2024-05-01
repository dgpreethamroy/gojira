import React from "react";
import pageloader from "../../assets/pageloader.gif";
export const Loader = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <img className="size-20" src={pageloader} alt="Your GIF" />
    </div>
  );
};
