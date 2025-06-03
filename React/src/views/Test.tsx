import PhotosCarousel from "../components/shared/PhotosCarousel";
import { data } from "../components/pages/Home/Carrousel_1"

export default function Test() {
    return (
        <PhotosCarousel children={data} />
    )
}