import React, { useState } from "react";
import Style from "./Upload.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { NATIVE_TOKEN_ADDRESS, Web3Button, useContract, useNetworkMismatch, useSwitchChain } from "@thirdweb-dev/react";
import { LISTINGTYPE, MARKETPLACE_ADDR, STATUS, sdk } from "../common/const";
import { useRouter } from "next/router";
import { client } from "../sanityClient";

const UploadNFT = () => {
    const networkMismatch = useNetworkMismatch();
    const switchNetwork = useSwitchChain();
    const {
        contract: marketplace,
        isLoading: loadingMarketplace
    } = useContract(MARKETPLACE_ADDR, "marketplace-v3");

    const router = useRouter();

    const [listingType, setListingType] = useState(LISTINGTYPE.DIRECT);
    const [contractAdr, setContractAdr] = useState('');
    const [tokenId, setTokenId] = useState(0);
    const [price, setPrice] = useState(0);
    let idMarket = 0;

    const upload = async () => {
        try {

            if (networkMismatch) {
                switchNetwork && switchNetwork(11155111);
                return;
            }

            let tx;

            if (listingType === LISTINGTYPE.DIRECT) {
                const listing = {
                    assetContractAddress: contractAdr,
                    tokenId: tokenId,
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    pricePerToken: price,
                    startTimestamp: new Date(Date.now()),
                    endTimestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                }
                tx = await marketplace.directListings.createListing(listing);
                console.log(tx);
                idMarket = tx.id._hex;
            }

            if (listingType === LISTINGTYPE.AUCTION) {
                const auction = {
                    assetContractAddress: contractAdr,
                    tokenId: tokenId,
                    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                    minimumBidAmount: 0.001,
                    buyoutBidAmount: price,
                    timeBufferInSeconds: 300, // 5 minutes
                    bidBufferBps: 500, // 5%
                    startTimestamp: new Date(Date.now()),
                    endTimestamp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
                }
                tx = await marketplace.englishAuctions.createAuction(auction);
                console.log(tx);
                idMarket = tx.id._hex;
            }

            if (tx) {
                router.push('/');
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addNFT = async (sanityClient = client) => {
        const contract = await sdk.getContract(contractAdr);
        const nft = await contract.erc721.get(tokenId);

        console.log(nft);
        const nftDoc = {
            _type: 'nfts',
            name: nft.metadata.name,
            description: nft.metadata.description,
            price: Number(price),
            endTimeInSecond: Date.now() + 5 * 24 * 60 * 60 * 1000,
            status: STATUS.LISTING,
            imagesrc: nft.metadata.image,
            contractAddress: contractAdr,
            id: Number(nft.metadata.id),
            ownerAddress: nft.owner,
            listingId: Number(idMarket),
            listingType: listingType
        }

        try {
            const result = await sanityClient.create(nftDoc);

            if (result) {
                console.log(`nft was created with id = ${result._id}`);
            }
        } catch (err) {
            console.log("in catch");
            console.log(err);
        }
    }

    return (
        <div className={Style.upload}>

            <div className={Style.upload_box}>
                <div className={formStyle.Form_box_input}>
                    <label>Contract Address</label>
                    <input
                        type="text"
                        placeholder="0x6D6CF0a44b348C249C192fB5f6FdA64dDDb2Afe6"
                        className={formStyle.Form_box_input_userName}
                        value={contractAdr}
                        onChange={(e) => setContractAdr(e.target.value)}
                    />
                </div>

                <div className={formStyle.Form_box_input}>
                    <label>Token ID</label>
                    <input
                        type="number"
                        placeholder="ID"
                        className={formStyle.Form_box_input_userName}
                        value={tokenId}
                        onChange={(e) => setTokenId(e.target.value)}
                    />
                </div>

                <div>
                    <div className={formStyle.labelSpecial}>Choose Listing Type</div>
                    <div className={formStyle.radioGroup}>
                        <div>
                            <input
                                type="radio"
                                name="listingType"
                                value={LISTINGTYPE.DIRECT}
                                id="directListing"
                                onChange={(e) => setListingType(e.target.value)}
                                defaultChecked
                            />
                            <label for="directListing">Direct Listing</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="listingType"
                                value={LISTINGTYPE.AUCTION}
                                id="auctionListing"
                                onChange={(e) => setListingType(e.target.value)}
                            />
                            <label htmlFor="auctionListing">Auction Listing</label>
                        </div>
                    </div>
                </div>

                <div className={formStyle.Form_box_input}>
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="price"
                        className={formStyle.Form_box_input_userName}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className={Style.upload_box_btn}>
                    <Web3Button
                        theme="light"
                        contractAddress={MARKETPLACE_ADDR}
                        action={
                            async () => upload()
                        }
                        onSuccess={() => addNFT()}
                    >
                        Upload
                    </Web3Button>
                </div>
            </div>
        </div>
    );
};

export default UploadNFT;