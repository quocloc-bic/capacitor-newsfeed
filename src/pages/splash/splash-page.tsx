import React from "react";
import useSplashPage from "./splash-page.hook";

const SplashPage: React.FC = () => {
  useSplashPage();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl">Welcome</h1>
    </div>
  );
};

export default SplashPage;
