import React from 'react';
import Style from "./Button.module.css";

const Button = ({ btnName }) => {
    return (
        <div className={Style.box}>
            <button className={Style.button} onClick={() => handleClick()}>
                {btnName}
            </button>
        </div>
    )
}

export default Button;