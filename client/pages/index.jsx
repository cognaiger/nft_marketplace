import React, { useEffect } from "react";
import Style from "../styles/index.module.css";
import { BigNFTSilder, HeroSection, NFTAuction, NFTCard, Service, Title } from "../components/componentsindex";
import { useAddress } from "@thirdweb-dev/react";
import { client } from "../sanityClient";

const Home = () => {
  const address = useAddress();

  useEffect(() => {
    if (!address) return;
    (async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)
    })()
  }, [address])

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />

      <Title
        heading="Direct Listings"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <NFTCard />
      <Title
        heading="Auction"
        paragraph="Winning NFTs by bidding highest price"
      />
      <NFTAuction />
    </div>
  )
};

export default Home;