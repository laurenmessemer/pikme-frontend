import { useState, useRef, useEffect } from "react";
import { onImageError } from "../../utils/RouterUtils";
import placeholderImage from "../../assets/placeholders/placeholder-image.jpg";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = placeholderImage,
  ...props
}) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Preload before it comes into view
        threshold: 0.001,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={onImageError}
      {...props}
    />
  );
};

export default LazyImage;
