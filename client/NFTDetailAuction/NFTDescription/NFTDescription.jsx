import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import {
    MdVerified,
    MdCloudUpload,
    MdTimer,
    MdReportProblem,
    MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaWallet, FaPercentage } from "react-icons/fa";
import {
    TiSocialFacebook,
    TiSocialLinkedin,
    TiSocialTwitter,
    TiSocialYoutube,
    TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDR } from "../../common/const";
import { client } from "../../sanityClient";

const NFTDescription = ({ listing }) => {
    const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const address = useAddress();
    const [minNextBid, setMinNextBid] = useState(0);

    const buyListing = async () => {
        await contract.englishAuctions.buyoutAuction(listing.id);
    }

    const bid = async () => {
        await contract.englishAuctions.makeBid(listing.id, bidPrice);
    }

    const cancelListing = async () => {
        await contract.englishAuctions.cancelAuction(listing.id);
    }

    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [user, setUser] = useState();
    const [bidOpen, setBidOpen] = useState(false);
    const [bidPrice, setBidPrice] = useState(0);
    const time = Math.floor(new Date().getTime() / 1000);

    useEffect(() => {
        let ignore = false;

        const fetchUserInfo = async (sanityClient = client) => {
            console.log(address);
            const query = `*[_type == 'users' && walletAddress == "${listing.creatorAddress}"] 
            { 
              userName,
              walletAddress
            } ` ;
            const data = await sanityClient.fetch(query);

            console.log(data);
            if (!ignore) {
                setUser(data[0]);
            }
        }

        fetchUserInfo();

        return () => {
            ignore = true;
        };
    }, [address])

    useEffect(() => {
        let ignore = false;

        const fetchBid = async () => {
            const minNextBid = await contract.englishAuctions.getMinimumNextBid(listing.id);

            console.log(minNextBid);
            if (!ignore) {
                setMinNextBid(minNextBid);
            }
        }

        fetchBid();

        return () => {
            ignore = true;
        };
    }, [])

    const openSocial = () => {
        if (!social) {
            setSocial(true);
            setNFTMenu(false);
        } else {
            setSocial(false);
        }
    };

    const openNFTMenu = () => {
        if (!NFTMenu) {
            setNFTMenu(true);
            setSocial(false);
        } else {
            setNFTMenu(false);
        }
    };

    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                {/* //Part ONE */}
                <div className={Style.NFTDescription_box_share}>
                    <p></p>
                    <div className={Style.NFTDescription_box_share_box}>
                        <MdCloudUpload
                            className={Style.NFTDescription_box_share_box_icon}
                            onClick={() => openSocial()}
                        />

                        {social && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#">
                                    <TiSocialFacebook /> Facebooke
                                </a>
                                <a href="#">
                                    <TiSocialInstagram /> Instragram
                                </a>
                                <a href="#">
                                    <TiSocialLinkedin /> LinkedIn
                                </a>
                                <a href="#">
                                    <TiSocialTwitter /> Twitter
                                </a>
                                <a href="#">
                                    <TiSocialYoutube /> YouTube
                                </a>
                            </div>
                        )}

                        <BsThreeDots
                            className={Style.NFTDescription_box_share_box_icon}
                            onClick={() => openNFTMenu()}
                        />

                        {NFTMenu && (
                            <div className={Style.NFTDescription_box_share_box_social}>
                                <a href="#">
                                    <BiDollar /> Change price
                                </a>
                                <a href="#">
                                    <BiTransferAlt /> Transfer
                                </a>
                                <a href="#">
                                    <MdReportProblem /> Report abouse
                                </a>
                                <a href="#">
                                    <MdOutlineDeleteSweep /> Delete item
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                {/* //Part TWO */}
                <div className={Style.NFTDescription_box_profile}>
                    <h1>{listing.asset.name}</h1>
                    <div className={Style.NFTDescription_box_profile_box}>
                        <div className={Style.NFTDescription_box_profile_box_left}>
                            <Image
                                src={images.user1}
                                alt="profile"
                                width={40}
                                height={40}
                                className={Style.NFTDescription_box_profile_box_left_img}
                            />
                            <div className={Style.NFTDescription_box_profile_box_left_info}>
                                <small>Creator</small> <br />
                                <span>
                                    {user?.userName} <MdVerified />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={Style.NFTDescription_box_profile_biding}>
                        <p>
                            <MdTimer /> <span>Auction ending in:</span>
                        </p>

                        <div className={Style.NFTDescription_box_profile_biding_box_timer}>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{Math.floor((listing.endTimeInSeconds - time) / 86400)}</p>
                                <span>Days</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{Math.floor(((listing.endTimeInSeconds - time) % 86400) / 3600)}</p>
                                <span>hours</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{Math.floor((((listing.endTimeInSeconds - time) % 86400) % 3600) / 60)}</p>
                                <span>mins</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{(((listing.endTimeInSeconds - time) % 86400) % 3600) % 60}</p>
                                <span>secs</span>
                            </div>
                        </div>

                        <div className={Style.NFTDescription_box_profile_biding_box_price}>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_price_bid
                                }
                            >
                                <small>Minimum Next Bid</small>
                                <p>
                                    {minNextBid.displayValue} {minNextBid.symbol}
                                </p>

                            </div>

                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_price_bid
                                }
                            >
                                <small>Buy out</small>
                                <p>
                                    {listing?.buyoutCurrencyValue.displayValue} {listing.buyoutCurrencyValue.symbol}
                                </p>
                            </div>
                        </div>

                        {listing.status != 4 ? (
                            <div className={Style.NFTDescription_box_profile_biding_box_button}>
                                <Button
                                    icon=<FaPercentage />
                                    btnName="Completed"
                                    classStyle={Style.button}
                                />
                            </div>
                        ) : (
                            listing.creatorAddress != address ? (
                                <div className={Style.NFTDescription_box_profile_biding_box_button}>
                                    <Web3Button
                                        contractAddress={MARKETPLACE_ADDR}
                                        action={
                                            async () => buyListing()
                                        }
                                        theme={'light'}
                                    >
                                        Buy Now
                                    </Web3Button>
                                    {
                                        !bidOpen ? (
                                            <Button
                                                icon=<FaWallet />
                                                btnName="Place a bid"
                                                handleClick={() => setBidOpen(!bidOpen)}
                                                classStyle={Style.button}
                                            />
                                        ) : (
                                            <div className={Style.offerInputContainer}>
                                                <input
                                                    type="number"
                                                    value={bidPrice}
                                                    onChange={(e) => setBidPrice(e.target.value)}
                                                    placeholder="Enter Offer Amount"
                                                />
                                                <div className={Style.doubleButton}>
                                                    <Web3Button
                                                        contractAddress={MARKETPLACE_ADDR}
                                                        action={
                                                            async () => bid()
                                                        }
                                                        theme={'light'}
                                                    >
                                                        Submit Bid
                                                    </Web3Button>
                                                    <Button
                                                        btnName="Cancel"
                                                        handleClick={() => setBidOpen(false)}
                                                        classStyle={Style.button}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            ) : (
                                <div className={Style.NFTDescription_box_profile_biding_box_button}>
                                    <Web3Button
                                        theme="dark"
                                        contractAddress={MARKETPLACE_ADDR}
                                        action={
                                            async () => cancelListing()
                                        }
                                        onSuccess={(res) => alert("Success!")}
                                        onError={(error) => alert("Something went wrong!")}
                                        className={Style.button}
                                    >
                                        Cancel Listing
                                    </Web3Button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;