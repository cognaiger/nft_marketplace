import React from "react";
import { NFTDescription, NFTDetailsImg } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";
import { useContract, useDirectListing } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDR } from "../common/const";

const NFTDetailsPage = ({ id }) => {
    const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const {
        data: directListing,
        isLoading,
        error,
    } = useDirectListing(contract, id);
    console.log(directListing);

    return (
        <div>
            {isLoading ? (
                <div className={Style.NFTDetailsPage_box}>
                    Loading listings ...
                </div>
            ) : (
                <div className={Style.NFTDetailsPage}>
                    <div className={Style.NFTDetailsPage_box}>
                        <NFTDetailsImg listing={directListing} />
                        <NFTDescription listing={directListing} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NFTDetailsPage;