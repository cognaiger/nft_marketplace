import React from "react";
import { BsImages } from "react-icons/bs";
import Style from "./NFTAuction.module.css";
import { MARKETPLACE_ADDR } from "../../common/const";
import { MediaRenderer, useContract, useEnglishAuctions } from "@thirdweb-dev/react";
import Link from "next/link";

const NFTAuction = () => {
    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const {
        data: auctionListing,
        isLoading: loadingAuctionListing,
        error
    } = useEnglishAuctions(marketplace, {
        count: 9
    });
    console.log(auctionListing);

    const calRemainingTime = (s) => {
        let res;
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
                loadingAuctionListing ? (
                    <div className={Style.NFTCard}>
                        Loading listings ...
                    </div>
                ) : (
                    <div className={Style.NFTCard}>
                        {auctionListing.map((el, i) => (
                            <Link href={`/nftAuction/${el.id}`}>
                                <div className={Style.NFTCard_box} key={el.id}>
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
                                        <div className={Style.NFTCard_box_update_right}>
                                            <div className={Style.NFTCard_box_update_right_info}>
                                                <small>Remaining time</small>
                                                <p>{calRemainingTime(el.endTimeInSeconds)}</p>
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
                                                        <small>Buyout Price</small>
                                                        <p>{el.buyoutCurrencyValue.displayValue} {el.buyoutCurrencyValue.symbol}</p>
                                                    </div>

                                                    <div
                                                        className={Style.NFTCard_box_update_details_price_box_bid}
                                                    >
                                                        <small>Current Bid</small>
                                                        <p>{el.buyoutCurrencyValue.displayValue} {el.buyoutCurrencyValue.symbol}</p>
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

export default NFTAuction;