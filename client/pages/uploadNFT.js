import React from "react";
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

const uploadNFT = () => {
    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                </div>

                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT />
                </div>
            </div>
        </div>
    );
};

export default uploadNFT;