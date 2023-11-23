import React from 'react';
import NFTDetailsPage from '../../NFTDetailsPage/NFTDetailsPage';
import { useRouter } from 'next/router';

const NFTDetail = () => {
    const router = useRouter()

    return (
        <div>
            <NFTDetailsPage id={router.query.nftId} />
        </div>
    )
}

export default NFTDetail;