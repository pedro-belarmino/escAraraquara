import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  allScreens: {
    breakpoint: { max: 3000, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const CustomDot = ({ onClick, active }: { onClick?: () => void; active?: boolean }) => (
  <li
    onClick={onClick}
    className={`w-3 h-3 rounded-full mx-1 cursor-pointer transition-all duration-300 ${active ? "bg-[#ff654d] scale-110" : "bg-gray-300"
      }`}
  />
);

type Photo = {
  id: number;
  imageUrl: string;
};

type PhotosCarouselProps = {
  images: Photo[];
};

export default function PhotosCarousel({ images }: PhotosCarouselProps) {
  return (
    <Carousel
      responsive={responsive}

      arrows={false}
      showDots={true}
      renderDotsOutside={false}
      infinite={true}
      containerClass="pb-6"
      dotListClass="flex justify-center mt-4 gap-2"
      itemClass="px-2"
      customDot={<CustomDot />}
      autoPlay={true}
      autoPlaySpeed={3000}

    >
      {images.map((photo) => (
        <div
          key={photo.id}
          className="place-self-center"
        >
          <div className="w-full aspect-[4/3] overflow-hidden">
            <img
              src={photo.imageUrl}
              alt={`Foto ${photo.id}`}
              className="top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
}

