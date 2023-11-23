export default {
    name: 'users',
    type: 'document',
    title: 'Users',
    fields: [
        {
            name: 'userName',
            title: 'User Name',
            type: 'string',
        },
        {
            name: 'walletAddress',
            title: 'Wallet Address',
            type: 'string',
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
        }
    ]
}