import { useState } from "react";

const ImageFallback = ({ src, fallback, alt = "", width, height, loading }) => {
    const [imageSrc, setImageSrc] = useState(src);
    return (
        <img
            width={width}
            height={height}
            loading={loading}
            src={imageSrc}
            alt={alt}
            onError={() => setImageSrc(fallback)}
        />
    );
};

export default ImageFallback;
