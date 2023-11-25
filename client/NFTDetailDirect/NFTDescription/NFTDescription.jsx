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
import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDR } from "../../common/const";
import { client } from "../../sanityClient";

const NFTDescription = ({ listing }) => {
    const { contract } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const address = useAddress();

    const buyListing = async () => {
        const quantity = 1;
        txnRes = await contract.directListings.buyFromListing(listing.id, quantity, address);
        return txnRes;
    }

    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [provanance, setProvanance] = useState(false);
    const [owner, setOwner] = useState(false);
    const [user, setUser] = useState();
    const [showOfferInput, setShowOfferInput] = useState(false);
    const [offerAmount, setOfferAmount] = useState();

    useEffect(() => {
        let ignore = false;

        const fetchUserInfo = async (sanityClient = client) => {
            console.log(address);
            const query = `*[_type == 'users' && walletAddress == "${address}"] 
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

    const closeOfferInput = () => {
        setShowOfferInput(false);
    }

    const handleOfferSubmit = () => {
        setShowOfferInput(false);
    }

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
        if (!provanance) {
            setProvanance(true);
            setOwner(false);
        } else {
            setProvanance(false);
        }
    };

    const openOwmer = () => {
        if (!owner) {
            setOwner(true);
            setProvanance(false);
        } else {
            setOwner(false);
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
                                    {user?.userName} <MdVerified />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={Style.NFTDescription_box_profile_biding}>
                        <p>
                            <MdTimer /> <span>Listing ending in:</span>
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
                                <small>Price</small>
                                <p>
                                    {listing.currencyValuePerToken.displayValue} {listing.currencyValuePerToken.symbol}
                                </p>
                            </div>
                        </div>

                        {listing.creatorAddress != user?.walletAddress ? (
                            <div className={Style.NFTDescription_box_profile_biding_box_button}>
                                <Web3Button
                                    contractAddress={MARKETPLACE_ADDR}
                                    action={
                                        async () => buyListing()
                                    }
                                >
                                    Buy Now
                                </Web3Button>

                                {
                                    !showOfferInput ? (
                                        <Button
                                            icon=<FaPercentage />
                                            btnName="Make offer"
                                            handleClick={() => setShowOfferInput(true)}
                                            classStyle={Style.button}
                                        />
                                    ) : (
                                        <div className={Style.offerInputContainer}>
                                            <input
                                                type="number"
                                                value={offerAmount}
                                                onChange={(e) => setOfferAmount(e.target.value)}
                                                placeholder="Enter Offer Amount"
                                            />
                                            <div className={Style.doubleButton}>
                                                <Button
                                                    icon={<FaPercentage />}
                                                    btnName="Submit Offer"
                                                    handleClick={handleOfferSubmit}
                                                    classStyle={Style.button}
                                                />
                                                <Button
                                                    btnName="Cancel"
                                                    handleClick={closeOfferInput}
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
                                    contractAddress={MARKETPLACE_ADDR}
                                    action={
                                        async () => buyListing()
                                    }
                                >
                                    Accept Offer
                                </Web3Button>
                                <Button
                                    icon=<FaPercentage />
                                    btnName="Cancel Listing"
                                    handleClick={() => { }}
                                    classStyle={Style.button}
                                />
                            </div>
                        )
                        }


                        <div className={Style.NFTDescription_box_profile_biding_box_tabs}>
                            <button onClick={(e) => openTabs(e)}>Provanance</button>
                            <button onClick={() => openOwmer()}>Owner</button>
                        </div>

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