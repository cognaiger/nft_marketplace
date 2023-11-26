import React, { useEffect, useState } from 'react';
import Image from "next/legacy/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import Link from "next/link";
import Style from "./Profile.module.css";
import images from "../../../img";
import { useAddress } from '@thirdweb-dev/react';
import { client } from '../../../sanityClient';

const Profile = () => {
    const address = useAddress();
    const [user, setUser] = useState();

    useEffect(() => {
        let ignore = false;

        const fetchUser = async (sanityClient = client) => {
            console.log(address);
            const query = `*[_type == 'users' && walletAddress == "${address}"] 
            { 
              userName,
              walletAddress
            } ` ;
            const data = await sanityClient.fetch(query);

            console.log(data[0]);
            if (!ignore) {
                setUser(data[0]);
            }
        }

        fetchUser();

        return () => {
            ignore = true;
        };
    }, [address])

    return (
        <div className={Style.profile}>
            <div className={Style.profile_account}>
                <Image
                    src={images.user1}
                    alt="user profile"
                    width={50}
                    height={50}
                    className={Style.profile_account_img}
                />

                {user ? (
                    <div className={Style.profile_account_info}>
                        <p>{user?.userName}</p>
                        <small>{user?.walletAddress}</small>
                    </div>
                ) : (
                    <div>Loading</div>
                )}

            </div>

            <div className={Style.profile_menu}>
                <div className={Style.profile_menu_one}>
                    <div className={Style.profile_menu_one_item}>
                        <FaUserAlt />
                        <p>
                            <Link href={{ pathname: "/profile" }}>My Profile</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <FaRegImage />
                        <p>
                            <Link href={{ pathname: "/items" }}>My Items</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <FaUserEdit />
                        <p>
                            <Link href={{ pathname: "/account" }}>Edit Profile</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;