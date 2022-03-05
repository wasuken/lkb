import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/user";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
