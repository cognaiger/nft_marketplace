import { useRouter } from "next/router";
import NFTDetailAuction from "../../NFTDetailAuction/NFTDetailAuction";

const NFTAuction = () => {
    const router = useRouter();

    return (
        <div>
            <NFTDetailAuction id={router.query.nftAuctionId} />
        </div>
    )
}

export default NFTAuction;