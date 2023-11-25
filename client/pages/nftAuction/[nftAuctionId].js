const { useRouter } = require("next/router");
const { default: NFTDetailsPage } = require("../../NFTDetailDirect/NFTDetailsPage");

const NFTAuction = () => {
    const router = useRouter();

    return (
        <div>
            <NFTDetailsPage id={router.query.nftAuctionId} />
        </div>
    )
}

export default NFTAuction;