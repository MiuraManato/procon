import type { AppProps } from "next/app";
import "@/styles/globals.css";
import MetaData from "./metadata";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MetaData />
      <Component {...pageProps} />;
    </>
  );
};

export default App;
