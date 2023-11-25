import React from 'react';
import Link from "next/link";
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
    const helpCenter = [
        {
            name: "About",
            link: "aboutus",
        },
        {
            name: "Contact Us",
            link: "contactus",
        },
        {
            name: "Subscription",
            link: "subscription",
        },
    ];
    
    return (
        <div className={Style.box}>
            {helpCenter.map((el, i) => (
                <div className={Style.helpCenter} key={i}>
                    <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default HelpCenter;