/* eslint-disable react/prop-types */
import { Gallery } from "react-grid-gallery";
import { useEffect, useState } from "react";

function getImageDimensions(imageURL) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = function() {
          resolve({src: imageURL, width: img.width, height: img.height, caption: "" });
      };
      
      img.onerror = function() {
          resolve({ width: 400, height: 300 });
      };
      
      img.src = imageURL;
  });
}

// Usage example:
getImageDimensions('https://i.ibb.co/K2JWd8w/sundarbans03.jpg')
  .then(dimensions => {
      console.log(dimensions);  
  })
  .catch(error => {
      console.error('Error:', error);
  });

export default function PackageGallery(props) {
  const { images } = props;
  const [pp, setPP] = useState([]);

    useEffect(() => {
        if (images) {
            Promise.all(images.slice(1).map(image => getImageDimensions(image)))
                .then(dimensions => {
                    setPP(dimensions);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [images]);
  console.log(pp);
  return (
    <div>
      <Gallery
        images={pp}
        // thumbnailImageComponent={ImageComponent}
        enableImageSelection={false}
      />
    </div>
  );
}

