import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export const CLIENT_ID = "9c11241e80c0985a7f05e11dcd4745de";
export const MARKETPLACE_ADDR = "0xB82aC99a788C6A048bf4a0b3D58BF7bE41011cC7";

export const sdk = new ThirdwebSDK(Sepolia, {
    clientId: CLIENT_ID,
});

export const STATUS = {
    LISTING: 'listing',
    OFFERING: 'offering',
    BIDDING: 'bidding',
    COMPLETED: 'completed'
}

export const LISTINGTYPE = {
    DIRECT: 'direct',
    AUCTION: 'auction'
}