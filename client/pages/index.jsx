import React, { useEffect } from "react";
import Style from "../styles/index.module.css";
import { AudioLive, BigNFTSilder, Category, Collection, Filter, FollowerTab, HeroSection, NFTCard, Service, Slider, Title } from "../components/componentsindex";
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
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />

      <FollowerTab />
      <Slider />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      <NFTCard />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
    </div>
  )
};

export default Home;