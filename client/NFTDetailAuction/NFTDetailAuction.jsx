import React from "react";
import { NFTDescription, NFTDetailsImg } from "./NFTDetailsIndex";
import Style from "./NFTDetailAuction.module.css";
import { useContract, useEnglishAuction } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDR } from "../common/const";

const NFTDetailAuction = ({ id }) => {
    const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const {
        data: englishAuction,
        isLoading,
        error,
    } = useEnglishAuction(contract, id);
    console.log(englishAuction);

    return (
        <div>
            {isLoading ? (
                <div className={Style.NFTDetailsPage_box}>
                    Loading listings ...
                </div>
            ) : (
                <div className={Style.NFTDetailsPage}>
                    <div className={Style.NFTDetailsPage_box}>
                        <NFTDetailsImg listing={englishAuction} />
                        <NFTDescription listing={englishAuction} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default NFTDetailAuction;