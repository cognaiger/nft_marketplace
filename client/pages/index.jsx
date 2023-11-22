import React from "react";
import Style from "../styles/index.module.css";
import { AudioLive, BigNFTSilder, Brand, Category, Collection, Filter, FollowerTab, HeroSection, NFTCard, Service, Slider, Subscribe, Title, Video } from "../components/componentsindex";
import { ConnectWallet } from "@thirdweb-dev/react";

const Home = () => {
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
      <Subscribe />
      <Brand />
      <Video />
    </div>
  )
};

export default Home;