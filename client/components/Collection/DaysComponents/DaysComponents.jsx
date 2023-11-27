import React from "react";
import Image from "next/legacy/image";
import { MdVerified } from "react-icons/md";
import Style from "./DaysComponents.module.css";
import images from "../../../img";
import Link from "next/link";

const DaysComponents = ({ el }) => {
    return (
        <div className={Style.daysComponent}>
            <Link href={`/collectionz/${el.address}`}>
                <div className={Style.daysComponent_box}>
                    <div className={Style.daysComponent_box_img}>
                        <Image
                            src={el.imagesrc}
                            className={Style.daysComponent_box_img_img}
                            alt="profile background"
                            width={500}
                            height={500}
                            objectFit="covers"
                        />
                    </div>

                    <div className={Style.daysComponent_box_title}>
                        <h2>{el.name}</h2>
                        <div className={Style.daysComponent_box_title_info}>
                            <div className={Style.daysComponent_box_title_info_profile}>
                                <Image
                                    src={images.user1}
                                    alt="profile"
                                    width={30}
                                    height={30}
                                    objectFit="covers"
                                    className={Style.daysComponent_box_title_info_profile_img}
                                />

                                <p>
                                    Creator
                                    <span>
                                        {el.owner.userName}
                                        <small>
                                            <MdVerified />
                                        </small>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DaysComponents;