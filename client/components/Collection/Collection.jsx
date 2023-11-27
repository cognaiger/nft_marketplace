import React, { useState, useEffect } from "react";
import Style from "./Collection.module.css";
import DaysComponent from "./DaysComponents/DaysComponents";
import { client } from "../../sanityClient";

const Collection = () => {
    const [collectionData, setCollectionData] = useState();

    useEffect(() => {
        let ignore = false;

        const fetchCollection = async (sanityClient = client) => {
            const query = `*[_type == 'collections'] 
            {
                name,
                imagesrc,
                address,
                owner-> {
                  walletAddress,
                  userName
                }
            }`;
            const data = await sanityClient.fetch(query);

            console.log(data);
            if (!ignore) {
                setCollectionData(data);
            }
        }

        fetchCollection();

        return () => {
            ignore = true;
        };
    }, [])

    return (
        <div className={Style.collection}>
            <div className={Style.collection_title}>
                <h2>Top Collection</h2>
            </div>
            {!collectionData ? (
                <div className={Style.collection_box}>
                    Loading
                </div>
            ) : 
            (
                <div className={Style.collection_box}>
                    {collectionData.map((el, i) => (
                        <DaysComponent key={i} el={el} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Collection;