import type { AppProps } from "next/app";
import { AuthProvider } from "../features/auth/provider/AuthProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
