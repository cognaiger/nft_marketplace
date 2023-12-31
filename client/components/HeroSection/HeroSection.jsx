import React from "react";
import Image from "next/legacy/image";
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";
import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/collection');
  }

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Discover, collect, and sell NFTs 🖼️</h1>
          <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
          </p>
          <Button btnName="Start your search" handleClick={handleClick} />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;