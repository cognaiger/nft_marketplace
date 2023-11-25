import React, { useEffect, useState } from 'react';
import Style from "./NFTOwn.module.css";
import { BsImages } from "react-icons/bs";
import { MediaRenderer, useAddress, useContract } from "@thirdweb-dev/react";
import Link from "next/link";
import { client } from '../../sanityClient';

const NFTOwn = () => {
    const [nftOwn, setNftOwn] = useState();
    const address = useAddress();

    useEffect(() => {
        let ignore = false;

        const fetchNFTOwn = async (sanityClient = client) => {
            console.log(address);
            const query = `*[_type == 'users' && walletAddress == "${address}"] 
            { 
              NFTown[]-> {
                id,
                name,
                imagesrc,
                contractAddress
              }
            } ` ;
            const data = await sanityClient.fetch(query);

            console.log(data[0].NFTown);
            if (!ignore) {
                setNftOwn(data[0].NFTown);
            }
        }

        fetchNFTOwn();

        return () => {
            ignore = true;
        };
    }, [address])

    const calRemainingTime = (s) => {
        const h = Math.floor(s / 3600);
        s = s % 3600;
        const m = Math.floor(s / 60);
        s = s % 60;
        return `${h}h:${m}m:${s}s`;
    }

    return (
        <div className={Style.NFTCard}>
            {nftOwn?.map((el, i) => (
                <Link href={`/nft/${el.id}`}>
                    <div className={Style.NFTCard_box} key={el.id}>
                        <div className={Style.NFTCard_box_img}>
                            <MediaRenderer
                                src={el.imagesrc}
                                alt="NFT images"
                                width={450}
                                height={600}
                                className={Style.NFTCard_box_img_img}
                            />
                        </div>

                        <div className={Style.NFTCard_box_update_details}>
                            <div className={Style.NFTCard_box_update_details_price}>
                                <div className={Style.NFTCard_box_update_details_price_box}>
                                    <h4>{el.name}</h4>

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
    );
}

export default NFTOwn;