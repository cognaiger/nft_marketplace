import React from "react";
import Style from "../../styles/collection.module.css";
import images from "../../img";
import { Banner, CollectionProfile, NFTCardTwo } from "../../collectionPage/collectionIndex";
import { useRouter } from "next/router";

const CollectionID = () => {
    const router = useRouter();
    const collectionArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
    ];
    
    return (
        <div className={Style.collection}>
            <Banner bannerImage={images.creatorbackground1} />
            <CollectionProfile address={router.query.collectionId} />
            <NFTCardTwo NFTData={collectionArray} />
        </div>
    );
};

export default CollectionID;