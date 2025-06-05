import { useNavigate } from "react-router-dom";
import PhotosCarousel from "../../../shared/PhotosCarousel/PhotosCarousel";
import { data } from "./Carrousel_1";

export default function WhoWeAreSession() {

    const navigate = useNavigate()

    return (
        <div className="flex pt-20 pb-20 ">
            <div className="w-2/12 ">

            </div>
            <div className="w-8/12 flex">
                <div className="w-6/12 mr-20">
                    <div className="rubik text-sm text-[#00337C] space-y-5">
                        <p className="asap text-3xl font-extrabold text-[#ff654d]">QUEM SOMOS NÓS</p>
                        <p>Fundado em 1972, o Grupo Escoteiro Araraquara José Luiz Torquato tem uma trajetória marcada pelo compromisso com o escotismo e a foromação de jovens cidadões. Promovemos o desenvolvimento pessoal o trabalho em equipe e os calores do Movimento Escoteiro.</p>
                        <p>Nossa missão é educar por meio da aventira, da liderança e do serviço à comunidade, preparando-os para serem protagonistas em suas vidas e na sociedade.</p>
                        <button onClick={() => navigate('/sobre-nos')} className="text-[#ff654d] asap border flex rounded-full hover:cursor-pointer border-[#ff654d] pl-2 pr-2 pt-1 pb-1 font-semibold text-xl">
                            <p className="place-self-center">Quem Somos</p>
                            <svg className="h-5 w-5 place-self-center text-[#ff654d] ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 16 16 12 12 8" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
                        </button>
                    </div>
                </div>
                <div className="w-6/12">
                    <PhotosCarousel images={data} />
                </div>
            </div>
        </div>
    )
}