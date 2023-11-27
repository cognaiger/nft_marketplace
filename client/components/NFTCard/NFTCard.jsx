import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import Style from "./NFTCard.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";
import { client } from "../../sanityClient";

const NFTCard = () => {
    const [directNFT, setDirectNFT] = useState();

    useEffect(() => {
        let ignore = false;

        const fetchDirectListing = async (sanityClient = client) => {
            const query = `*[_type == 'nfts' && listingType == 'direct' && status == 'listing'] 
            {
                _id,
                name,
                imagesrc,
                price,
                endTimeInSecond,
                listingId
            }`;
            const data = await sanityClient.fetch(query);

            console.log(data);
            if (!ignore) {
                setDirectNFT(data);
            }
        }

        fetchDirectListing();

        return () => {
            ignore = true;
        };
    }, [])

    const calRemainingTime = (s) => {
        const d = Math.floor(s / 86400);
        s = s % 86400;
        const h = Math.floor(s / 3600);
        s = s % 3600;
        const m = Math.floor(s / 60);
        s = s % 60;
        return `${d}d:${h}h:${m}m:${s}s`;
    }

    return (
        <div>
            {
                !directNFT ? (
                    <div className={Style.NFTCard}>
                        Loading listings ...
                    </div>
                ) : (
                    <div className={Style.NFTCard}>
                        {directNFT.map((el, i) => (
                            <Link href={`/nft/${el.listingId}`} key={i}>
                                <div className={Style.NFTCard_box}>
                                    <div className={Style.NFTCard_box_img}>
                                        <MediaRenderer
                                            src={el.imagesrc}
                                            alt="NFT images"
                                            width={450}
                                            height={600}
                                            className={Style.NFTCard_box_img_img}
                                        />
                                    </div>

                                    <div className={Style.NFTCard_box_update}>
                                        <div className={Style.NFTCard_box_update_right}>
                                            <div className={Style.NFTCard_box_update_right_info}>
                                                <small>Remaining time</small>
                                                <p>{calRemainingTime(Math.floor(el.endTimeInSecond / 1000 - new Date().getTime() / 1000))}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={Style.NFTCard_box_update_details}>
                                        <div className={Style.NFTCard_box_update_details_price}>
                                            <div className={Style.NFTCard_box_update_details_price_box}>
                                                <h4>{el.name}</h4>

                                                <div className={Style.NFTCard_box_update_details_price_box_box}>
                                                    <div
                                                        className={Style.NFTCard_box_update_details_price_box_bid}
                                                    >
                                                        <small>Price</small>
                                                        <p>{el.price} ETH</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={Style.NFTCard_box_update_details_category}>
                                            <BsImages />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                )
            }
        </div>

    );
};

export default NFTCard;