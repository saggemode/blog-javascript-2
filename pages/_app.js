import Layout from "../components/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import {wrapper} from "../store/store";
import { useRouter } from 'next/router';
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { store } from '../redux/store';

// function MyApp({ Component, pageProps }) {
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <Provider store={store}>
        <Layout>
          {Component.auth ? (
            <Auth adminOnly={Component.auth.adminOnly}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
        </Provider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}

export default MyApp
//export default  wrapper.withRedux(MyApp);
