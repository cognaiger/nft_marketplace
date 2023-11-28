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
import { FaPercentage } from "react-icons/fa";
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
import { Web3Button, useAddress, useContract, useOffers } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDR } from "../../common/const";
import { client } from "../../sanityClient";

const NFTDescription = ({ listing }) => {
    const { contract: marketplace } = useContract(MARKETPLACE_ADDR, "marketplace-v3");
    const address = useAddress();

    const buyListing = async () => {
        const quantity = 1;
        txnRes = await marketplace.directListings.buyFromListing(listing.id, quantity, address);

        return txnRes;
    }

    const offerListing = async () => {
        const offer = {
            assetContractAddress: listing.assetContractAddress,
            tokenId: listing.tokenId,
            currencyContractAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
            quantity: 1,
            totalPrice: '0.01',
            endTimestamp: new Date().getTime() + 1000 * 7 * 24 * 60 * 60,
        }

        const tx = await marketplace.offers.makeOffer(offer);
        const receipt = tx.receipt; // the transaction receipt
        const id = tx.id; // the id of the newly created offer
    }

    const acceptOffer = async () => {
        await marketplace.offers.acceptOffer(0);
    }

    const cancelListing = async () => {
        await marketplace.directListings.cancelListing(listing.id);
    }

    const [social, setSocial] = useState(false);
    const [NFTMenu, setNFTMenu] = useState(false);
    const [user, setUser] = useState();
    const [showOfferInput, setShowOfferInput] = useState(false);
    const [offerPrice, setOfferPrice] = useState(0);
    const [offers, setOffers] = useState();
    const time = Math.floor(new Date().getTime() / 1000);

    useEffect(() => {
        const addNFT = async (sanityClient = client) => {
            const nftDoc = {
                _type: 'nfts',
                _id: listing.id,
                name: listing.asset.name,
                imagesrc: listing.asset.image,
                contractAddress: listing.assetContractAddress,
                id: Number(listing.asset.id)
            }

            try {
                const result = await sanityClient.createIfNotExists(nftDoc);

                if (result) {
                    console.log(`nft was created with id = ${result._id}`);
                }
            } catch (err) {
                console.log("in catch");
                console.log(err);
            }

            const offers = await marketplace.offers.getAll({
                id: listing
            });
            console.log(offers);
            setOffers(offers);
        }

        addNFT();

    }, [])

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

    const closeOfferInput = () => {
        setShowOfferInput(false);
    }

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
                            <MdTimer /> <span>Listing ending in:</span>
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
                                <small>Price</small>
                                <p>
                                    {listing.currencyValuePerToken.displayValue} {listing.currencyValuePerToken.symbol}
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
                        ) : listing.creatorAddress != address ? (
                            <div className={Style.NFTDescription_box_profile_biding_box_button}>
                                <Web3Button
                                    theme={'light'}
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
                                            btnName="Make offer"
                                            handleClick={() => setShowOfferInput(true)}
                                            classStyle={Style.button}
                                        >
                                            Make Offer
                                        </Button>
                                    ) : (
                                        <div className={Style.offerInputContainer}>
                                            <input
                                                type="number"
                                                value={offerPrice}
                                                onChange={(e) => setOfferPrice(e.target.value)}
                                                placeholder="Enter Offer Amount"
                                            />
                                            <div className={Style.doubleButton}>
                                                <Web3Button
                                                    contractAddress={MARKETPLACE_ADDR}
                                                    action={
                                                        async () => offerListing()
                                                    }
                                                    theme={'light'}
                                                >
                                                    Submit Offer
                                                </Web3Button>
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
                            <div>
                                {offers?.map((el, i) => (
                                    <div style={{
                                        marginTop: 20
                                    }}>
                                        {el.offerorAddress} offer {el.currencyValue.displayValue} WETH
                                    </div>
                                ))}
                                <div className={Style.NFTDescription_box_profile_biding_box_button}>

                                    <Web3Button
                                        contractAddress={MARKETPLACE_ADDR}
                                        action={
                                            async () => acceptOffer()
                                        }
                                    >
                                        Accept Offer
                                    </Web3Button>
                                    <Web3Button
                                        contractAddress={MARKETPLACE_ADDR}
                                        action={
                                            async () => cancelListing()
                                        }
                                    >
                                        Cancel Listing
                                    </Web3Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDescription;