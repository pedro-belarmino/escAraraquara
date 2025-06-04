import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

type Photo = {
  id: number;
  imageUrl: string;
};

type PhotosCarouselProps = {
  images: Photo[];
};

export default function PhotosCarousel({ images }: PhotosCarouselProps) {
  return (
    <Carousel responsive={responsive}>
      {images.map((photo) => (
        <div key={photo.id} className="p-2 rounded-xl border max-w-90">
          <img
            src={photo.imageUrl}
            alt={`Foto ${photo.id}`}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>
      ))}
    </Carousel>
  );
}
