/* eslint-disable react/prop-types */
import { useEffect } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import "./style.scss";

export default function SimpleGallery(props) {
  const { images } = props;
  useEffect(() => {
    // Ensure the DOM element exists
    const container = document.querySelector(".masonry-gallery-demo");
    if (container) {
      // Initialize Masonry
      const msnry = new Masonry(container, {
        itemSelector: ".gallery-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });

      // Use imagesLoaded with Masonry
      imagesLoaded(container).on("progress", function () {
        // Layout Masonry after each image loads
        msnry.layout();
      });
    }
  }, []);

  return (
    <div>
      <LightGallery
        elementClassNames={"masonry-gallery-demo"}
        plugins={[lgZoom, lgShare, lgHash]}
        speed={500}
      >
        <div className="grid-sizer"></div>
        {images.map((image, index) => (
          <div key={index}>
            <a
              data-lg-size="1280-853"
              className="gallery-item"
              data-src={image}
            >
              <img
                className="w-96"
                src={image}
              />
            </a>
          </div>
        ))}
      </LightGallery>
    </div>
  );
}
