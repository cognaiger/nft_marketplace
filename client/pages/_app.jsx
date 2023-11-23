import "../styles/globals.css";
import { Footer, NavBar } from "../components/componentsindex";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { CLIENT_ID } from "../common/const";

const MyApp = ({ Component, pageProps }) => (
  <ThirdwebProvider clientId={CLIENT_ID} activeChain={Sepolia}>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </ThirdwebProvider>
);

export default MyApp;