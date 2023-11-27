export default {
    name: 'collections',
    type: 'document',
    title: 'Collections',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'imagesrc',
            title: 'Image Source',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'floorPrice',
            title: 'Floor Price',
            type: 'number',
        },
        {
            name: 'totalVolume',
            title: 'Total Volume',
            type: 'number',
        },
        {
            name: 'bestOffer',
            title: 'Best Offer',
            type: 'number',
        },
        {
            name: 'listed',
            title: 'Listed',
            type: 'number',
        },
        {
            title: 'Owner',
            name: 'owner',
            type: 'reference',
            to: [{ type: 'users' }]
        }
    ]
}