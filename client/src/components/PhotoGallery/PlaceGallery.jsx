import {useState} from "react";
import Image from "../ImageSrc/Image.jsx";
import { Carousel } from 'flowbite-react';

export default function PlaceGallery({place}) {
  return (
    //flowbite-react
    <div className="h-56 rounded-2xl md:h-96">
      <Carousel>
        {place?.photos?.length > 0 && place.photos.map((photo) => {
          return(
              <Image
                src={photo}
                className="object-cover"
                alt=""
              />
          )
        })}
      </Carousel>
    </div>
  );
}