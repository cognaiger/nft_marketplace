'use client'

import React, { useState } from "react";
import Image from "next/legacy/image";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button } from "../componentsindex";
import images from "../../img";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

const NavBar = () => {
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);

    const address = useAddress();

    const openMenu = (e) => {
        const btnText = e.target.innerText;
        if (btnText == "Discover") {
            setDiscover(!discover);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        } else if (btnText == "Help Center") {
            setDiscover(false);
            setHelp(!help);
            setNotification(false);
            setProfile(false);
        } else {
            setDiscover(false);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }
    };

    const openNotification = () => {
        if (!notification) {
            setNotification(true);
            setDiscover(false);
            setHelp(false);
            setProfile(false);
        } else {
            setNotification(false);
        }
    };

    const openProfile = () => {
        if (!profile) {
            setProfile(true);
            setHelp(false);
            setDiscover(false);
            setNotification(false);
        } else {
            setProfile(false);
        }
    };

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.logo}>
                        <Link href={"/"}>
                            <Image
                                src={images.logo}
                                alt="NFT MARKET PLACE"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type="text" placeholder="Search NFT" />
                            <BsSearch onClick={() => { }} className={Style.search_icon} />
                        </div>
                    </div>
                </div>

                {/* //END OF LEFT SECTION */}
                <div className={Style.navbar_container_right}>
                    <div className={Style.navbar_container_right_discover}>
                        {/* DISCOVER MENU */}
                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {discover && (
                            <div className={Style.navbar_container_right_discover_box}>
                                <Discover />
                            </div>
                        )}
                    </div>

                    {/* HELP CENTER MENU */}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={(e) => openMenu(e)}>Help Center</p>
                        {help && (
                            <div className={Style.navbar_container_right_help_box}>
                                <HelpCenter />
                            </div>
                        )}
                    </div>

                    {/* NOTIFICATION */}
                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications
                            className={Style.notify}
                            onClick={() => openNotification()}
                        />
                        {notification && <Notification />}
                    </div>

                    {/* CREATE BUTTON SECTION */}
                    <div className={Style.navbar_container_right_button}>
                        <Button btnName="Create" handleClick={() => { }} />
                    </div>

                    <ConnectWallet theme={"dark"} modalSize="wide" />

                    {/* USER PROFILE */}
                    {address && (
                        <div className={Style.navbar_container_right_profile_box}>
                            <div className={Style.navbar_container_right_profile}>
                                <Image
                                    src={images.user1}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    onClick={() => openProfile()}
                                    className={Style.navbar_container_right_profile}
                                />

                                {profile && <Profile />}
                            </div>
                        </div>
                    )}

                    {/* MENU BUTTON */}

                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight
                            className={Style.menuIcon}
                            onClick={() => openSideBar()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;