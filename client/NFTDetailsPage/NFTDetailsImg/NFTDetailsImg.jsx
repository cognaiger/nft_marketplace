import React, { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Style from "./NFTDetailsImg.module.css";
import { MediaRenderer } from "@thirdweb-dev/react";

const NFTDetailsImg = ({ listing }) => {
    const [description, setDescription] = useState(true);
    const [details, setDetails] = useState(true);

    const openDescription = () => {
        if (!description) {
            setDescription(true);
        } else {
            setDescription(false);
        }
    };

    const openDetails = () => {
        if (!details) {
            setDetails(true);
        } else {
            setDetails(false);
        }
    };

    return (
        <div className={Style.NFTDetailsImg}>
            <div className={Style.NFTDetailsImg_box}>
                <div className={Style.NFTDetailsImg_box_NFT}>

                    <div className={Style.NFTDetailsImg_box_NFT_img}>
                        <MediaRenderer
                            src={listing.asset.image}
                            className={Style.NFTDetailsImg_box_NFT_img_img}
                            alt="NFT image"
                            width={700}
                            height={800}
                            objectFit="cover"
                        />
                    </div>
                </div>

                <div
                    className={Style.NFTDetailsImg_box_description}
                    onClick={() => openDescription()}
                >
                    <p>Description</p>
                    {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </div>

                {description && (
                    <div className={Style.NFTDetailsImg_box_description_box}>
                        <p>
                            {listing.asset.description}
                        </p>
                    </div>
                )}

                <div
                    className={Style.NFTDetailsImg_box_details}
                    onClick={() => openDetails()}
                >
                    <p>Details</p>
                    {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </div>

                {details && (
                    <div className={Style.NFTDetailsImg_box_details_box}>
                        <p>
                            <small>Contract Address of Asset</small>
                            <br></br>
                            {listing.assetContractAddress}
                        </p>
                        <p>
                            <small>Token ID </small>
                            {listing.id}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NFTDetailsImg;