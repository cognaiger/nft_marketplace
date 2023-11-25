import React from "react";
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";
import { client } from "../../sanityClient";

const Form = () => {
    const uploadProfile = async (e) => {
        e.preventDefault();

        const user = {
            _id: user._id,
            userName: username,
            description: des,
        }
        const res = await client.createOrReplace(user);
        console.log(res);
    }

    return (
        <div className={Style.Form}>
            <div className={Style.Form_box}>
                <form>
                    <div className={Style.Form_box_input}>
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            placeholder="shoaib bhai"
                            className={Style.Form_box_input_userName}
                        />
                    </div>

                    <div className={Style.Form_box_input}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="6"
                            placeholder="something about yourself in few words"
                        ></textarea>
                    </div>
                
                    <div className={Style.Form_box_btn}>
                        <Button
                            btnName="Upload profile"
                            classStyle={Style.button}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;