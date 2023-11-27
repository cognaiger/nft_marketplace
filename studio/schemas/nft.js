export default {
    name: 'nfts',
    title: 'NFTs',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
            name: 'imagesrc',
            title: 'Image Source',
            type: 'string'
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'endTimeInSecond',
            title: 'End Time',
            type: 'number'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string'
        },
        {
            name: 'contractAddress',
            title: 'Contract Address',
            type: 'string'
        },
        {
            name: 'id',
            title: 'ID',
            type: 'number'
        },
        {
            name: 'ownerAddress',
            title: 'Owner Address',
            type: 'string'
        },
        {
            name: 'listingId',
            title: 'Listing ID',
            type: 'number'
        },
        {
            name: 'listingType',
            title: 'Listing Type',
            type: 'string'
        }
    ]
}