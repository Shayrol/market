import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../src/components/commons/layout";
import ApolloSetting from "../src/components/commons/apollo";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}
