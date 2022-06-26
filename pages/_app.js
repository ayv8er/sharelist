import Layout from "../components/Layout";

import { UserContextProvider } from "../store/user-context";
import { MagicContextProvider } from "../store/magic-context";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <MagicContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </MagicContextProvider>
  );
}

export default MyApp;
