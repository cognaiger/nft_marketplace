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
            name: 'imagesrc',
            title: 'Image Source',
            type: 'string'
        },
        {
            name: 'contractAddress',
            title: 'Contract Address',
            type: 'string'
        },
        {
            name: 'id',
            title: 'id',
            type: 'number'
        }
    ]
}