import Head from "next/head";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-transparent">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
