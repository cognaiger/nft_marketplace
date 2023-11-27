import React from "react";
import Style from "../styles/collection.module.css";
import images from "../img";
import { Banner } from "../collectionPage/collectionIndex";
import { Collection } from "../components/componentsindex";

const collection = () => {
    
    return (
        <div className={Style.collection}>
            <Banner bannerImage={images.creatorbackground1} />
            <Collection />
        </div>
    );
};

export default collection;