import "../styles/globals.css";
import { Footer, NavBar } from "../components/componentsindex";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

const MyApp = ({ Component, pageProps }) => (
  <ThirdwebProvider clientId="9c11241e80c0985a7f05e11dcd4745de" activeChain={Sepolia}>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </ThirdwebProvider>
);

export default MyApp;