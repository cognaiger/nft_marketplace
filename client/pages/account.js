import React, { useState, useCallback, useEffect } from "react";
import Image from "next/legacy/image";
import { useDropzone } from "react-dropzone";
import Style from "../styles/account.module.css";
import images from "../img";
import { useAddress } from "@thirdweb-dev/react";
import { client } from "../sanityClient";
import { Button } from "../components/componentsindex";
import { useRouter } from "next/router";

const account = () => {
    const router = useRouter();

    const [user, setUser] = useState();
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [fileUrl, setFileUrl] = useState(null);

    const address = useAddress();

    useEffect(() => {
        let ignore = false;

        const fetchNFTOwn = async (sanityClient = client) => {
            const query = `*[_type == 'users' && walletAddress == "${address}"] `;
            const data = await sanityClient.fetch(query);

            console.log(data[0]);
            if (!ignore) {
                setUser(data[0]);
            }
        }

        fetchNFTOwn();

        return () => {
            ignore = true;
        };
    }, [address])

    const uploadProfile = async (e) => {
        e.preventDefault();

        try {
            const res = await client
                .patch(user._id)
                .set({ userName: username, description: description })
                .commit();

            if (res) {
                console.log("update successfully");
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    }

const onDrop = useCallback(async (acceptedFile) => {
    setFileUrl(acceptedFile[0]);
    console.log(acceptedFile[0])
}, []);

const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
});

return (
    <div className={Style.account}>
        <div className={Style.account_info}>
            <h1>Profile settings</h1>
            <p>
                You can set preferred display name, create your profile URL and manage
                other personal settings.
            </p>
        </div>

        <div className={Style.account_box}>
            <div className={Style.account_box_img} {...getRootProps()}>
                <input {...getInputProps()} />
                <Image
                    src={images.user1}
                    alt="account upload"
                    width={150}
                    height={150}
                    className={Style.account_box_img_img}
                />
                <p className={Style.account_box_img_para}>Change Image</p>
            </div>
            <div className={Style.account_box_from}>
                <div className={Style.Form}>
                    <div className={Style.Form_box}>
                        <form>
                            <div className={Style.Form_box_input}>
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    placeholder="shoaib bhai"
                                    className={Style.Form_box_input_userName}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                            <div className={Style.Form_box_btn}>
                                <Button
                                    btnName="Upload profile"
                                    handleClick={uploadProfile}
                                    classStyle={Style.button}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default account;