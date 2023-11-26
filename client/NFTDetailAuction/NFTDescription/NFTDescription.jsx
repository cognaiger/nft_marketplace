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
import { NFTTabs } from "../NFTDetailsIndex";
import { Web3Button, useAddress, useBuyDirectListing, useContract, useEnglishAuctionWinningBid } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDR } from "../../common/const";
import { client } from "../../sanityClient";

const NFTDescription = ({ listing }) => {
    const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const address = useAddress();
    const {
        data: winningBid,
        isLoading,
        error
    } = useEnglishAuctionWinningBid(contract, listing.id);

    const buyListing = async () => {
        await contract.englishAuctions.buyoutAuction(listing.id);
    }

    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [history, setHistory] = useState(true);
    const [provanance, setProvanance] = useState(false);
    const [owner, setOwner] = useState(false);
    const [user, setUser] = useState();

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

    const historyArray = [
        images.user1,
        images.user2,
        images.user3,
        images.user4,
        images.user5,
    ];
    const provananceArray = [
        images.user6,
        images.user7,
        images.user8,
        images.user9,
        images.user10,
    ];
    const ownerArray = [
        images.user1,
        images.user8,
        images.user2,
        images.user6,
        images.user5,
    ];

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

    const openTabs = (e) => {
        const btnText = e.target.innerText;

        if (btnText == "Bid History") {
            setHistory(true);
            setProvanance(false);
            setOwner(false);
        } else if (btnText == "Provanance") {
            setHistory(false);
            setProvanance(true);
            setOwner(false);
        }
    };

    const openOwmer = () => {
        if (!owner) {
            setOwner(true);
            setHistory(false);
            setProvanance(false);
        } else {
            setOwner(false);
            setHistory(true);
        }
    };

    return (
        <div className={Style.NFTDescription}>
            <div className={Style.NFTDescription_box}>
                {/* //Part ONE */}
                <div className={Style.NFTDescription_box_share}>
                    <p>Virtual Worlds</p>
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
                                    Karli Costa <MdVerified />
                                </span>
                            </div>
                        </div>

                        <div className={Style.NFTDescription_box_profile_box_right}>
                            <Image
                                src={images.user2}
                                alt="profile"
                                width={40}
                                height={40}
                                className={Style.NFTDescription_box_profile_box_left_img}
                            />

                            <div className={Style.NFTDescription_box_profile_box_right_info}>
                                <small>Creator</small> <br />
                                <span>
                                    Karli Costa <MdVerified />
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
                                <p>{Math.floor(listing.endTimeInSeconds / 86400)}</p>
                                <span>Days</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{Math.floor((listing.endTimeInSeconds % 86400) / 3600)}</p>
                                <span>hours</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{Math.floor(((listing.endTimeInSeconds % 86400) % 3600) / 60)}</p>
                                <span>mins</span>
                            </div>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_timer_item
                                }
                            >
                                <p>{((listing.endTimeInSeconds % 86400) % 3600) % 60}</p>
                                <span>secs</span>
                            </div>
                        </div>

                        <div className={Style.NFTDescription_box_profile_biding_box_price}>
                            <div
                                className={
                                    Style.NFTDescription_box_profile_biding_box_price_bid
                                }
                            >
                                <small>Current bid</small>
                                {winningBid ? (
                                    <p>
                                        {winningBid.bidAmountCurrencyValue.displayValue} {winningBid.bidAmountCurrencyValue.symbol}
                                    </p>
                                ) : (
                                    <p>0</p>
                                )}

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
                                    >
                                        Buy Now
                                    </Web3Button>
                                    <Button
                                        icon=<FaWallet />
                                        btnName="Place a bid"
                                        handleClick={() => { }}
                                        classStyle={Style.button}
                                    />
                                </div>
                            ) : (
                                <div className={Style.NFTDescription_box_profile_biding_box_button}>
                                    <Button
                                        icon=<FaWallet />
                                        btnName="Cancel bidding"
                                        handleClick={() => { }}
                                        classStyle={Style.button}
                                    />
                                </div>
                            )
                        )}


                        <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                            <button onClick={(e) => openTabs(e)}>Bid History</button>
                            <button onClick={(e) => openTabs(e)}>Provanance</button>
                            <button onClick={() => openOwmer()}>Owner</button>
                        </div>

                        {history && (
                            <div className={Style.NFTDescription_box_profile_biding_box_card}>
                                <NFTTabs dataTab={historyArray} />
                            </div>
                        )}
                        {provanance && (
                            <div className={Style.NFTDescription_box_profile_biding_box_card}>
                                <NFTTabs dataTab={provananceArray} />
                            </div>
                        )}

                        {owner && (
                            <div className={Style.NFTDescription_box_profile_biding_box_card}>
                                <NFTTabs dataTab={ownerArray} icon=<MdVerified /> />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;