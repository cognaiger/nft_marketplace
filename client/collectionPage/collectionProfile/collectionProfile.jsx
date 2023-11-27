import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Style from "./collectionProfile.module.css";
import { client } from "../../sanityClient";

const collectionProfile = ({ address }) => {
    const [collectionData, setCollectionData] = useState();

    useEffect(() => {
        let ignore = false;

        const fetchCollection = async (sanityClient = client) => {
            console.log(address);
            const query = `*[_type == 'collections' && address == "${address}"] 
            { 
                name,
                imagesrc,
                description,
                floorPrice,
                totalVolume,
                bestOffer,
                listed
            } ` ;
            const data = await sanityClient.fetch(query);

            console.log(data);
            if (!ignore) {
                setCollectionData(data[0]);
            }
        }

        fetchCollection();

        return () => {
            ignore = true;
        };
    }, [address])

    return (
        <div className={Style.collectionProfile}>
            {!collectionData ? (
                <div className={Style.collectionProfile_box}>
                    Loading...
                </div>
            ) : (
                <div className={Style.collectionProfile_box}>
                    <div className={Style.collectionProfile_box_left}>
                        <Image
                            src={collectionData.imagesrc}
                            alt="nft image"
                            width={800}
                            height={800}
                            className={Style.collectionProfile_box_left_img}
                        />
                    </div>

                    <div className={Style.collectionProfile_box_middle}>
                        <h1>{collectionData.name}</h1>
                        <p>
                            {collectionData.description}
                        </p>

                        <div className={Style.collectionProfile_box_middle_box}>
                            <div
                                className={Style.collectionProfile_box_middle_box_item}
                            >
                                    <small>Total volume</small>
                                    <p>{collectionData.totalVolume} ETH</p>
                            </div>
                            <div
                                className={Style.collectionProfile_box_middle_box_item}
                            >
                                <small>Floor Price</small>
                                <p>{collectionData.floorPrice} ETH</p>
                            </div>
                            <div
                                className={Style.collectionProfile_box_middle_box_item}
                            >
                                <small>Best Offer</small>
                                <p>{collectionData.bestOffer} WETH</p>
                            </div>
                            <div
                                className={Style.collectionProfile_box_middle_box_item}
                            >
                                <small>Listed</small>
                                <p>{collectionData.listed} %</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default collectionProfile;