// NADA DESENVOLVIDO AQUI DEVE SER LEVADO EM CONSIDERAÇÃO PARA A EXECUÇÃO DO SISTEMA //
import PhotosCarousel from "../components/shared/PhotosCarousel/PhotosCarousel";
import { data } from "../components/pages/Home/WhoWeAreSession/Carrousel_1"

export default function Test() {
    return (
        <PhotosCarousel images={data} />
    )
}