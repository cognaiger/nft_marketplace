import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import { MdTimer } from "react-icons/md";
import Style from "./NFTCardTwo.module.css";
import { MARKETPLACE_ADDR, sdk } from "../../common/const";
import Link from "next/link";

const NFTCardTwo = ({ NFTData, address }) => {
    const [collectionData, setCollectionData] = useState();

    useEffect(() => {
        let ignore = false;
        const fetchCollection = async () => {
            console.log(address);
            const contract = await sdk.getContract(MARKETPLACE_ADDR);
            const listings = await contract.directListings.getAll({
                tokenContract: address
            });

            console.log(listings);
            if (!ignore) {
                setCollectionData(listings);
            }
        }

        fetchCollection();

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
            {!collectionData ? (
                <div className={Style.NFTCardTwo}>
                    Loading...
                </div>
            ) : (
                <div className={Style.NFTCardTwo}>
                    {collectionData.map((el, i) => (
                        <div className={Style.NFTCardTwo_box} key={i}>
                            <Link href={`/nft/${el.id}`}>
                                <div className={Style.NFTCardTwo_box_img}>
                                    <Image
                                        src={el.asset.image}
                                        alt="NFT"
                                        width={500}
                                        height={500}
                                        objectFit="cover"
                                        className={Style.NFTCardTwo_box_img_img}
                                    />
                                </div>

                                <div className={Style.NFTCardTwo_box_info}>
                                    <div className={Style.NFTCardTwo_box_info_left}>
                                        <p>{el.asset.name}</p>
                                    </div>
                                    <small>{i}</small>
                                </div>

                                {
                                    el.status == 4 ? (
                                        <div className={Style.NFTCardTwo_box_price}>
                                            <div className={Style.NFTCardTwo_box_price_box}>
                                                <small>Buyout Price</small>
                                                <p>{el.currencyValuePerToken.displayValue} ETH</p>
                                            </div>
                                            <p className={Style.NFTCardTwo_box_price_stock}>
                                                <MdTimer /> <span>{calRemainingTime(el.endTimeInSeconds - el.startTimeInSeconds)} left</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            Sold
                                        </div>
                                    )
                                }
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default NFTCardTwo;