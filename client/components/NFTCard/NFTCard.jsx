import React, { useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/legacy/image";
import Style from "./NFTCard.module.css";
import images from "../../img";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import { CLIENT_ID, MARKETPLACE_ADDR } from "../../common/const";
import { MediaRenderer, useContract, useDirectListings } from "@thirdweb-dev/react";

const NFTCard = () => {
    const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const {
        data: directListings,
        isLoading,
        error
    } = useDirectListings(contract);
    console.log(directListings);

    /*
    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            const sdk = new ThirdwebSDK(Sepolia, {
                clientId: CLIENT_ID
            })

            const contract = await sdk.getContract(MARKETPLACE_ADDR);
            const listings = await contract.directListings.getAllValid();
            if (!ignore) {
                setListings(listings);
                console.log(listings);
            }
        }

        fetchData();

        return () => {
            ignore = true;
        };
    }, [])
    */


    const CardArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
    ];

    const [like, setLike] = useState(true);

    const likeNft = () => {
        if (!like) {
            setLike(true);
        } else {
            setLike(false);
        }
    };

    return (
        <div>
            {
                isLoading ? (
                    <div>
                        Loading listings ...
                    </div>
                ) : (
                    <div className={Style.NFTCard}>
                        {directListings.map((el, i) => (
                            <div className={Style.NFTCard_box} key={i + 1}>
                                <div className={Style.NFTCard_box_img}>
                                    <MediaRenderer
                                        src={el.asset.image}
                                        alt="NFT images"
                                        width={450}
                                        height={600}
                                        className={Style.NFTCard_box_img_img}
                                    />
                                </div>

                                <div className={Style.NFTCard_box_update}>
                                    <div className={Style.NFTCard_box_update_left}>
                                        <div
                                            className={Style.NFTCard_box_update_left_like}
                                            onClick={() => likeNft()}
                                        >
                                            {like ? (
                                                <AiOutlineHeart />
                                            ) : (
                                                <AiFillHeart
                                                    className={Style.NFTCard_box_update_left_like_icon}
                                                />
                                            )}
                                            {""} 22
                                        </div>
                                    </div>

                                    <div className={Style.NFTCard_box_update_right}>
                                        <div className={Style.NFTCard_box_update_right_info}>
                                            <small>Remaining time</small>
                                            <p>3h : 15m : 20s</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={Style.NFTCard_box_update_details}>
                                    <div className={Style.NFTCard_box_update_details_price}>
                                        <div className={Style.NFTCard_box_update_details_price_box}>
                                            <h4>{el.asset.name}</h4>

                                            <div className={Style.NFTCard_box_update_details_price_box_box}>
                                                <div
                                                    className={Style.NFTCard_box_update_details_price_box_bid}
                                                >
                                                    <small>Price</small>
                                                    <p>{el.currencyValuePerToken.displayValue} {el.currencyValuePerToken.symbol}</p>
                                                </div>
                                                <div
                                                    className={Style.NFTCard_box_update_details_price_box_stock}
                                                >
                                                    <small>1 in stock</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Style.NFTCard_box_update_details_category}>
                                        <BsImages />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )
            }
        </div>

    );
};

export default NFTCard;