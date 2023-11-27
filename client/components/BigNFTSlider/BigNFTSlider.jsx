import React, { useState, useCallback, useEffect } from "react";
import Image from "next/legacy/image";
import { MdVerified, MdTimer } from "react-icons/md";
import { TbArrowBigLeftLines, TbArrowBigRightLine } from "react-icons/tb";
import Style from "./BigNFTSlider.module.css";
import images from "../../img";
import Button from "../Button/Button";
import { client } from "../../sanityClient";
import { useRouter } from "next/router";

const BigNFTSilder = () => {
  const router = useRouter();
  const [idNumber, setIdNumber] = useState(0);
  const [sliderData, setSliderData] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchAucListing = async (sanityClient = client) => {
      const query = `*[_type == 'nfts' && listingType == 'direct' && status == 'listing'] 
        {
            _id,
            name,
            imagesrc,
            price,
            endTimeInSecond,
            listingId,
            ownerAddress
        }`;
      const data = await sanityClient.fetch(query);

      console.log(data);
      if (!ignore) {
        setSliderData(data);
      }
    }

    fetchAucListing();

    return () => {
      ignore = true;
    };
  }, [])

  useEffect(() => {
    if (sliderData) {
      let s = Math.floor(sliderData[idNumber].endTimeInSecond / 1000 - new Date().getTime() / 1000);
      setDays(Math.floor(s / 86400));
      s = s % 86400;
      setHours(Math.floor(s / 3600));
      s = s % 3600;
      setMins(Math.floor(s / 60));
      setSeconds(s % 60);
      console.log(days)
    }
  }, [sliderData, idNumber])

  const handleView = (id) => {
    router.push(`/nft/${id}`);
  }

  const inc = useCallback(() => {
    if (idNumber + 1 < sliderData.length) {
      setIdNumber(idNumber + 1);
    }
  }, [idNumber, sliderData?.length]);

  const dec = useCallback(() => {
    if (idNumber > 0) {
      setIdNumber(idNumber - 1);
    }
  }, [idNumber]);

  return (
    <div className={Style.bigNFTSlider}>
      {!sliderData ? (
        <div>
          Loading ...
        </div>
      ) : (
        <div className={Style.bigNFTSlider_box}>
          <div className={Style.bigNFTSlider_box_left}>
            <h2>{sliderData[idNumber].name}</h2>
            <div className={Style.bigNFTSlider_box_left_creator}>
              <div className={Style.bigNFTSlider_box_left_creator_profile}>
                <Image
                  className={Style.bigNFTSlider_box_left_creator_profile_img}
                  src={images.user1}
                  alt="profile image"
                  width={50}
                  height={50}
                />
                <div className={Style.bigNFTSlider_box_left_creator_profile_info}>
                  <p>Owner: </p>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    fontWeight: 600
                  }}>
                    {sliderData[idNumber].ownerAddress}
                    <span>
                      <MdVerified />
                    </span>
                  </div>
                </div>
              </div>


            </div>

            <div className={Style.bigNFTSlider_box_left_bidding}>
              <div className={Style.bigNFTSlider_box_left_bidding_box}>
                <small>Buyout Price</small>
                <p>
                  {sliderData[idNumber].price} ETH
                </p>
              </div>

              <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
                <MdTimer
                  className={Style.bigNFTSlider_box_left_bidding_box_icon}
                />
                <span>Auction ending in</span>
              </p>

              <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{days}</p>
                  <span>Days</span>
                </div>

                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{hours}</p>
                  <span>Hours</span>
                </div>

                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{mins}</p>
                  <span>mins</span>
                </div>

                <div
                  className={Style.bigNFTSlider_box_left_bidding_box_timer_item}
                >
                  <p>{seconds}</p>
                  <span>secs</span>
                </div>
              </div>

              <div className={Style.bigNFTSlider_box_left_button}>
                <Button btnName="View" handleClick={() => handleView(sliderData[idNumber].listingId)} />
              </div>
            </div>

            <div className={Style.bigNFTSlider_box_left_sliderBtn}>
              <TbArrowBigLeftLines
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={() => dec()}
              />
              <TbArrowBigRightLine
                className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                onClick={() => inc()}
              />
            </div>
          </div>

          <div className={Style.bigNFTSlider_box_right}>
            <div className={Style.bigNFTSlider_box_right_box}>
              <Image
                src={sliderData[idNumber].imagesrc}
                alt="NFT IMAGE"
                className={Style.bigNFTSlider_box_right_box_img}
                width={900}
                height={850}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BigNFTSilder;