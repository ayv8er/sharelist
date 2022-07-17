import Layout from "../components/Layout";
import { AuthContextProvider } from "../store/auth-context";
import { MagicContextProvider } from "../store/magic-context";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <MagicContextProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </MagicContextProvider>
  );
}

export default MyApp;
